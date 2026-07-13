import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP, LINE_COLORS, LINES } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import { STATIONS, STATION_EXTRA, getStationBySlug, stationSlug, getAdjacentStations, getRoutesForStation } from '@/lib/metro';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STATIONS.map(s => ({ slug: stationSlug(s) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const station = getStationBySlug(slug);
  if (!station) return {};

  const lineNames = station.lines.map(l => LINES.find(x => x.key === l)?.name ?? l).join(', ');
  const title = `${station.name_en} Metro Station — Lines, Timings & Fare`;
  const description = `${station.name_en} Metro Station on the ${lineNames}. Platform directions, interchange info, opening date, and nearby stations — plan your route with lyne.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/stations/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/stations/${slug}` },
  };
}

function formatOpened(dmy: string | null): string | null {
  if (!dmy) return null;
  const [d, m, y] = dmy.split('-');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export default async function StationPage({ params }: Props) {
  const { slug } = await params;
  const station = getStationBySlug(slug);
  if (!station) notFound();

  const extra = STATION_EXTRA[station.id];
  const adjacent = getAdjacentStations(station.id).sort((a, b) => a.travelMin - b.travelMin);
  const isInterchange = station.lines.length > 1;
  const opened = formatOpened(extra?.opened ?? null);
  const routesFromHere = getRoutesForStation(station.id).slice(0, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TrainStation',
    name: `${station.name_en} Metro Station`,
    address: { '@type': 'PostalAddress', addressLocality: 'Delhi', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: station.lat, longitude: station.lon },
    url: `${SITE_URL}/stations/${slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Stations', item: `${SITE_URL}/stations` },
      { '@type': 'ListItem', position: 2, name: station.name_en, item: `${SITE_URL}/stations/${slug}` },
    ],
  };

  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '64px 28px 100px' }}>

          <nav style={{ marginBottom: 28, fontSize: 13.5 }}>
            <Link href="/stations" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Stations</Link>
            <span style={{ color: 'var(--text-mute)', margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text)' }}>{station.name_en}</span>
          </nav>

          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {station.lines.map(lineId => {
                const line = LINES.find(l => l.key === lineId);
                return (
                  <span
                    key={lineId}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      fontSize: 12.5, fontWeight: 600, color: 'var(--text)',
                      padding: '6px 12px', borderRadius: 999, background: 'var(--surface1)',
                      border: '1px solid var(--hairline)',
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: 4, background: LINE_COLORS[lineId] }} />
                    {line?.name ?? lineId}
                  </span>
                );
              })}
              {isInterchange && (
                <span className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--money)', padding: '6px 12px' }}>
                  Interchange station
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.2, color: 'var(--text)', marginBottom: 12, lineHeight: 1.1 }}>
              {station.name_en} Metro Station
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              {station.name_hi} &middot; Station code {station.code}
              {opened && <> &middot; Opened {opened}</>}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48, maxWidth: 760 }}>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Layout</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{extra?.layout ?? '—'}</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Platform type</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{extra?.platformType ?? '—'}</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Lines served</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{station.lines.length}</p>
            </div>
          </div>

          {adjacent.length > 0 && (
            <div style={{ maxWidth: 760, marginBottom: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: -0.5 }}>
                Nearby stations
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {adjacent.map(({ station: n, travelMin, lineId }) => (
                  <Link
                    key={n.id + lineId}
                    href={`/stations/${stationSlug(n)}`}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px 20px', borderRadius: 14, background: 'var(--surface1)',
                      border: '1px solid var(--hairline)', textDecoration: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 4, background: LINE_COLORS[lineId as keyof typeof LINE_COLORS] }} />
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{n.name_en}</span>
                    </div>
                    <span className="font-mono" style={{ fontSize: 13, color: 'var(--text-mute)' }}>{travelMin} min</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {routesFromHere.length > 0 && (
            <div style={{ maxWidth: 760, marginBottom: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: -0.5 }}>
                Popular routes from {station.name_en}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                {routesFromHere.map(r => {
                  const other = r.from.id === station.id ? r.to : r.from;
                  return (
                    <Link
                      key={r.slug}
                      href={`/routes/${r.slug}`}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 18px', borderRadius: 14, background: 'var(--surface1)',
                        border: '1px solid var(--hairline)', textDecoration: 'none',
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>To {other.name_en}</span>
                      <span className="font-mono" style={{ fontSize: 12.5, color: 'var(--text-mute)' }}>₹{(r.route.farePaise / 100).toFixed(0)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ maxWidth: 560, background: 'var(--cta-gradient)', border: '1px solid var(--hairline)', borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 10, letterSpacing: -0.4 }}>
              Plan a route from {station.name_en}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 18 }}>
              Get live fare, interchange, and platform guidance in the lyne. app.
            </p>
            <a
              href="#download"
              className="font-mono"
              style={{
                display: 'inline-flex', padding: '12px 20px', borderRadius: 12,
                background: 'var(--text)', color: 'var(--bg)', fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}
            >
              Get the app →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
