import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import NetworkSVG from '@/components/ui/NetworkSVG';
import { WRAP, LINE_COLORS, LINES } from '@/lib/tokens';

const CALLOUTS = [
  { title: 'Tap any station', desc: 'Platform directions, exits and facilities', icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/> },
  { title: 'Trace a line',    desc: 'Follow it end to end, in colour', icon: <><path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="6" cy="12" r="2" fill="currentColor"/><circle cx="18" cy="12" r="2" fill="currentColor"/></> },
  { title: 'Landmark markers', desc: 'Tap any station for platform directions', icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></> },
];

export default function NetworkMap() {
  return (
    <section id="network" style={{ background: 'var(--bg)' }}>
      <div className={WRAP} style={{ padding: '90px 28px' }}>
        {/* Header */}
        <AnimatedSection className="text-center mx-auto mb-14" style={{ maxWidth: 640 }}>
          <Eyebrow color="var(--violet-c)" className="justify-center">The network</Eyebrow>
          <SectionTitle className="mb-4">One map for the entire Delhi Metro.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            A complete schematic of all 10 lines, colour-coded and zoomable, with interchange markers.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'start' }}>
          {/* Map */}
          <AnimatedSection>
            <div style={{ background: 'var(--surface1)', borderRadius: 24, border: '1px solid var(--hairline)', padding: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--money)', display: 'inline-block' }}/>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 500, letterSpacing: 0.8, color: 'var(--text-dim)', textTransform: 'uppercase' }}>LIVE NETWORK</span>
              </div>
              <NetworkSVG/>
            </div>
          </AnimatedSection>

          {/* Right column */}
          <AnimatedSection delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Lines legend */}
              <div style={{ background: 'var(--surface1)', borderRadius: 20, border: '1px solid var(--hairline)', padding: 22 }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 14 }}>10 lines</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px' }}>
                  {LINES.map(l => (
                    <div key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 5, borderRadius: 3, background: LINE_COLORS[l.key], flexShrink: 0 }}/>
                      <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{l.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout cards */}
              {CALLOUTS.map(c => (
                <div key={c.title} style={{ background: 'var(--surface1)', borderRadius: 18, border: '1px solid var(--hairline)', padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--surface3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-dim)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{c.icon}</svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{c.title}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
