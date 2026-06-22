'use client';
import React from 'react';
import { useL, usePhoneTheme } from './PhoneTheme';

const PATHS: Record<string, React.ReactNode> = {
  arrowL:  <path d="M15 6l-6 6 6 6" />,
  arrowR:  <path d="M9 6l6 6-6 6" />,
  arrowDn: <path d="M6 9l6 6 6-6" />,
  swap:    <g><path d="M7 4v16M3 8l4-4 4 4" /><path d="M17 20V4M21 16l-4 4-4-4" /></g>,
  search:  <g><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></g>,
  pin:     <g><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></g>,
  pinFill: <g><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="2.5" fill="#0A0A0A" stroke="none"/></g>,
  bookmark:<path d="M6 4h12v17l-6-4-6 4V4z" />,
  clock:   <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></g>,
  qr:      <g><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></g>,
  ticket:  <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />,
  user:    <g><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></g>,
  bell:    <g><path d="M6 8a6 6 0 1 1 12 0c0 5 2 7 2 7H4s2-2 2-7z" /><path d="M10 19a2 2 0 0 0 4 0" /></g>,
  home:    <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />,
  plus:    <g><path d="M12 5v14M5 12h14" /></g>,
  close:   <g><path d="M6 6l12 12M18 6L6 18" /></g>,
  map:     <g><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v16M15 6v16" /></g>,
  layers:  <g><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5M3 17l9 5 9-5"/></g>,
  train:   <g><rect x="5" y="3" width="14" height="14" rx="3" /><circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/><path d="M8 17l-2 4M16 17l2 4M9 7h6" /></g>,
  walk:    <g><circle cx="13" cy="4" r="1.5" fill="currentColor" stroke="none"/><path d="M9 22l3-7-3-3 1-5 4 3 4 1M7 13l2-5"/></g>,
  arrow45: <g><path d="M7 17L17 7M9 7h8v8" /></g>,
  info:    <g><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 8v.5"/></g>,
  sparkle: <g><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></g>,
  share:   <g><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 11l8-4M8 13l8 4"/></g>,
};

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.75 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name] || null}
    </svg>
  );
}

export function StatusBar({ time = '11:11' }: { time?: string }) {
  const L = useL();
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 28px 10px', height:54, flexShrink:0, fontFamily:'-apple-system, "SF Pro", system-ui', fontWeight:600, fontSize:15, color:L.text }}>
      <span>{time}</span>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <svg width="16" height="10" viewBox="0 0 16 10">
          <rect x="0" y="6" width="2.6" height="4" rx="0.5" fill={L.text}/>
          <rect x="4" y="4" width="2.6" height="6" rx="0.5" fill={L.text}/>
          <rect x="8" y="2" width="2.6" height="8" rx="0.5" fill={L.text}/>
          <rect x="12" y="0" width="2.6" height="10" rx="0.5" fill={L.text}/>
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10">
          <path d="M7 2.6c1.9 0 3.6.7 4.8 2L13 3.4C11.3 1.7 9.2 1 7 1S2.7 1.7 1 3.4l1.2 1.2C3.4 3.3 5.1 2.6 7 2.6z" fill={L.text}/>
          <path d="M7 5.5c1.1 0 2.2.4 3 1.2L11 5.6C9.9 4.6 8.5 4 7 4S4.1 4.6 3 5.6L4 6.7c.8-.8 1.9-1.2 3-1.2z" fill={L.text}/>
          <circle cx="7" cy="8.6" r="1.2" fill={L.text}/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={L.text} strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="17" height="7" rx="1.5" fill={L.text}/>
          <rect x="21.5" y="3.5" width="2" height="4" rx="1" fill={L.text} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

export function TopBar({ title, onBack, action, subtitle }: { title?: string; onBack?: () => void; action?: React.ReactNode; subtitle?: string }) {
  const L = useL();
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'6px 20px 18px', minHeight:48, flexShrink:0 }}>
      {onBack !== undefined && (
        <button onClick={onBack} style={{ width:40, height:40, borderRadius:12, background:L.surface2, border:`1px solid ${L.hairline}`, display:'flex', alignItems:'center', justifyContent:'center', color:L.text, cursor:'pointer', padding:0 }}>
          <Icon name="arrowL" size={18}/>
        </button>
      )}
      <div style={{ flex:1, minWidth:0 }}>
        {title && <div style={{ fontSize:17, fontWeight:600, color:L.text, letterSpacing:-0.2 }}>{title}</div>}
        {subtitle && <div style={{ fontSize:12, color:L.textDim, marginTop:2 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

export function TabBar({ active = 'home' }: { active?: string }) {
  const L = useL();
  const tabs = [
    { id:'home',   label:'Home',    icon:'home' },
    { id:'route',  label:'Plan',    icon:'map' },
    { id:'wallet', label:'Tickets', icon:'ticket' },
    { id:'me',     label:'Me',      icon:'user' },
  ];
  return (
    <div style={{ flexShrink:0, padding:'10px 16px 22px', background:L.bg, borderTop:`1px solid ${L.hairline}` }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', background:L.surface1, borderRadius:22, padding:6 }}>
        {tabs.map(t => {
          const on = active === t.id;
          return (
            <button key={t.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'8px 0', borderRadius:16, border:'none', cursor:'pointer', background: on ? L.surface3 : 'transparent', color: on ? L.text : L.textDim }}>
              <Icon name={t.icon} size={20} strokeWidth={on ? 2 : 1.6}/>
              <span style={{ fontSize:10.5, fontWeight: on ? 600 : 500, letterSpacing:0.1 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Card({ children, onClick, style = {}, padding = 16 }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties; padding?: number }) {
  const L = useL();
  return (
    <div onClick={onClick} style={{ background:L.surface1, borderRadius:18, padding, cursor: onClick ? 'pointer' : 'default', ...style }}>
      {children}
    </div>
  );
}

export function LineDot({ color, size = 10, ring = false }: { color: string; size?: number; ring?: boolean }) {
  return <span style={{ width:size, height:size, borderRadius:99, background:color, display:'inline-block', flexShrink:0, boxShadow: ring ? `0 0 0 3px ${color}33` : 'none' }}/>;
}

export function LineBadge({ color, name, abbr }: { color: string; name?: string; abbr?: string }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 9px 4px 7px', borderRadius:99, background:`${color}1F`, color, fontSize:11.5, fontWeight:600 }}>
      <span style={{ width:6, height:6, borderRadius:99, background:color }}/>
      {abbr || name}
    </span>
  );
}

export function Mono({ children, size = 14, weight = 500, color = 'inherit', style = {} }: { children: React.ReactNode; size?: number; weight?: number; color?: string; style?: React.CSSProperties }) {
  return <span style={{ fontFamily:'DM Mono, ui-monospace, monospace', fontSize:size, fontWeight:weight, color, letterSpacing:-0.2, ...style }}>{children}</span>;
}

export function SectionLabel({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  const L = useL();
  return (
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'4px 4px 10px' }}>
      <span style={{ fontSize:11, fontWeight:500, letterSpacing:1.2, textTransform:'uppercase', color:L.textMute }}>{children}</span>
      {action}
    </div>
  );
}

export function QRCodeArt({ size = 196, color = '#0A0A0A', bg = '#FEFCF8' }: { size?: number; color?: string; bg?: string }) {
  const seed = 'LYNE-TKT-7H8K';
  const cells = 21;
  const cell = size / cells;
  const bits: boolean[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) { h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0; }
  for (let i = 0; i < cells * cells; i++) { h = (Math.imul(1664525, h) + 1013904223) | 0; bits.push((h >>> 31) === 1); }
  const fp = (ox: number, oy: number) => (
    <g key={`fp${ox}${oy}`}>
      <rect x={ox * cell} y={oy * cell} width={7 * cell} height={7 * cell} fill={color}/>
      <rect x={(ox + 1) * cell} y={(oy + 1) * cell} width={5 * cell} height={5 * cell} fill={bg}/>
      <rect x={(ox + 2) * cell} y={(oy + 2) * cell} width={3 * cell} height={3 * cell} fill={color}/>
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={bg}/>
      {bits.map((b, i) => {
        const row = Math.floor(i / cells), col = i % cells;
        if ((row < 8 && col < 8) || (row < 8 && col > cells - 9) || (row > cells - 9 && col < 8)) return null;
        if (!b) return null;
        return <rect key={i} x={col * cell} y={row * cell} width={cell} height={cell} fill={color}/>;
      })}
      {fp(0, 0)}{fp(cells - 7, 0)}{fp(0, cells - 7)}
    </svg>
  );
}

export function Monument({ kind = 'gate', x = 0, y = 0, scale = 1, theme = 'dark' }: { kind?: string; x?: number; y?: number; scale?: number; theme?: string }) {
  const fill  = theme === 'light' ? '#D9B173' : '#C99458';
  const light = theme === 'light' ? '#EBCA94' : '#E0B26F';
  const shade = theme === 'light' ? '#A57D44' : '#8A5E2D';
  const gs    = theme === 'light' ? 'rgba(60,40,20,0.20)' : 'rgba(0,0,0,0.45)';
  let Body: React.ReactNode = null;
  switch (kind) {
    case 'minar': Body = <g>
      <path d="M-14 0 L14 0 L11 -6 L-11 -6 Z" fill={shade}/>
      <path d="M-10 -6 L10 -6 L7 -42 L-7 -42 Z" fill={fill}/>
      <path d="M0 -6 L10 -6 L7 -42 L0 -42 Z" fill={light} opacity="0.7"/>
      <path d="M-11 -18 L11 -18 L9 -20 L-9 -20 Z" fill={shade}/>
      <path d="M-9 -30 L9 -30 L7.5 -32 L-7.5 -32 Z" fill={shade}/>
      <path d="M-6 -42 L6 -42 L4 -48 L-4 -48 Z" fill={fill}/>
      <circle cx="0" cy="-50" r="2" fill={shade}/>
    </g>; break;
    case 'gate': Body = <g>
      <path d="M-30 0 L30 0 L26 -4 L-26 -4 Z" fill={shade}/>
      <path d="M-26 -4 L26 -4 L26 -28 L-26 -28 Z" fill={fill}/>
      <path d="M0 -4 L26 -4 L26 -28 L0 -28 Z" fill={light} opacity="0.55"/>
      <path d="M-7 -4 L-7 -20 Q 0 -28 7 -20 L7 -4 Z" fill={shade}/>
      <path d="M-22 -4 L-22 -14 Q -18 -18 -14 -14 L-14 -4 Z" fill={shade}/>
      <path d="M14 -4 L14 -14 Q 18 -18 22 -14 L22 -4 Z" fill={shade}/>
      <path d="M-28 -28 L28 -28 L28 -30 L-28 -30 Z" fill={shade}/>
      <ellipse cx="0" cy="-30" rx="8" ry="3" fill={shade}/>
      <path d="M-8 -30 Q 0 -44 8 -30 Z" fill={fill}/>
      <rect x="-0.6" y="-48" width="1.2" height="6" fill={shade}/>
      <ellipse cx="-22" cy="-30" rx="3.5" ry="1.5" fill={shade}/>
      <path d="M-25.5 -30 Q -22 -36 -18.5 -30 Z" fill={fill}/>
      <ellipse cx="22" cy="-30" rx="3.5" ry="1.5" fill={shade}/>
      <path d="M18.5 -30 Q 22 -36 25.5 -30 Z" fill={fill}/>
    </g>; break;
    case 'stupa': Body = <g>
      <ellipse cx="0" cy="0" rx="22" ry="4" fill={shade}/>
      <path d="M-22 0 L22 0 L18 -6 L-18 -6 Z" fill={shade}/>
      <path d="M-18 -6 L18 -6 L18 -10 L-18 -10 Z" fill={fill}/>
      <path d="M-18 -10 Q 0 -32 18 -10 Z" fill={fill}/>
      <path d="M0 -10 Q 0 -32 18 -10 Z" fill={light} opacity="0.5"/>
      <rect x="-3" y="-36" width="6" height="4" fill={shade}/>
      <rect x="-0.6" y="-46" width="1.2" height="10" fill={shade}/>
      <ellipse cx="0" cy="-40" rx="4" ry="1" fill={fill}/>
    </g>; break;
    case 'temple': Body = <g>
      <path d="M-16 0 L16 0 L13 -4 L-13 -4 Z" fill={shade}/>
      <path d="M-13 -4 L13 -4 L13 -12 L-13 -12 Z" fill={fill}/>
      <path d="M-12 -12 Q 0 -22 12 -12 Z" fill={shade}/>
      <path d="M-10 -16 Q 0 -26 10 -16 Z" fill={fill}/>
      <path d="M-8 -22 Q 0 -32 8 -22 Z" fill={shade}/>
      <path d="M-6 -28 Q 0 -38 6 -28 Z" fill={fill}/>
      <path d="M-4 -34 Q 0 -42 4 -34 Z" fill={shade}/>
      <rect x="-0.7" y="-48" width="1.4" height="6" fill={shade}/>
      <circle cx="0" cy="-42" r="2" fill={fill}/>
    </g>; break;
    case 'fort': Body = <g>
      <path d="M-26 0 L26 0 L22 -4 L-22 -4 Z" fill={shade}/>
      <path d="M-22 -4 L22 -4 L22 -22 L-22 -22 Z" fill={fill}/>
      <path d="M0 -4 L22 -4 L22 -22 L0 -22 Z" fill={light} opacity="0.45"/>
      {([-20,-14,-8,-2,4,10,16] as number[]).map((cx: number, i: number) => <rect key={i} x={cx} y={-26} width="4" height="4" fill={fill}/>)}
      <path d="M-3 -4 L-3 -12 Q 0 -16 3 -12 L3 -4 Z" fill={shade}/>
      <ellipse cx="22" cy="-4" rx="6" ry="2" fill={shade}/>
      <rect x="16" y="-28" width="12" height="24" fill={fill}/>
      <rect x="21.4" y="-40" width="1.2" height="10" fill={shade}/>
      <path d="M22.6 -40 L28 -38 L22.6 -36 Z" fill="#E84545"/>
    </g>; break;
    case 'observatory': Body = <g>
      <path d="M-22 0 L22 0 L18 -4 L-18 -4 Z" fill={shade}/>
      <path d="M-18 -4 L-18 -10 Q -12 -22 -4 -22 L-4 -4 Z" fill={fill}/>
      <path d="M-4 -4 L-4 -22 L20 -4 Z" fill={shade}/>
      <path d="M-4 -22 L20 -4 L18 -4 L-4 -20 Z" fill={light} opacity="0.6"/>
      <rect x="-6" y="-24" width="4" height="3" fill={shade}/>
    </g>; break;
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="2" rx="22" ry="3" fill={gs} opacity="0.55"/>
      {Body}
    </g>
  );
}
