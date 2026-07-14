'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import DeviceFrame from '@/components/ui/DeviceFrame';
import PhoneShell from '@/components/phone/PhoneShell';
import ScreenTicket from '@/components/phone/ScreenTicket';
import { WRAP } from '@/lib/tokens';

const HERO_FEATURES = [
  {
    title: 'Route planning',
    desc: 'Up to 3 options: fastest, cheapest, or fewest interchanges. Step-by-step interchange guidance with platform directions, so you know which side of the platform to stand on.',
    color: 'var(--accent)',
    shot: '/screens/plan-light.png',
  },
  {
    title: 'Live journey tracking',
    desc: 'Follow your active trip on an animated route map snapped to real track geometry. Current stop highlighted, upcoming stops and ETA shown the whole way.',
    color: 'var(--amber-c)',
    shot: '/screens/route-wide-light.png',
  },
  {
    title: 'Hindi & English',
    desc: 'Switch the whole app to Hindi in one tap, not just a few labels — station names, quick chips, and every screen translate with you.',
    color: 'var(--violet-c)',
    shot: '/screens/home-hindi-light.png',
  },
  {
    title: 'Built around your account',
    desc: 'Trip stats, saved tickets, and theme or language preferences, all in one place. Sign in with email or stay anonymous — your call.',
    color: '#2BC3D6',
    shot: '/screens/account-light.png',
  },
];

const MINOR_FEATURES = [
  {
    title: 'Fare calculator',
    desc: 'Official DMRC slab fares, ₹10 to ₹60 based on distance, no surprises at the counter.',
    color: 'var(--violet-c)',
    icon: <><path d="M3 5h18M3 9h18M7 13h5M7 17h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.75" fill="none"/></>,
  },
  {
    title: 'Nearby stations',
    desc: 'Opens to your closest metro station using on-device GPS. Location never leaves your phone.',
    color: '#E867A7',
    icon: <><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" fill="none"/><path d="M12 6c-2.2 0-4 1.8-4 4 0 3 4 7.5 4 7.5s4-4.5 4-7.5c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.75" fill="none"/><circle cx="12" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5"/></>,
  },
  {
    title: 'Quick chips',
    desc: 'Save frequent routes as one-tap shortcuts on the home screen.',
    color: '#29A776',
    icon: <><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" fill="none"/><path d="M13 6l-5 7h5l-1 5 6-7h-5l1-5z" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  },
];

export default function Features() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? ((resolvedTheme as 'light' | 'dark') ?? 'light') : 'light';

  return (
    <section id="features" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="mb-16 max-w-[600px]">
          <Eyebrow color="var(--money)">Functionalities</Eyebrow>
          <SectionTitle>Everything a rider needs, and nothing they don&apos;t.</SectionTitle>
        </AnimatedSection>

        {/* Hero feature rows, alternating */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
          {HERO_FEATURES.map((f, i) => {
            const shotFirst = i % 2 === 0;
            const shot = (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DeviceFrame src={f.shot} alt={`lyne. app — ${f.title}`} width={250} tilt={shotFirst ? -3 : 3}/>
              </div>
            );
            const copy = (
              <div>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: f.color + '1F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: f.color, fontFamily: 'DM Mono, monospace', fontWeight: 600, fontSize: 15 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 27, fontWeight: 600, letterSpacing: -0.7, color: 'var(--text)', margin: '0 0 12px' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: 420 }}>{f.desc}</p>
              </div>
            );
            return (
              <AnimatedSection key={f.title} delay={i * 0.08}>
                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 40, alignItems: 'center' }}>
                  <div className={shotFirst ? 'lg:order-2' : ''}>{copy}</div>
                  <div className={shotFirst ? 'lg:order-1' : ''}>{shot}</div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* Digital QR tickets — illustrated mockup, no real screenshot available */}
          <AnimatedSection delay={0.32}>
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 40, alignItems: 'center' }}>
              <div className="lg:order-2">
                <div style={{ width: 44, height: 44, borderRadius: 13, background: 'var(--money)' + '1F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: 'var(--money)', fontFamily: 'DM Mono, monospace', fontWeight: 600, fontSize: 15 }}>
                  05
                </div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 27, fontWeight: 600, letterSpacing: -0.7, color: 'var(--text)', margin: '0 0 12px' }}>
                  Digital QR tickets
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: 420 }}>
                  Book a journey and get a scannable QR ticket, stored offline in the app. Show it at the gate, no counter queue.
                </p>
              </div>
              <div className="lg:order-1" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ transform: 'rotate(-3deg)' }}>
                  <PhoneShell theme={theme} width={210}>
                    <ScreenTicket/>
                  </PhoneShell>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Minor features — compact strip */}
        <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--hairline)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '28px 24px' }}>
            {MINOR_FEATURES.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: f.color + '1F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: f.color }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{f.icon}</svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: '0 0 4px' }}>{f.title}</p>
                    <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-dim)' }}>{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
