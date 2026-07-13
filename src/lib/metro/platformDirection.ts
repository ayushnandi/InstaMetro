import { SEQUENCES, STATION_BY_ID } from '@/data/dmrc';
import type { LineKey } from '@/types/metro';

export type PlatformInfo = { platform: 1 | 2; terminusStationId: string; terminusName: string };

// Resolve platform + terminus for the hop fromStationId -> toStationId on lineId.
// Picks the SEQUENCES entry that contains both stations adjacently (handles branches).
export function resolvePlatform(lineId: LineKey, fromStationId: string, toStationId: string): PlatformInfo | null {
  for (const seq of SEQUENCES) {
    if (seq.lineId !== lineId) continue;
    const fi = seq.stations.indexOf(fromStationId);
    const ti = seq.stations.indexOf(toStationId);
    if (fi === -1 || ti === -1 || Math.abs(fi - ti) !== 1) continue;
    const platform: 1 | 2 = ti > fi ? 1 : 2;
    const terminusStationId = platform === 1 ? seq.stations[seq.stations.length - 1] : seq.stations[0];
    const terminusName = STATION_BY_ID.get(terminusStationId)?.name_en ?? terminusStationId;
    return { platform, terminusStationId, terminusName };
  }
  return null;
}

// Display strings for a station's two platforms, e.g. { plat1: "towards Rithala", plat2: "Terminal" }.
export function getPlatformDirections(lineId: LineKey, stationId: string): { plat1: string; plat2: string } {
  const platforms = getStationPlatforms(lineId, stationId);
  const p1 = platforms.find(p => p.platform === 1);
  const p2 = platforms.find(p => p.platform === 2);
  return {
    plat1: p1 ? `towards ${p1.terminusName}` : 'Terminal',
    plat2: p2 ? `towards ${p2.terminusName}` : 'Terminal',
  };
}

// All platforms serving a station on a given line (1-2 entries; junctions may yield more, deduped by terminus).
export function getStationPlatforms(lineId: LineKey, stationId: string): PlatformInfo[] {
  const out: PlatformInfo[] = [];
  const seen = new Set<string>();
  for (const seq of SEQUENCES) {
    if (seq.lineId !== lineId) continue;
    const i = seq.stations.indexOf(stationId);
    if (i === -1) continue;
    if (i < seq.stations.length - 1) {
      const terminusStationId = seq.stations[seq.stations.length - 1];
      if (!seen.has(`1:${terminusStationId}`)) {
        seen.add(`1:${terminusStationId}`);
        out.push({ platform: 1, terminusStationId, terminusName: STATION_BY_ID.get(terminusStationId)?.name_en ?? terminusStationId });
      }
    }
    if (i > 0) {
      const terminusStationId = seq.stations[0];
      if (!seen.has(`2:${terminusStationId}`)) {
        seen.add(`2:${terminusStationId}`);
        out.push({ platform: 2, terminusStationId, terminusName: STATION_BY_ID.get(terminusStationId)?.name_en ?? terminusStationId });
      }
    }
  }
  return out;
}
