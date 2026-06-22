'use client';
import { Icon, StatusBar, Mono, Monument } from './PhoneComponents';
import { useL, usePhoneTheme } from './PhoneTheme';

export default function ScreenLive() {
  const L = useL();
  const theme = usePhoneTheme();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: L.bg, position: 'relative', height: '100%', overflow: 'hidden' }}>
      <StatusBar />

      {/* Map area — 360px tall */}
      <div style={{ flexShrink: 0, height: 360, position: 'relative', overflow: 'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 380 360" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`map-grid-live-${theme}`} width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M36 0H0v36" stroke={L.mapGrid} fill="none"/>
            </pattern>
            <radialGradient id={`user-glow-${theme}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={L.accent} stopOpacity="0.5"/>
              <stop offset="100%" stopColor={L.accent} stopOpacity="0"/>
            </radialGradient>
            <filter id="monument-glow-live">
              <feDropShadow dx="0" dy="3" stdDeviation="3"
                floodColor={theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(80,50,20,0.30)'}/>
            </filter>
          </defs>

          {/* Base map */}
          <rect width="380" height="360" fill={L.mapBg}/>
          <rect width="380" height="360" fill={`url(#map-grid-live-${theme})`}/>

          {/* City blocks */}
          <g fill={L.mapBlock} opacity="0.85">
            <rect x="20"  y="40"  width="70"  height="50" rx="4"/>
            <rect x="100" y="30"  width="55"  height="38" rx="4"/>
            <rect x="215" y="50"  width="45"  height="70" rx="4"/>
            <rect x="265" y="40"  width="75"  height="48" rx="4"/>
            <rect x="20"  y="118" width="55"  height="38" rx="4"/>
            <rect x="90"  y="130" width="65"  height="55" rx="4"/>
            <rect x="215" y="148" width="45"  height="38" rx="4"/>
            <rect x="265" y="108" width="38"  height="48" rx="4"/>
            <rect x="310" y="108" width="48"  height="75" rx="4"/>
            <rect x="20"  y="225" width="75"  height="55" rx="4"/>
            <rect x="110" y="225" width="55"  height="55" rx="4"/>
            <rect x="215" y="225" width="70"  height="48" rx="4"/>
            <rect x="290" y="228" width="55"  height="55" rx="4"/>
            <rect x="20"  y="305" width="115" height="48" rx="4"/>
            <rect x="155" y="295" width="55"  height="58" rx="4"/>
            <rect x="225" y="305" width="95"  height="48" rx="4"/>
          </g>

          {/* River */}
          <path d="M-20 200 Q 90 178 185 212 T 410 196"
            stroke={L.mapRiver} strokeWidth="28" fill="none" opacity="0.7" strokeLinecap="round"/>
          {/* River shimmer */}
          <path d="M-20 198 Q 90 176 185 210 T 410 194"
            stroke={theme === 'dark' ? 'rgba(100,160,220,0.18)' : 'rgba(255,255,255,0.55)'}
            strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="18 24"/>

          {/* Route glow + line */}
          <path d="M60 60 L60 100 L140 100 L200 162 L200 212 L300 212 L300 282"
            stroke={L.accent} strokeWidth="22" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.12"/>
          <path d="M60 60 L60 100 L140 100 L200 162 L200 212 L300 212 L300 282"
            stroke={L.accent} strokeWidth="5.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.96"/>

          {/* Monuments */}
          <g filter="url(#monument-glow-live)">
            <Monument kind="gate"        x={28}  y={56}  scale={0.60} theme={theme}/>
          </g>
          <g filter="url(#monument-glow-live)">
            <Monument kind="minar"       x={152} y={94}  scale={0.58} theme={theme}/>
          </g>
          <g filter="url(#monument-glow-live)">
            <Monument kind="observatory" x={215} y={148} scale={0.62} theme={theme}/>
          </g>
          <g filter="url(#monument-glow-live)">
            <Monument kind="stupa"       x={168} y={220} scale={0.52} theme={theme}/>
          </g>
          <g filter="url(#monument-glow-live)">
            <Monument kind="fort"        x={316} y={188} scale={0.58} theme={theme}/>
          </g>

          {/* Monument label chips */}
          {[
            { x: 44,  y: 20,  label: 'Hauz Khas Gate' },
            { x: 152, y: 60,  label: 'Minar Complex' },
            { x: 215, y: 110, label: 'Observatory' },
            { x: 182, y: 188, label: 'Old Stupa' },
            { x: 316, y: 154, label: 'Fort Walls' },
          ].map((m, i) => (
            <g key={i}>
              <rect x={m.x - 2} y={m.y - 11} width={m.label.length * 5.2 + 10} height={14}
                rx="4" fill={theme === 'dark' ? 'rgba(20,20,20,0.80)' : 'rgba(255,253,247,0.88)'}/>
              <text x={m.x + 3} y={m.y}
                fontFamily="DM Sans, system-ui" fontSize="7.5" fontWeight="600"
                fill={theme === 'dark' ? '#C99458' : '#8A5E2D'}>
                {m.label}
              </text>
            </g>
          ))}

          {/* Station dots */}
          {[
            { x: 60,  y: 60,  big: true },
            { x: 140, y: 100, big: false },
            { x: 200, y: 162, big: true },
            { x: 200, y: 212, big: true, interchange: true },
            { x: 300, y: 212, big: false },
            { x: 300, y: 282, big: true, dest: true },
          ].map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r={s.big ? 9 : 5}
                fill={L.mapBg} stroke={s.dest ? L.money : L.text}
                strokeWidth={s.big ? 2.5 : 2}/>
              {s.interchange && <circle cx={s.x} cy={s.y} r="3.5" fill={L.line.amber}/>}
              {s.dest && <circle cx={s.x} cy={s.y} r="4.5" fill={L.money}/>}
            </g>
          ))}

          {/* User pulse */}
          <circle cx="60" cy="60" r="22" fill={`url(#user-glow-${theme})`}/>
          <circle cx="60" cy="60" r="6" fill={L.accent} stroke={L.mapBg} strokeWidth="2.5"/>
        </svg>

        {/* Floating nav buttons */}
        <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{
            width: 40, height: 40, borderRadius: 12, background: L.floatBg,
            border: `1px solid ${L.hairline}`, backdropFilter: 'blur(14px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: L.text, cursor: 'pointer',
          }}>
            <Icon name="arrowL" size={18}/>
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['layers', 'share'] as const).map(icon => (
              <button key={icon} style={{
                width: 40, height: 40, borderRadius: 12, background: L.floatBg,
                border: `1px solid ${L.hairline}`, backdropFilter: 'blur(14px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: L.text, cursor: 'pointer',
              }}>
                <Icon name={icon} size={18}/>
              </button>
            ))}
          </div>
        </div>

        {/* Destination label */}
        <div style={{
          position: 'absolute', left: '79%', top: '76%',
          transform: 'translate(-50%, -120%)',
          background: L.text, color: L.bg,
          padding: '4px 9px', borderRadius: 8, fontSize: 11, fontWeight: 600,
          whiteSpace: 'nowrap',
          boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.6)' : '0 4px 12px rgba(60,40,20,0.25)',
        }}>Vaishali</div>
      </div>

      {/* Bottom sheet */}
      <div style={{
        flex: 1, background: L.bg, borderRadius: '24px 24px 0 0',
        marginTop: -22, position: 'relative', zIndex: 5,
        padding: '6px 20px 0', display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          width: 44, height: 4, borderRadius: 99, background: L.surface3,
          margin: '0 auto 14px', flexShrink: 0,
        }}/>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <Mono size={11} color={L.textDim}>Arriving</Mono>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 8px', borderRadius: 99, background: `${L.money}22`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: L.money }}/>
            <Mono size={10} color={L.money}>On time</Mono>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 18 }}>
          <Mono size={36} weight={600} color={L.text}>10:12</Mono>
          <span style={{ fontSize: 14, color: L.textDim }}>· in 28 min</span>
        </div>

        {/* Train banner */}
        <div style={{
          background: `linear-gradient(135deg, ${L.line.blue}26 0%, ${L.surface1} 65%)`,
          borderRadius: 16, padding: 14, marginBottom: 14, flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: L.line.blue,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name="train" size={22} color="#fff"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Mono size={11} color={L.line.blue} weight={600}>BLUE LINE</Mono>
              <span style={{ color: L.textMute, fontSize: 11 }}>· Northbound</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: L.text, marginTop: 2 }}>
              Toward Vaishali
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <Mono size={22} weight={600} color={L.text}>2</Mono>
            <Mono size={10} color={L.textDim} style={{ display: 'block' }}>min</Mono>
          </div>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative', paddingLeft: 26, marginBottom: 16 }}>
          <div style={{
            position: 'absolute', left: 9, top: 6, bottom: 6, width: 2,
            background: `linear-gradient(to bottom, ${L.textMute}, ${L.line.blue}, ${L.line.blue}, ${L.textMute})`,
          }}/>
          {[
            { main: 'Walk to Rajiv Chowk',   sub: '3 min · 220 m',       dot: L.textMute },
            { main: 'Board Blue Line',        sub: 'Platform 2 · 6 stops', dot: L.line.blue },
            { main: 'Exit at Vaishali',       sub: 'Use exit B · Northwest', dot: L.line.blue },
            { main: 'Walk to destination',    sub: '4 min · 310 m',       dot: L.textMute },
          ].map((s, i) => (
            <div key={i} style={{ position: 'relative', paddingBottom: i < 3 ? 16 : 0 }}>
              <span style={{
                position: 'absolute', left: -22, top: 4,
                width: 16, height: 16, borderRadius: 99, background: L.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: s.dot }}/>
              </span>
              <div style={{ fontSize: 14, fontWeight: 500, color: L.text }}>{s.main}</div>
              <Mono size={11} color={L.textDim} style={{ marginTop: 2, display: 'block' }}>{s.sub}</Mono>
            </div>
          ))}
        </div>

        {/* Fare CTA bar */}
        <div style={{
          background: L.surface1, borderRadius: 18, padding: 14,
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexShrink: 0,
        }}>
          <div>
            <Mono size={10} color={L.textDim} style={{ display: 'block', textTransform: 'uppercase', letterSpacing: 0.6 }}>Total fare</Mono>
            <Mono size={22} weight={600} color={L.money}>₹40</Mono>
          </div>
          <div style={{ flex: 1 }}/>
          <button style={{
            padding: '12px 20px', borderRadius: 14, background: L.money, color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Icon name="ticket" size={16} color="#fff"/>
            Book ticket
          </button>
        </div>
      </div>
    </div>
  );
}
