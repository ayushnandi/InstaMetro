import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';

const REVIEWS = [
  {
    q: 'The live map integration is incredible. I can see exactly where I am on the route and which station is next. Feels like having a metro co-pilot in my pocket.',
    name: 'Aiswarya Nanda', role: 'Associate Consultant', initials: 'AN', color: 'var(--accent)',
  },
  {
    q: 'Cleanest metro app I have used. Everything is where you expect it: no clutter, no ads, just the journey. The dark mode alone makes it worth it.',
    name: 'Om Borkar', role: 'MBBS Doctor', initials: 'OB', color: 'var(--money)',
  },
  {
    q: 'I recommend lyne. to every colleague who commutes. The quick chips make planning a 5-second job. The UI is sharp enough that it doesn\'t feel like a utility app at all.',
    name: 'Ansh Gupta', role: 'Senior Marketing', initials: 'AG', color: 'var(--violet-c)',
  },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="var(--amber-c)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" style={{ background: 'var(--bg)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="text-center mx-auto mb-12" style={{ maxWidth: 600 }}>
          <Eyebrow color="var(--money)" className="justify-center">Loved by early riders</Eyebrow>
          <SectionTitle className="mb-3">From APK users on Android.</SectionTitle>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
          {REVIEWS.map((r, i) => (
            <AnimatedSection key={r.name} delay={i * 0.08}>
              <div style={{ background: 'var(--surface1)', borderRadius: 20, border: '1px solid var(--hairline)', padding: 26, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Stars/>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--text)', letterSpacing: -0.2, margin: '0 0 22px', flex: 1 }}>
                  &ldquo;{r.q}&rdquo;
                </p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 99, background: r.color + '2A', color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>
                    {r.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)' }}>{r.name}</p>
                    <p style={{ fontSize: 12.5, color: 'var(--text-mute)' }}>{r.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
