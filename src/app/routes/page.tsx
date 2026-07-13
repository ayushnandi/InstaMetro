import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import { getCuratedRoutes } from '@/lib/metro';

export const metadata: Metadata = {
  title: 'Popular Delhi Metro Routes — Fares & Journey Times',
  description: 'Fare, duration, and interchange details for the most-travelled Delhi Metro routes between major stations, interchanges, and landmarks.',
  alternates: { canonical: `${SITE_URL}/routes` },
};

export default function RoutesIndex() {
  const routes = getCuratedRoutes();

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: routes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/routes/${r.slug}`,
      name: `${r.from.name_en} to ${r.to.name_en}`,
    })),
  };

  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={itemListJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>

          <div style={{ maxWidth: 640, marginBottom: 56 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              Route directory
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              Popular Delhi Metro routes.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Fare, duration, and interchange info for {routes.length} of the most-travelled journeys across the network.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {routes.map(r => (
              <Link
                key={r.slug}
                href={`/routes/${r.slug}`}
                style={{
                  display: 'block', padding: '18px 20px', borderRadius: 16,
                  background: 'var(--surface1)', border: '1px solid var(--hairline)', textDecoration: 'none',
                }}
              >
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                  {r.from.name_en} <span style={{ color: 'var(--text-mute)', fontWeight: 400 }}>→</span> {r.to.name_en}
                </p>
                <p className="font-mono" style={{ fontSize: 12.5, color: 'var(--text-mute)' }}>
                  {r.route.durationMin} min &middot; {r.route.changes} {r.route.changes === 1 ? 'change' : 'changes'} &middot; ₹{(r.route.farePaise / 100).toFixed(0)}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
