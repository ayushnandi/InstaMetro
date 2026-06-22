'use client';
import React from 'react';

const LINE_COLORS = {
  red:     '#E84545',
  amber:   '#F4B400',
  blue:    '#4D7CFF',
  green:   '#29A776',
  violet:  '#8456D9',
  pink:    '#E867A7',
  aqua:    '#2BC3D6',
  magenta: '#C8358C',
};

export const L_DARK = {
  mode: 'dark' as const,
  bg: '#0A0A0A', surface1: '#141414', surface2: '#1C1C1C', surface3: '#242424',
  hairline: 'rgba(255,255,255,0.06)',
  text: '#F5F5F5', textDim: 'rgba(245,245,245,0.62)', textMute: 'rgba(245,245,245,0.36)',
  accent: '#4D7CFF', accentDim: 'rgba(77,124,255,0.18)',
  money: '#3DD68C', warn: '#F4B400',
  mapBg: '#1C1C1C', mapBlock: '#242424', mapRiver: '#1a3a5a',
  mapGrid: 'rgba(255,255,255,0.04)', floatBg: 'rgba(10,10,10,0.72)',
  shadowMint: '0 30px 60px -20px rgba(61,214,140,0.40)',
  bezel: '#0a0a0a', indicator: 'rgba(255,255,255,0.55)',
  line: LINE_COLORS,
};

export const L_LIGHT = {
  mode: 'light' as const,
  bg: '#F6F3EC', surface1: '#FFFFFF', surface2: '#EEEAE0', surface3: '#E2DCCD',
  hairline: 'rgba(20,18,15,0.07)',
  text: '#161310', textDim: 'rgba(22,19,16,0.66)', textMute: 'rgba(22,19,16,0.38)',
  accent: '#2B53E8', accentDim: 'rgba(43,83,232,0.10)',
  money: '#0E9966', warn: '#B57A00',
  mapBg: '#EAE5D7', mapBlock: '#F4F0E5', mapRiver: '#9FC2DB',
  mapGrid: 'rgba(30,25,20,0.05)', floatBg: 'rgba(255,253,247,0.82)',
  shadowMint: '0 30px 60px -20px rgba(14,153,102,0.35)',
  bezel: '#dad4c4', indicator: 'rgba(40,30,20,0.45)',
  line: LINE_COLORS,
};

export type LTheme = typeof L_DARK | typeof L_LIGHT;

export const PhoneThemeCtx = React.createContext<{ L: LTheme; theme: 'light' | 'dark' }>({ L: L_DARK, theme: 'dark' });

export const useL = () => React.useContext(PhoneThemeCtx).L;
export const usePhoneTheme = () => React.useContext(PhoneThemeCtx).theme;
