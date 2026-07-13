import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';

const GROUPS = [
  {
    label: 'Mobile',
    color: 'var(--accent)',
    items: [
      ['React Native', 'Cross-platform app'],
      ['TypeScript',   'End-to-end types'],
      ['Reanimated',   'Spring motion'],
    ],
  },
  {
    label: 'Backend',
    color: 'var(--money)',
    items: [
      ['Cloud Firestore', 'Tickets & profile'],
      ['Firebase Auth',   'Sign-in & sessions'],
      ['expo-sqlite',     'On-device station data'],
    ],
  },
  {
    label: 'Routing & data',
    color: 'var(--amber-c)',
    items: [
      ['Dijkstra routing', 'Network graph'],
      ['Google Maps SDK',  'Station map & overlay'],
      ['i18next',          'Hindi & English'],
    ],
  },
  {
    label: 'Distribution',
    color: 'var(--violet-c)',
    items: [
      ['Expo EAS',      'Build & publish'],
      ['AsyncStorage',  'Local persistence'],
      ['Expo Router',   'File-based navigation'],
    ],
  },
];

export default function TechStack() {
  return (
    <section id="stack" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="mb-12" style={{ maxWidth: 620 }}>
          <Eyebrow color="var(--amber-c)">Under the hood</Eyebrow>
          <SectionTitle className="mb-4">A stack built for real-time, at scale.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            Production-ready and store-shippable from day one, typed end to end, observable, and fed by live transit standards.
          </p>
        </AnimatedSection>

        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ border: '1px solid var(--hairline)', borderRadius: 20 }}
        >
          {GROUPS.map((g, gi) => {
            const classes = [
              'border-[color:var(--hairline)]',
              gi >= 2 ? 'border-t lg:border-t-0' : '',
              gi === 1 ? 'border-l' : '',
              gi === 3 ? 'border-l' : '',
              gi > 0 ? 'lg:border-l' : '',
            ].join(' ');
            return (
              <AnimatedSection key={g.label} delay={gi * 0.06} className={classes} style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: g.color, display: 'inline-block' }}/>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: 0.5, color: 'var(--text-dim)', textTransform: 'uppercase' }}>{g.label}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {g.items.map(([n, d]) => (
                    <div key={n}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{n}</p>
                      <p style={{ fontSize: 12.5, color: 'var(--text-mute)', marginTop: 1 }}>{d}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
