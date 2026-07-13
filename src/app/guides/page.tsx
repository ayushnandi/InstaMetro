import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Delhi Metro Guides',
  description: 'Practical guides to riding the Delhi Metro — fares, ticket types, and how the network fits together.',
  alternates: { canonical: `${SITE_URL}/guides` },
};

const GUIDES = [
  {
    slug: 'fare-guide',
    title: 'Delhi Metro Fare Guide',
    description: 'How DMRC fares work, the distance slabs, and how to estimate your fare before you travel.',
  },
  {
    slug: 'smart-card-vs-qr-ticket',
    title: 'Smart Card vs QR Ticket: Which Should You Use?',
    description: 'The real trade-offs between a DMRC smart card and a single-journey QR/token ticket.',
  },
  {
    slug: 'metro-timings',
    title: 'Delhi Metro First & Last Train Timings',
    description: 'How Delhi Metro operating hours work, and where to check exact timings for your station.',
  },
];

export default function GuidesIndex() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>

          <div style={{ maxWidth: 640, marginBottom: 56 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              Guides
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              Everything you need to ride smart.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Practical guides to fares, tickets, and getting around the Delhi Metro network.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {GUIDES.map(g => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                style={{
                  display: 'block', padding: '24px', borderRadius: 18,
                  background: 'var(--surface1)', border: '1px solid var(--hairline)', textDecoration: 'none',
                }}
              >
                <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: -0.3 }}>
                  {g.title}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.55 }}>
                  {g.description}
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
