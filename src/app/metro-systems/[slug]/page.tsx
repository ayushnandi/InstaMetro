import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import { INDIAN_METRO_SYSTEMS } from '@/data/indianMetroSystems';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDIAN_METRO_SYSTEMS.filter(s => !s.isDelhi).map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = INDIAN_METRO_SYSTEMS.find(s => s.slug === slug && !s.isDelhi);
  if (!system) return {};

  const title = `${system.fullName} — Lines, Stations & Route Map`;
  const description = `${system.fullName} overview: ${system.lines.length} ${system.lines.length === 1 ? 'line' : 'lines'}${system.totalStations ? `, ${system.totalStations} stations` : ''}, operating since ${system.openedYear}. Run by ${system.operator}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/metro-systems/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/metro-systems/${slug}` },
  };
}

export default async function MetroSystemPage({ params }: Props) {
  const { slug } = await params;
  if (slug === 'delhi') redirect('/stations');

  const system = INDIAN_METRO_SYSTEMS.find(s => s.slug === slug && !s.isDelhi);
  if (!system) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Metro systems', item: `${SITE_URL}/metro-systems` },
      { '@type': 'ListItem', position: 2, name: system.fullName, item: `${SITE_URL}/metro-systems/${slug}` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${system.fullName} — Lines, Stations & Overview`,
    description: `An overview of the ${system.fullName}, operated by ${system.operator}, serving ${system.city}.`,
    datePublished: system.verifiedAt,
    dateModified: system.verifiedAt,
  };

  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '64px 28px 100px' }}>

          <nav style={{ marginBottom: 28, fontSize: 13.5 }}>
            <Link href="/metro-systems" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Metro systems</Link>
            <span style={{ color: 'var(--text-mute)', margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text)' }}>{system.fullName}</span>
          </nav>

          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.1, color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 }}>
              {system.fullName}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Serving {system.city} since {system.openedYear}, operated by {system.operator}.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 40, maxWidth: 760 }}>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Lines</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{system.lines.length}</p>
            </div>
            {system.totalStations && (
              <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
                <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Stations</p>
                <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{system.totalStations}</p>
              </div>
            )}
            {system.totalLengthKm && (
              <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
                <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Network length</p>
                <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{system.totalLengthKm} km</p>
              </div>
            )}
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Opened</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{system.openedYear}</p>
            </div>
          </div>

          {system.lines.length > 0 && (
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 16, letterSpacing: -0.5 }}>Lines</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {system.lines.map(line => (
                  <div key={line.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: 'var(--surface1)', border: '1px solid var(--hairline)' }}>
                    {line.color && <span style={{ width: 10, height: 10, borderRadius: 5, background: line.color, flexShrink: 0 }} />}
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{line.name}</span>
                    {line.lengthKm && <span className="font-mono" style={{ fontSize: 12.5, color: 'var(--text-mute)', marginLeft: 'auto' }}>{line.lengthKm} km</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {system.notes && (
            <div style={{ maxWidth: 640, marginBottom: 32, padding: '16px 18px', borderRadius: 14, background: 'var(--surface1)', border: '1px solid var(--hairline)' }}>
              <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.6 }}>{system.notes}</p>
            </div>
          )}

          <div style={{ maxWidth: 640, marginBottom: 32, padding: '16px 18px', borderRadius: 14, background: 'var(--bg2)', border: '1px solid var(--hairline)' }}>
            <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              This page is an informational overview — lyne. currently supports full route planning, live fares, and journey tracking only for the Delhi Metro. A fare/distance calculator for{' '}
              {system.city}{' '}
              isn&apos;t available yet since no verified station-level network data exists for it here.{' '}
              Try the <Link href="/fare-calculator" style={{ color: 'var(--accent)' }}>Delhi fare calculator</Link>, or check {system.fullName}&apos;s{' '}
              <a href={system.officialUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>official site</a> for current fares and timings.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
