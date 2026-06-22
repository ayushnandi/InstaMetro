export const LINE_COLORS = {
  red:     '#E84545',
  blue:    '#4D7CFF',
  green:   '#29A776',
  violet:  '#8456D9',
  amber:   '#F4B400',
  aqua:    '#2BC3D6',
  pink:    '#E867A7',
  magenta: '#C8358C',
} as const;

export type LineKey = keyof typeof LINE_COLORS;

export const LINES: { key: LineKey; name: string }[] = [
  { key: 'blue',    name: 'Blue Line' },
  { key: 'amber',   name: 'Airport Express' },
  { key: 'red',     name: 'Red Line' },
  { key: 'green',   name: 'Green Line' },
  { key: 'violet',  name: 'Violet Line' },
  { key: 'pink',    name: 'Pink Line' },
  { key: 'aqua',    name: 'Aqua Line' },
  { key: 'magenta', name: 'Magenta Line' },
];

export const WRAP = 'mx-auto max-w-[1180px] px-7';
