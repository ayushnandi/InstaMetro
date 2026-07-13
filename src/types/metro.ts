// Metro domain types — ported from E:\Apps\lyne\types\index.ts (the RN app's source of truth).
// Keep in sync with that file's Station/Stop/Edge/Line/RouteResult shapes if it changes.

export type LineKey = 'red' | 'amber' | 'blue' | 'green' | 'violet' | 'pink' | 'aqua' | 'magenta' | 'orange' | 'grey';

export type Station = {
  id: string;
  name_en: string;
  name_hi: string;
  lat: number;
  lon: number;
  code: string;
  lines: LineKey[];
};

export type Line = {
  id: LineKey;
  name_en: string;
  name_hi: string;
};

export type Stop = {
  id: string;         // "${lineId}_${stationId}"
  station_id: string;
  line_id: LineKey;
  sequence: number;
};

export type Edge = {
  from_stop_id: string;
  to_stop_id: string;
  travel_min: number;
};

export type RouteSegment =
  | {
      type: 'walk';
      description_en: string;
      durationMin: number;
      distanceM: number;
    }
  | {
      type: 'line';
      lineId: LineKey;
      fromStation: Station;
      toStation: Station;
      stops: number;
      direction: string;
      platform?: 1 | 2;
      stationIds: string[];
    };

export type RouteResult = {
  tag: 'fastest' | 'cheapest' | 'scenic';
  tags: Array<'fastest' | 'cheapest' | 'scenic'>;
  durationMin: number;
  arriveTime: string;
  stops: number;
  changes: number;
  farePaise: number;
  segments: RouteSegment[];
};
