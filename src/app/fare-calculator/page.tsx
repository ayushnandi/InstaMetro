import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Delhi Metro Fare & Distance Calculator',
  description: 'Calculate the real fare, travel time, and interchange count between any two Delhi Metro stations — computed live from the official DMRC fare table.',
  alternates: { canonical: `${SITE_URL}/fare-calculator` },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Fare calculator', item: `${SITE_URL}/fare-calculator` },
  ],
};

export default function FareCalculatorPage() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={breadcrumbJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '64px 28px 100px' }}>

          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              Delhi Metro
            </p>
            <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.1, color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 }}>
              Fare &amp; distance calculator
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Pick any two Delhi Metro stations for real computed fare, duration, and interchange count — the same engine that powers every <Link href="/routes" style={{ color: 'var(--accent)' }}>route page</Link> on this site.
            </p>
          </div>

          <Calculator />

        </div>
      </main>
      <Footer />
    </div>
  );
}
