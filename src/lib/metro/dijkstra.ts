import type { Station, Stop, RouteResult, RouteSegment, LineKey } from '@/types/metro';
import type { Graph } from './graph';
import { computeFare } from './fare';
import { resolvePlatform } from './platformDirection';

// Delhi monuments used for scenic scoring
const MONUMENTS: { lat: number; lon: number }[] = [
  { lat: 28.6562, lon: 77.2410 }, // Red Fort
  { lat: 28.6129, lon: 77.2295 }, // India Gate
  { lat: 28.5245, lon: 77.1855 }, // Qutub Minar
  { lat: 28.6540, lon: 77.2507 }, // Jama Masjid
  { lat: 28.5933, lon: 77.2507 }, // Humayun's Tomb
  { lat: 28.6127, lon: 77.1651 }, // Lotus Temple
  { lat: 28.5672, lon: 77.2100 }, // Hauz Khas
  { lat: 28.6330, lon: 77.2194 }, // Connaught Place
];

const SCENIC_RADIUS_DEG = 0.015; // ~1.5 km

function scenicScore(station: Station): number {
  let score = 0;
  for (const m of MONUMENTS) {
    const dlat = station.lat - m.lat;
    const dlon = station.lon - m.lon;
    if (Math.sqrt(dlat * dlat + dlon * dlon) <= SCENIC_RADIUS_DEG) score++;
  }
  return score;
}

function formatTime(date: Date, addMin: number): string {
  const d = new Date(date.getTime() + addMin * 60_000);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

type DijkstraState = {
  dist: Map<string, number>;
  prev: Map<string, string | null>;
  prevEdgeMin: Map<string, number>;
};

function runDijkstra(graph: Graph, sources: string[]): DijkstraState {
  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const prevEdgeMin = new Map<string, number>();
  const visited = new Set<string>();

  // Simple min-heap simulation using sorted insertion — good enough for ~1000 nodes
  const queue: { id: string; d: number }[] = [];

  for (const src of sources) {
    dist.set(src, 0);
    prev.set(src, null);
    queue.push({ id: src, d: 0 });
  }

  queue.sort((a, b) => a.d - b.d);

  while (queue.length > 0) {
    const { id: u, d: du } = queue.shift()!;
    if (visited.has(u)) continue;
    visited.add(u);

    const neighbours = graph.get(u) ?? [];
    for (const { stopId: v, travelMin } of neighbours) {
      const alt = du + travelMin;
      if (alt < (dist.get(v) ?? Infinity)) {
        dist.set(v, alt);
        prev.set(v, u);
        prevEdgeMin.set(v, travelMin);
        queue.push({ id: v, d: alt });
        queue.sort((a, b) => a.d - b.d);
      }
    }
  }

  return { dist, prev, prevEdgeMin };
}

function reconstructPath(prev: Map<string, string | null>, target: string): string[] {
  const path: string[] = [];
  let cur: string | null = target;
  while (cur !== null) {
    path.unshift(cur);
    cur = prev.get(cur) ?? null;
  }
  return path;
}

function buildSegments(
  path: string[],
  stops: Stop[],
  stations: Station[],
  prevEdgeMin: Map<string, number>
): RouteSegment[] {
  const stopMap = new Map<string, Stop>(stops.map(s => [s.id, s]));
  const stationMap = new Map<string, Station>(stations.map(s => [s.id, s]));

  const segments: RouteSegment[] = [];
  let i = 0;

  while (i < path.length) {
    const stopId = path[i];
    const stop = stopMap.get(stopId);
    if (!stop) { i++; continue; }

    const currentLine = stop.line_id;

    // Find how far this line run extends
    let j = i;
    while (j < path.length) {
      const s = stopMap.get(path[j]);
      if (!s || s.line_id !== currentLine) break;
      j++;
    }

    if (j > i + 1) {
      // At least 2 stops on this line → real line segment

      // Interchange walk: only insert BEFORE a real line segment (not at final destination)
      if (i > 0) {
        const incoming = prevEdgeMin.get(stopId) ?? 0;
        if (incoming >= 4) {
          const st = stationMap.get(stop.station_id);
          if (st) {
            segments.push({
              type: 'walk',
              description_en: `Change lines at ${st.name_en}`,
              durationMin: incoming,
              distanceM: 150,
            });
          }
        }
      }

      const fromStop = stopMap.get(path[i])!;
      const toStop = stopMap.get(path[j - 1])!;
      const fromStation = stationMap.get(fromStop.station_id);
      const toStation = stationMap.get(toStop.station_id);

      if (fromStation && toStation) {
        const stationCount = j - i;

        // Extract ordered station IDs directly from the Dijkstra path slice
        const stationIds = path.slice(i, j)
          .map(sid => stopMap.get(sid)?.station_id)
          .filter((sid): sid is string => !!sid)
          // deduplicate consecutive same-station IDs (branch shared stops)
          .filter((sid, idx, arr) => idx === 0 || sid !== arr[idx - 1]);

        // Direction + platform: resolved from the first hop, branch-aware
        const hop = stationIds.length >= 2
          ? resolvePlatform(currentLine as LineKey, stationIds[0], stationIds[1])
          : null;
        const direction = hop
          ? `towards ${hop.terminusName}`
          : `towards ${toStation.name_en}`;

        segments.push({
          type: 'line',
          lineId: currentLine as LineKey,
          fromStation,
          toStation,
          stops: stationCount - 1,
          direction,
          platform: hop?.platform,
          stationIds,
        });
      }
      i = j;
    } else {
      i++;
    }
  }

  return segments;
}

function countChanges(segments: RouteSegment[]): number {
  const lineSegs = segments.filter(s => s.type === 'line');
  return Math.max(0, lineSegs.length - 1);
}

function countStops(segments: RouteSegment[]): number {
  return segments
    .filter((s): s is Extract<RouteSegment, { type: 'line' }> => s.type === 'line')
    .reduce((acc, s) => acc + s.stops, 0);
}

export function findRoutes(
  graph: Graph,
  stops: Stop[],
  stations: Station[],
  fromStationId: string,
  toStationId: string,
  departureTime: Date
): RouteResult[] {
  const stationMap = new Map<string, Station>(stations.map(s => [s.id, s]));
  const stopsByStation = new Map<string, string[]>();
  for (const stop of stops) {
    const arr = stopsByStation.get(stop.station_id) ?? [];
    arr.push(stop.id);
    stopsByStation.set(stop.station_id, arr);
  }

  const sources = stopsByStation.get(fromStationId) ?? [];
  const targets = stopsByStation.get(toStationId) ?? [];

  if (sources.length === 0 || targets.length === 0) return [];

  const { dist, prev, prevEdgeMin } = runDijkstra(graph, sources);

  // Collect all reachable target stops
  const reachable = targets.filter(t => dist.has(t) && (dist.get(t) ?? Infinity) < Infinity);
  if (reachable.length === 0) return [];

  type Candidate = {
    stopId: string;
    path: string[];
    segments: RouteSegment[];
    durationMin: number;
    stops: number;
    changes: number;
    scenicScore: number;
  };

  const candidates: Candidate[] = reachable.map(targetStopId => {
    const path = reconstructPath(prev, targetStopId);
    const segs = buildSegments(path, stops, stations, prevEdgeMin);
    const totalStops = countStops(segs);
    const totalChanges = countChanges(segs);
    const totalDuration = dist.get(targetStopId) ?? 0;

    // Scenic: sum up scenic score for each station in the path
    let scenic = 0;
    for (const stopId of path) {
      const stop = stops.find(s => s.id === stopId);
      if (stop) {
        const station = stationMap.get(stop.station_id);
        if (station) scenic += scenicScore(station);
      }
    }

    return {
      stopId: targetStopId,
      path,
      segments: segs,
      durationMin: totalDuration,
      stops: totalStops,
      changes: totalChanges,
      scenicScore: scenic,
    };
  });

  const fastest = [...candidates].sort((a, b) => a.durationMin - b.durationMin)[0];
  const cheapest = [...candidates].sort((a, b) => a.stops - b.stops)[0];
  const scenic = [...candidates].sort((a, b) => b.scenicScore - a.scenicScore)[0];

  const toResult = (
    c: Candidate,
    tag: RouteResult['tag']
  ): RouteResult => ({
    tag,
    tags: [tag],
    durationMin: c.durationMin,
    arriveTime: formatTime(departureTime, c.durationMin),
    stops: c.stops,
    changes: c.changes,
    farePaise: computeFare(c.stops),
    segments: c.segments,
  });

  // Fingerprint a route by its actual line segments so routes that look identical
  // to the user (same lines, same stop counts, same fare) are merged regardless of
  // minor Dijkstra duration differences between target stops.
  function fingerprint(r: RouteResult): string {
    const segs = r.segments
      .map(s => s.type === 'line' ? `L:${s.lineId}:${s.stops}` : `W`)
      .join('|');
    return `${r.farePaise}:${r.changes}:${segs}`;
  }

  const rawResults = [
    toResult(fastest, 'fastest'),
    toResult(cheapest, 'cheapest'),
    toResult(scenic, 'scenic'),
  ];

  const grouped = new Map<string, RouteResult>();
  for (const r of rawResults) {
    const key = fingerprint(r);
    if (grouped.has(key)) {
      grouped.get(key)!.tags.push(r.tag);
    } else {
      grouped.set(key, r);
    }
  }

  return [...grouped.values()];
}
