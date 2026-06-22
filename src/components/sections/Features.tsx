import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';

const FEATURES = [
  {
    title: 'Route planning',
    desc: 'Up to 3 options: fastest, cheapest, or fewest interchanges. Step-by-step interchange guidance with platform directions.',
    color: 'var(--accent)',
    icon: <><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" fill="none"/><path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></>,
  },
  {
    title: 'Digital QR tickets',
    desc: 'Book a journey and get a scannable QR ticket, stored offline in the app. Coming up on Play Store & App Store.',
    color: 'var(--money)',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.75"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.75"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.75"/><rect x="14" y="14" width="3" height="3" rx="0.5" fill="currentColor"/><rect x="18" y="14" width="3" height="3" rx="0.5" fill="currentColor"/><rect x="14" y="18" width="3" height="3" rx="0.5" fill="currentColor"/></>,
  },
  {
    title: 'Live journey',
    desc: 'Follow your active trip on an animated route map. Current stop highlighted, upcoming stops and ETA shown.',
    color: 'var(--amber-c)',
    icon: <><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" fill="none"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.75"/><polyline points="12 9 12 12 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></>,
  },
  {
    title: 'Fare calculator',
    desc: 'Official DMRC slab fares calculated before you board. ₹10 to ₹60 based on distance, no surprises at the counter.',
    color: 'var(--violet-c)',
    icon: <><path d="M3 5h18M3 9h18M7 13h5M7 17h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.75" fill="none"/></>,
  },
  {
    title: 'Nearby stations',
    desc: 'Opens to your closest metro station using on-device GPS. Location never transmitted or stored remotely.',
    color: '#E867A7',
    icon: <><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" fill="none"/><path d="M12 6c-2.2 0-4 1.8-4 4 0 3 4 7.5 4 7.5s4-4.5 4-7.5c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.75" fill="none"/><circle cx="12" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5"/></>,
  },
  {
    title: 'Quick chips',
    desc: 'Save frequent routes as one-tap shortcuts on the home screen. One tap plans the full journey.',
    color: '#29A776',
    icon: <><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" fill="none"/><path d="M13 6l-5 7h5l-1 5 6-7h-5l1-5z" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  },
];

export default function Features() {
  return (
    <section id="features" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div className={WRAP} style={{ padding: '90px 28px' }}>
        <AnimatedSection className="mb-12 max-w-[600px]">
          <Eyebrow color="var(--money)">Functionalities</Eyebrow>
          <SectionTitle>Everything a rider needs, and nothing they don&apos;t.</SectionTitle>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.05}>
              <div style={{ background: 'var(--surface1)', borderRadius: 20, padding: 26, border: '1px solid var(--hairline)', height: '100%' }}>
                {/* Icon */}
                <div style={{ width: 48, height: 48, borderRadius: 14, background: f.color + '1F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: f.color }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{f.icon}</svg>
                </div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 19, fontWeight: 600, letterSpacing: -0.4, color: 'var(--text)', margin: '0 0 9px' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-dim)' }}>{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
