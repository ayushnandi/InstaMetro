import { STATIONS, STOPS, EDGES, LINES } from '@/data/dmrc';
import { STATION_EXTRA } from '@/data/metroExtra.generated';
import { buildGraph, addInterchangeEdges } from './graph';
import { findRoutes } from './dijkstra';
import { slugify } from './slug';
import type { Station } from '@/types/metro';

export { STATIONS, STOPS, EDGES, LINES, STATION_EXTRA };

export const STATION_BY_SLUG = new Map<string, Station>(
  STATIONS.map(s => [slugify(s.name_en), s])
);

export function getStationBySlug(slug: string): Station | undefined {
  return STATION_BY_SLUG.get(slug);
}

export function stationSlug(station: Station): string {
  return slugify(station.name_en);
}

// Stations directly adjacent (one hop, any line) to a given station — used for
// "nearby stations" internal-linking sections on station pages.
export function getAdjacentStations(stationId: string): { station: Station; travelMin: number; lineId: string }[] {
  const stationById = new Map(STATIONS.map(s => [s.id, s]));
  const stopsForStation = STOPS.filter(s => s.station_id === stationId).map(s => s.id);
  const out: { station: Station; travelMin: number; lineId: string }[] = [];
  const seen = new Set<string>();

  for (const edge of EDGES) {
    let neighbourStopId: string | null = null;
    if (stopsForStation.includes(edge.from_stop_id)) neighbourStopId = edge.to_stop_id;
    else if (stopsForStation.includes(edge.to_stop_id)) neighbourStopId = edge.from_stop_id;
    if (!neighbourStopId) continue;

    const neighbourStop = STOPS.find(s => s.id === neighbourStopId);
    if (!neighbourStop || neighbourStop.station_id === stationId) continue;

    const key = neighbourStop.station_id;
    if (seen.has(key)) continue;
    seen.add(key);

    const station = stationById.get(neighbourStop.station_id);
    if (station) out.push({ station, travelMin: edge.travel_min, lineId: neighbourStop.line_id });
  }

  return out;
}

let _graph: ReturnType<typeof buildGraph> | null = null;
function getGraph() {
  if (!_graph) {
    _graph = addInterchangeEdges(buildGraph(EDGES), STOPS, 5);
  }
  return _graph;
}

export function computeRoute(fromStationId: string, toStationId: string) {
  const results = findRoutes(getGraph(), STOPS, STATIONS, fromStationId, toStationId, new Date());
  return results.find(r => r.tags.includes('fastest')) ?? results[0] ?? null;
}

// ─── Curated route pages ──────────────────────────────────────────────────
// Seed set: every interchange station (serves 2+ lines) plus a hand-picked list
// of high-traffic/landmark termini and business/tourist hubs that aren't
// interchanges but are clearly high search-intent (airport, major markets).
const LANDMARK_SEED_IDS = [
  'RJC', 'CCW', 'CWB', 'NDL', 'KSG', 'KRB', 'HKS', 'SKT', 'D21', 'IGA',
  'HCC', 'VAI', 'N18', 'AKD', 'LAL', 'IGI', 'QMN', 'DWK', 'GTB', 'RTH',
];

export const CURATED_SEED_STATION_IDS: string[] = Array.from(
  new Set([
    ...STATIONS.filter(s => s.lines.length > 1).map(s => s.id),
    ...LANDMARK_SEED_IDS.filter(id => STATIONS.some(s => s.id === id)),
  ])
);

export type CuratedRoute = {
  slug: string;
  from: Station;
  to: Station;
  route: NonNullable<ReturnType<typeof computeRoute>>;
};

let _curatedRoutes: CuratedRoute[] | null = null;

// Non-trivial pairs (>=3 stops apart) among the seed set, deduped. Every seed station
// gets up to PER_STATION_CAP routes (picked shortest-journey-first, i.e. most plausible
// everyday commutes) — a flat global cap biased toward stations whose names sort early
// and starved others (e.g. Rajiv Chowk) of any coverage at all.
const PER_STATION_CAP = 8;

export function getCuratedRoutes(): CuratedRoute[] {
  if (_curatedRoutes) return _curatedRoutes;

  const stationById = new Map(STATIONS.map(s => [s.id, s]));
  const candidates: CuratedRoute[] = [];

  for (let i = 0; i < CURATED_SEED_STATION_IDS.length; i++) {
    for (let j = i + 1; j < CURATED_SEED_STATION_IDS.length; j++) {
      const fromId = CURATED_SEED_STATION_IDS[i];
      const toId = CURATED_SEED_STATION_IDS[j];
      const from = stationById.get(fromId);
      const to = stationById.get(toId);
      if (!from || !to) continue;

      const route = computeRoute(fromId, toId);
      if (!route || route.stops < 3) continue;

      const slug = `${slugify(from.name_en)}-to-${slugify(to.name_en)}`;
      candidates.push({ slug, from, to, route });
    }
  }

  // Shortest journeys first — most likely to be real, high-intent searches.
  candidates.sort((a, b) => a.route.durationMin - b.route.durationMin);

  const perStationCount = new Map<string, number>();
  const seen = new Set<string>();
  const out: CuratedRoute[] = [];

  for (const c of candidates) {
    const fromCount = perStationCount.get(c.from.id) ?? 0;
    const toCount = perStationCount.get(c.to.id) ?? 0;
    if (fromCount >= PER_STATION_CAP && toCount >= PER_STATION_CAP) continue;
    if (seen.has(c.slug)) continue;

    seen.add(c.slug);
    perStationCount.set(c.from.id, fromCount + 1);
    perStationCount.set(c.to.id, toCount + 1);
    out.push(c);
  }

  out.sort((a, b) => a.slug.localeCompare(b.slug));
  _curatedRoutes = out;
  return _curatedRoutes;
}

export function getCuratedRouteBySlug(slug: string): CuratedRoute | undefined {
  return getCuratedRoutes().find(r => r.slug === slug);
}

// Curated routes that touch a given station — for "routes from here" (station pages)
// and "other routes from this journey" (route pages) internal-linking sections.
export function getRoutesForStation(stationId: string, excludeSlug?: string): CuratedRoute[] {
  return getCuratedRoutes().filter(
    r => (r.from.id === stationId || r.to.id === stationId) && r.slug !== excludeSlug
  );
}
