import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import { STATIONS } from '@/lib/metro';
import { INDIAN_METRO_SYSTEMS } from '@/data/indianMetroSystems';

export const metadata: Metadata = {
  title: 'Indian Metro Systems — Every City, Lines & Stations',
  description: 'An overview of every operational metro rail system in India — Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune and more — lines, stations, and official links.',
  alternates: { canonical: `${SITE_URL}/metro-systems` },
};

export default function MetroSystemsIndex() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: INDIAN_METRO_SYSTEMS.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: s.isDelhi ? `${SITE_URL}/stations` : `${SITE_URL}/metro-systems/${s.slug}`,
      name: s.fullName,
    })),
  };

  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={itemListJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>

          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              India&apos;s metro revolution
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              Every metro system in India.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              India built more metro rail in the last decade than most countries build in a century. lyne. tracks every operational system — lines, stations, and how to plan your ride. Full route planning and live fares are available today for Delhi; every other city below is an informational overview.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
            {INDIAN_METRO_SYSTEMS.map(system => {
              const href = system.isDelhi ? '/stations' : `/metro-systems/${system.slug}`;
              const stationCount = system.isDelhi ? STATIONS.length : system.totalStations;
              return (
                <Link
                  key={system.slug}
                  href={href}
                  style={{
                    display: 'block', padding: 22, borderRadius: 16,
                    background: 'var(--surface1)', border: '1px solid var(--hairline)', textDecoration: 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{system.fullName}</h2>
                    {system.isDelhi && (
                      <span className="font-mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--money)', border: '1px solid var(--money)', borderRadius: 999, padding: '3px 8px', whiteSpace: 'nowrap' }}>
                        FULL ROUTING
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-dim)', marginBottom: 12 }}>{system.city}</p>
                  <div className="font-mono" style={{ fontSize: 12.5, color: 'var(--text-mute)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <span>{system.lines.length || '—'} {system.lines.length === 1 ? 'line' : 'lines'}</span>
                    {stationCount && <span>{stationCount} stations</span>}
                    <span>Since {system.openedYear}</span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
