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
      <div className={`${WRAP} pt-[60px] lg:pt-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection style={{ maxWidth: 640 }}>
          <Eyebrow>What lyne. does</Eyebrow>
          <SectionTitle className="mb-5">Built for Delhi. Built to actually help.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)', marginBottom: 16 }}>
            lyne. is a clean, fast Delhi Metro app built for people who ride every day. No ads, no noise. Just the information you need to get from A to B.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            We pair accurate DMRC network data with a fast route planner and a live journey map, so you always know the fare, the platform, and the interchange before you tap in. The map view is a feature you will not find in most metro apps.
          </p>
        </AnimatedSection>
      </div>

      {/* Stat band */}
      <AnimatedSection delay={0.1}>
        <div className={`${WRAP} pb-[60px] lg:pb-[90px]`} style={{ paddingLeft: 28, paddingRight: 28, marginTop: 52 }}>
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={[
                  'border-[color:var(--hairline)]',
                  i % 2 === 1 ? 'border-l' : '',
                  i >= 2 ? 'border-t lg:border-t-0' : '',
                  i > 0 ? 'lg:border-l' : '',
                ].join(' ')}
                style={{ padding: '30px 8px' }}
              >
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500, color: 'var(--text)', letterSpacing: -2, lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--text-dim)', marginTop: 12 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
