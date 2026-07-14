import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP, LINE_COLORS, LINES } from '@/lib/tokens';
import { STATIONS } from '@/lib/metro';

const CALLOUTS = [
  { title: 'Tap any station', desc: 'Platform directions, exits and facilities', icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/> },
  { title: 'Trace a line',    desc: 'Follow it end to end, in colour', icon: <><path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="6" cy="12" r="2" fill="currentColor"/><circle cx="18" cy="12" r="2" fill="currentColor"/></> },
  { title: 'Landmark markers', desc: 'Tap any station for platform directions', icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></> },
];

export default function NetworkMap() {
  return (
    <section id="network" style={{ background: 'var(--bg)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        {/* Header */}
        <AnimatedSection className="text-center mx-auto mb-14" style={{ maxWidth: 640 }}>
          <Eyebrow color="var(--violet-c)" className="justify-center">The network</Eyebrow>
          <SectionTitle className="mb-4">One map for the entire Delhi Metro — part of the Indian Metro Revolution.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            A complete schematic of all 10 Delhi lines, colour-coded and zoomable, with interchange markers.{' '}
            Riding elsewhere? Browse every{' '}
            <Link href="/metro-systems" style={{ color: 'var(--accent)' }}>metro system in India</Link>.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]" style={{ gap: 28, alignItems: 'start' }}>
          {/* Map */}
          <AnimatedSection>
            <div style={{
              background: 'var(--surface1)', borderRadius: 24, border: '1px solid var(--hairline)',
              padding: 24, position: 'relative', overflow: 'hidden',
              boxShadow: '0 24px 60px -32px rgba(0,0,0,0.35)',
            }}>
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', top: -140, left: '50%', transform: 'translateX(-50%)',
                width: 640, height: 320, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)',
                opacity: 0.12,
              }}/>

              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18, flexWrap: 'wrap', position: 'relative' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px 6px 10px', borderRadius: 99,
                  background: 'var(--surface2)', border: '1px solid var(--hairline)',
                }}>
                  <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-flex' }}>
                    <span className="live-ping-ring"/>
                    <span style={{ position: 'relative', width: 8, height: 8, borderRadius: 99, background: 'var(--money)', display: 'inline-block' }}/>
                  </span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 600, letterSpacing: 0.8, color: 'var(--text)', textTransform: 'uppercase' }}>
                    Live network
                  </span>
                </div>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--text-mute)' }}>
                  {STATIONS.length} stations · {LINES.length} lines
                </span>
              </div>

              <div style={{ position: 'relative', aspectRatio: '4 / 3.05', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--hairline2)' }}>
                <Image
                  src="/screens/route-wide-dark.png"
                  alt="A real Delhi Metro route drawn on the live lyne. map"
                  fill
                  unoptimized
                  style={{ objectFit: 'cover', objectPosition: 'center 34%' }}
                />
              </div>

              <div style={{ marginTop: 16, textAlign: 'right', position: 'relative' }}>
                <Link href="/stations" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
                  Explore every station →
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Right column */}
          <AnimatedSection delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Lines legend */}
              <div style={{ background: 'var(--surface1)', borderRadius: 20, border: '1px solid var(--hairline)', padding: 22 }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 14 }}>{LINES.length} lines</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px' }}>
                  {LINES.map(l => (
                    <div key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 5, borderRadius: 3, background: LINE_COLORS[l.key], flexShrink: 0 }}/>
                      <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{l.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout list */}
              <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 20 }}>
                {CALLOUTS.map((c, i) => (
                  <div
                    key={c.title}
                    style={{
                      padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start',
                      borderTop: i > 0 ? '1px solid var(--hairline)' : undefined,
                    }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      background: 'var(--surface2)', color: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{c.icon}</svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{c.title}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
