'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const LINE = {
  red:     '#E84545',
  amber:   '#F4B400',
  blue:    '#4D7CFF',
  green:   '#29A776',
  violet:  '#8456D9',
  aqua:    '#2BC3D6',
};

function MonumentGate({ x, y, scale, theme }: { x: number; y: number; scale: number; theme: string }) {
  const s = scale;
  const c = theme === 'light' ? '#6B5E4E' : '#C4A882';
  const base = theme === 'light' ? '#8B7355' : '#D4B896';
  return (
    <g transform={`translate(${x - 20 * s}, ${y - 28 * s}) scale(${s})`}>
      <rect x="8" y="20" width="4" height="10" fill={c}/>
      <rect x="28" y="20" width="4" height="10" fill={c}/>
      <rect x="5" y="14" width="30" height="7" rx="1" fill={base}/>
      <path d="M10 14 Q20 4 30 14" fill={c} stroke={c} strokeWidth="1"/>
      <rect x="12" y="17" width="16" height="4" rx="1" fill={base} opacity="0.6"/>
    </g>
  );
}

function MonumentMinar({ x, y, scale, theme }: { x: number; y: number; scale: number; theme: string }) {
  const s = scale;
  const c = theme === 'light' ? '#8B6F5E' : '#D4A882';
  return (
    <g transform={`translate(${x - 8 * s}, ${y - 30 * s}) scale(${s})`}>
      <rect x="5" y="20" width="10" height="12" fill={c}/>
      <rect x="6" y="12" width="8" height="9" fill={c}/>
      <rect x="7" y="6" width="6" height="7" fill={c}/>
      <polygon points="10,0 12,6 8,6" fill={c}/>
    </g>
  );
}

function MonumentObservatory({ x, y, scale, theme }: { x: number; y: number; scale: number; theme: string }) {
  const s = scale;
  const c = theme === 'light' ? '#7B6B5A' : '#C8AA86';
  return (
    <g transform={`translate(${x - 14 * s}, ${y - 20 * s}) scale(${s})`}>
      <rect x="8" y="14" width="12" height="8" fill={c}/>
      <path d="M8 14 Q14 6 20 14" fill={c}/>
      <rect x="5" y="20" width="18" height="3" fill={c} opacity="0.7"/>
      <line x1="14" y1="6" x2="14" y2="14" stroke={c} strokeWidth="1.5"/>
    </g>
  );
}

function MonumentStupa({ x, y, scale, theme }: { x: number; y: number; scale: number; theme: string }) {
  const s = scale;
  const c = theme === 'light' ? '#8B7B6A' : '#C8B48E';
  return (
    <g transform={`translate(${x - 12 * s}, ${y - 22 * s}) scale(${s})`}>
      <ellipse cx="12" cy="16" rx="10" ry="7" fill={c}/>
      <rect x="6" y="20" width="12" height="3" fill={c}/>
      <line x1="12" y1="9" x2="12" y2="0" stroke={c} strokeWidth="1.5"/>
      <line x1="9" y1="4" x2="15" y2="4" stroke={c} strokeWidth="1"/>
    </g>
  );
}

export default function NetworkSVG() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const theme = mounted ? (resolvedTheme ?? 'light') : 'light';
  const isLight = theme === 'light';

  const mapBg = isLight ? '#EAE5D7' : '#0E0E0E';
  const gridStroke = isLight ? 'rgba(20,18,15,0.05)' : 'rgba(255,255,255,0.035)';
  const riverStroke = isLight ? '#92B8D4' : '#1a3a5a';
  const riverOpacity = isLight ? 0.6 : 0.55;
  const dotFill = mapBg;
  const dotStroke = isLight ? '#161310' : '#fff';

  return (
    <svg width="100%" viewBox="0 0 560 440" style={{ display: 'block', marginTop: 8 }}>
      <defs>
        <pattern id="net-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0v28" stroke={gridStroke} fill="none"/>
        </pattern>
      </defs>
      <rect width="560" height="440" fill={mapBg} rx="14"/>
      <rect width="560" height="440" fill="url(#net-grid)" rx="14"/>
      {/* River */}
      <path d="M-20 300 Q 140 270 280 310 T 580 290" stroke={riverStroke} strokeWidth="30" fill="none" opacity={riverOpacity} strokeLinecap="round"/>
      {/* Metro lines */}
      <path d="M40 110 L520 110" stroke={LINE.amber} strokeWidth="5" strokeLinecap="round"/>
      <path d="M70 50 L70 200 L300 200 L420 330 L420 410" stroke={LINE.red} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M280 30 L280 400" stroke={LINE.blue} strokeWidth="6" strokeLinecap="round"/>
      <path d="M100 380 L200 380 L280 320 L400 320 L500 380" stroke={LINE.green} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M460 60 L460 280 L380 360" stroke={LINE.violet} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 240 L240 240 L320 160 L520 160" stroke={LINE.aqua} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
      {/* Monuments */}
      <MonumentGate x={280} y={102} scale={0.78} theme={theme}/>
      <MonumentMinar x={70} y={42} scale={0.74} theme={theme}/>
      <MonumentObservatory x={460} y={272} scale={0.74} theme={theme}/>
      <MonumentStupa x={280} y={312} scale={0.66} theme={theme}/>
      {/* Interchange dots */}
      {([[280,110,1],[280,200,1],[420,320,1],[70,200,0],[460,160,0],[300,200,0],[200,380,0],[320,160,0]] as [number,number,number][]).map(([x,y,big],i) => (
        <circle key={i} cx={x} cy={y} r={big ? 7 : 4.5} fill={dotFill} stroke={dotStroke} strokeWidth={big ? 2.5 : 2}/>
      ))}
    </svg>
  );
}
