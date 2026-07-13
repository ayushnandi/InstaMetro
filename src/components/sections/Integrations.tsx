'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';

interface Party {
  name: string;
  desc: string;
  badge: string;
  logo: string | ((theme: string) => string);
}

const PARTIES: Party[] = [
  { name: 'Firebase Auth',   desc: 'Anonymous + email sign-in',      badge: 'Auth',  logo: '/logos/firebase-100.png' },
  { name: 'Cloud Firestore', desc: 'Tickets, profile & quick chips',  badge: 'Data',  logo: '/logos/cloud-firestore-.png' },
  { name: 'Google Maps SDK', desc: 'Station map & route overlay',     badge: 'Maps',  logo: '/logos/google-maps-100.png' },
  { name: 'expo-sqlite',     desc: 'On-device station database',      badge: 'Data',  logo: (t) => t === 'light' ? '/logos/light-expo.svg' : '/logos/expo.png' },
  { name: 'Expo EAS',        desc: 'Build & distribution',            badge: 'Build', logo: (t) => t === 'light' ? '/logos/light-expo.svg' : '/logos/expo.png' },
  { name: 'i18next',         desc: 'Hindi & English support',         badge: 'i18n',  logo: '/logos/i18next.png' },
  { name: 'Zustand',         desc: 'App state management',            badge: 'State', logo: '/logos/zustand.svg' },
  { name: 'Expo Router',     desc: 'File-based navigation',           badge: 'Nav',   logo: (t) => t === 'light' ? '/logos/light-expo.svg' : '/logos/expo.png' },
];

function LogoTile({ party, theme }: { party: Party; theme: string }) {
  const src = typeof party.logo === 'function' ? party.logo(theme) : party.logo;
  return (
    <div
      title={party.name}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        padding: '18px 10px', flex: '1 1 140px', minWidth: 120,
      }}
    >
      <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'grayscale(1)', opacity: 0.75 }}>
        <Image src={src} alt={party.name} width={28} height={28} style={{ objectFit: 'contain' }} unoptimized/>
      </div>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', textAlign: 'center' }}>{party.name}</p>
    </div>
  );
}

export default function Integrations() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? (resolvedTheme ?? 'light') : 'light';

  return (
    <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="mb-12" style={{ maxWidth: 600 }}>
          <Eyebrow color="var(--color-line-aqua)">Powered by</Eyebrow>
          <SectionTitle className="mb-4">Trusted third parties do the heavy lifting.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            We integrate best-in-class services so payments, maps, identity and alerts are secure and reliable.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div
            className="flex flex-wrap"
            style={{ border: '1px solid var(--hairline)', borderRadius: 20, justifyContent: 'center' }}
          >
            {PARTIES.map(p => (
              <LogoTile key={p.name} party={p} theme={theme}/>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
