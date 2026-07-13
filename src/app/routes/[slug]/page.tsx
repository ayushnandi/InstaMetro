import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP, LINE_COLORS, LINES } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import { getCuratedRoutes, getCuratedRouteBySlug, getRoutesForStation, stationSlug } from '@/lib/metro';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCuratedRoutes().map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const curated = getCuratedRouteBySlug(slug);
  if (!curated) return {};

  const { from, to, route } = curated;
  const fare = (route.farePaise / 100).toFixed(0);
  const title = `${from.name_en} to ${to.name_en} Metro Route — Fare & Time`;
  const description = `${from.name_en} to ${to.name_en}: ${route.durationMin} min, ${route.changes} ${route.changes === 1 ? 'interchange' : 'interchanges'}, ₹${fare} fare. Step-by-step Delhi Metro directions.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/routes/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/routes/${slug}` },
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const curated = getCuratedRouteBySlug(slug);
  if (!curated) notFound();

  const { from, to, route } = curated;
  const fare = (route.farePaise / 100).toFixed(0);
  const lineSegments = route.segments.filter((s): s is Extract<typeof route.segments[number], { type: 'line' }> => s.type === 'line');

  const otherRoutes = [
    ...getRoutesForStation(from.id, slug),
    ...getRoutesForStation(to.id, slug),
  ].filter((r, i, arr) => arr.findIndex(x => x.slug === r.slug) === i).slice(0, 6);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Routes', item: `${SITE_URL}/routes` },
      { '@type': 'ListItem', position: 2, name: `${from.name_en} to ${to.name_en}`, item: `${SITE_URL}/routes/${slug}` },
    ],
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to travel from ${from.name_en} to ${to.name_en} by Delhi Metro`,
    totalTime: `PT${route.durationMin}M`,
    step: route.segments.map((seg, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: seg.type === 'walk'
        ? seg.description_en
        : `Take the ${LINES.find(l => l.key === seg.lineId)?.name ?? seg.lineId} from ${seg.fromStation.name_en} to ${seg.toStation.name_en} (${seg.stops} stops, ${seg.direction}).`,
    })),
  };

  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={howToJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '64px 28px 100px' }}>

          <nav style={{ marginBottom: 28, fontSize: 13.5 }}>
            <Link href="/routes" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Routes</Link>
            <span style={{ color: 'var(--text-mute)', margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text)' }}>{from.name_en} to {to.name_en}</span>
          </nav>

          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.1, color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 }}>
              {from.name_en} to {to.name_en}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              {route.durationMin} min journey with {route.changes} {route.changes === 1 ? 'interchange' : 'interchanges'} across {lineSegments.length} {lineSegments.length === 1 ? 'line' : 'lines'}. See how fares are calculated in the <Link href="/guides/fare-guide" style={{ color: 'var(--accent)' }}>fare guide</Link>.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 48, maxWidth: 760 }}>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Fare</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--money)' }}>₹{fare}</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Duration</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{route.durationMin} min</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Interchanges</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{route.changes}</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Stops</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{route.stops}</p>
            </div>
          </div>

          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: -0.5 }}>
              Step by step
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {route.segments.map((seg, i) => {
                if (seg.type === 'walk') {
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--text-mute)' }} />
                      <p style={{ fontSize: 14, color: 'var(--text-dim)' }}>{seg.description_en} ({seg.durationMin} min)</p>
                    </div>
                  );
                }
                const lineName = LINES.find(l => l.key === seg.lineId)?.name ?? seg.lineId;
                return (
                  <div key={i} style={{ padding: '18px 20px', borderRadius: 14, background: 'var(--surface1)', border: '1px solid var(--hairline)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 5, background: LINE_COLORS[seg.lineId] }} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{lineName}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                      <Link href={`/stations/${stationSlug(seg.fromStation)}`} style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'none' }}>
                        {seg.fromStation.name_en}
                      </Link>
                      {' → '}
                      <Link href={`/stations/${stationSlug(seg.toStation)}`} style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'none' }}>
                        {seg.toStation.name_en}
                      </Link>
                      {' '}&middot; {seg.stops} stops &middot; {seg.direction}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {otherRoutes.length > 0 && (
            <div style={{ maxWidth: 760, marginBottom: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: -0.5 }}>
                Other routes from {from.name_en} &amp; {to.name_en}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                {otherRoutes.map(r => (
                  <Link
                    key={r.slug}
                    href={`/routes/${r.slug}`}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 18px', borderRadius: 14, background: 'var(--surface1)',
                      border: '1px solid var(--hairline)', textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{r.from.name_en} → {r.to.name_en}</span>
                    <span className="font-mono" style={{ fontSize: 12.5, color: 'var(--text-mute)' }}>₹{(r.route.farePaise / 100).toFixed(0)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ maxWidth: 560, background: 'var(--cta-gradient)', border: '1px solid var(--hairline)', borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 10, letterSpacing: -0.4 }}>
              Get live directions in the app
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 18 }}>
              Track this journey live, get platform alerts, and book a digital ticket.
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
