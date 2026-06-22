import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';

const STATS = [
  { value: '303', label: 'Stations covered' },
  { value: '10',  label: 'Metro lines' },
  { value: '3',   label: 'Route options' },
  { value: '5s',  label: 'To book a ticket' },
];

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg)' }}>
      <div className={WRAP} style={{ padding: '90px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* Left: text */}
          <AnimatedSection>
            <Eyebrow>What lyne. does</Eyebrow>
            <SectionTitle className="mb-5">Built for Delhi. Built to actually help.</SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)', marginBottom: 16 }}>
              lyne. is a clean, fast Delhi Metro app built for people who ride every day. No ads, no noise. Just the information you need to get from A to B.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
              We pair accurate DMRC network data with a fast route planner and a live journey map, so you always know the fare, the platform, and the interchange before you tap in. The map view is a feature you will not find in most metro apps.
            </p>
          </AnimatedSection>

          {/* Right: stats */}
          <AnimatedSection delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ background: 'var(--surface1)', borderRadius: 18, padding: 24, border: '1px solid var(--hairline)' }}>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 38, fontWeight: 500, color: 'var(--accent)', letterSpacing: -1.5, lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 13.5, color: 'var(--text-dim)', marginTop: 10 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
