'use client';
import React from 'react';
import { useL } from './PhoneTheme';
import { Icon, StatusBar, TabBar, LineDot, LineBadge, Mono, SectionLabel, Card } from './PhoneComponents';

export default function ScreenHome() {
  const L = useL();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: L.bg }}>
      <StatusBar />

      {/* Header: avatar · greeting · bell */}
      <div style={{ padding: '14px 20px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="6"  cy="6"  r="2.4" fill={L.accent}/>
          <circle cx="22" cy="6"  r="2.4" fill={L.text}/>
          <circle cx="14" cy="14" r="2.4" fill={L.text}/>
          <circle cx="6"  cy="22" r="2.4" fill={L.text}/>
          <circle cx="22" cy="22" r="2.4" fill={L.warn}/>
          <path d="M6 6L14 14L22 22" stroke={L.text} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M22 6L14 14L6 22" stroke={L.text} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: L.textDim }}>Good morning</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: L.text }}>Batman</div>
        </div>
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          background: L.surface1, border: 'none', color: L.text,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="bell" size={18} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 12px', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>

        {/* Search / Where to card */}
        <button style={{
          width: '100%', textAlign: 'left', padding: 0, border: 'none',
          cursor: 'pointer', background: 'transparent', marginBottom: 18,
        }}>
          <div style={{
            background: L.surface1, borderRadius: 22, padding: 18,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, background: L.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>
              <Icon name="search" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: L.text }}>Where to?</div>
              <div style={{ fontSize: 12, color: L.textDim, marginTop: 2 }}>Plan a trip across the network</div>
            </div>
            <Icon name="arrow45" size={16} color={L.textDim} />
          </div>
        </button>

        {/* Quick chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
          {([
            { icon: 'home',    label: 'Home',    sub: '14 min' },
            { icon: 'sparkle', label: 'Work',    sub: '22 min' },
            { icon: 'pin',     label: 'Airport', sub: '48 min' },
            { icon: 'plus',    label: 'New',     sub: null     },
          ] as const).map((c, i) => (
            <button key={i} style={{
              flexShrink: 0, padding: '10px 14px', borderRadius: 14,
              background: L.surface1, border: 'none', color: L.text, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon name={c.icon} size={16} color={L.textDim} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</span>
              {c.sub && <Mono size={12} color={L.textDim}>· {c.sub}</Mono>}
            </button>
          ))}
        </div>

        {/* Active ticket section */}
        <SectionLabel action={
          <span style={{ fontSize: 12, color: L.accent, fontWeight: 600, cursor: 'pointer' }}>
            All tickets →
          </span>
        }>Active</SectionLabel>

        <Card padding={0} style={{ marginBottom: 22, overflow: 'hidden' }}>
          <div style={{
            background: `linear-gradient(135deg, ${L.line.blue}26 0%, ${L.surface1} 60%)`,
            padding: 16,
          }}>
            {/* Line indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <LineDot color={L.line.blue} size={8} />
              <span style={{
                fontSize: 11, color: L.textDim, fontWeight: 500,
                letterSpacing: 0.5, textTransform: 'uppercase',
              }}>Blue line · Valid for 1h 47m</span>
            </div>
            {/* Route row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: L.textMute }}>From</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: L.text, marginTop: 2 }}>Kashmere Gate</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Icon name="arrowR" size={14} color={L.textDim} />
                <Mono size={10} color={L.textDim}>6 stops</Mono>
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: L.textMute }}>To</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: L.text, marginTop: 2 }}>Vaishali</div>
              </div>
              <div style={{
                width: 52, height: 52, borderRadius: 12, background: L.surface3,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name="qr" size={26} color={L.money} />
              </div>
            </div>
          </div>
        </Card>

        {/* Nearby station */}
        <SectionLabel>Nearby station</SectionLabel>
        <Card style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 99,
              background: L.surface3, display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="pinFill" size={18} color={L.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: L.text }}>Rajiv Chowk</span>
                <Mono size={11} color={L.textMute}>· 220m</Mono>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                <LineBadge color={L.line.blue} abbr="BL" />
                <LineBadge color={L.line.green} abbr="GR" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {([
                  { color: L.line.blue,  dest: 'Vaishali',    eta: '2 min' },
                  { color: L.line.green, dest: 'Inderlok',    eta: '4 min' },
                  { color: L.line.blue,  dest: 'Yamuna Bank', eta: '7 min' },
                ] as const).map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <LineDot color={t.color} size={7} />
                    <span style={{ fontSize: 13, color: L.text, flex: 1 }}>{t.dest}</span>
                    <Mono size={12} color={L.money}>{t.eta}</Mono>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Lyne+ promo */}
        <Card style={{ marginBottom: 12, background: L.surface1, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', right: -40, top: -40, width: 160, height: 160,
            borderRadius: 99,
            background: `radial-gradient(circle, ${L.line.amber}30, transparent 70%)`,
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Icon name="sparkle" size={14} color={L.line.amber} />
              <span style={{
                fontSize: 11, color: L.line.amber, fontWeight: 600,
                letterSpacing: 0.5, textTransform: 'uppercase',
              }}>Lyne+ Pass</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: L.text, marginBottom: 4 }}>
              Save ₹420 this month
            </div>
            <div style={{ fontSize: 12, color: L.textDim, marginBottom: 14 }}>
              Unlimited rides on every line for ₹1,200/mo.
            </div>
            <button style={{
              padding: '8px 14px', borderRadius: 10, background: L.text,
              color: '#0A0A0A', border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer',
            }}>Get pass</button>
          </div>
        </Card>

      </div>

      <TabBar active="home" />
    </div>
  );
}
