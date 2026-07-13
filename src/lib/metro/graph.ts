import type { Edge, Stop } from '@/types/metro';

export type GraphNeighbour = { stopId: string; travelMin: number };
export type Graph = Map<string, GraphNeighbour[]>;

export function buildGraph(edges: Edge[]): Graph {
  const graph: Graph = new Map();

  function addEdge(from: string, to: string, travelMin: number) {
    const list = graph.get(from) ?? [];
    list.push({ stopId: to, travelMin });
    graph.set(from, list);
  }

  for (const edge of edges) {
    addEdge(edge.from_stop_id, edge.to_stop_id, edge.travel_min);
    addEdge(edge.to_stop_id, edge.from_stop_id, edge.travel_min);
  }

  return graph;
}

// Adds bidirectional transfer edges between stops at the same station on different lines.
export function addInterchangeEdges(
  graph: Graph,
  stops: Stop[],
  penaltyMin: number = 5
): Graph {
  const byStation = new Map<string, string[]>();
  for (const stop of stops) {
    const arr = byStation.get(stop.station_id) ?? [];
    arr.push(stop.id);
    byStation.set(stop.station_id, arr);
  }

  for (const [, stopIds] of byStation) {
    if (stopIds.length < 2) continue;
    for (let i = 0; i < stopIds.length; i++) {
      for (let j = i + 1; j < stopIds.length; j++) {
        const a = stopIds[i];
        const b = stopIds[j];
        const listA = graph.get(a) ?? [];
        listA.push({ stopId: b, travelMin: penaltyMin });
        graph.set(a, listA);
        const listB = graph.get(b) ?? [];
        listB.push({ stopId: a, travelMin: penaltyMin });
        graph.set(b, listB);
      }
    }
  }

  return graph;
}
