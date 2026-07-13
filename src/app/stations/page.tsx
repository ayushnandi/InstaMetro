import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP, LINE_COLORS, LINES } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import { STATIONS, stationSlug } from '@/lib/metro';
import type { LineKey } from '@/types/metro';

export const metadata: Metadata = {
  title: 'All Delhi Metro Stations — Lines, Interchanges & Timings',
  description: 'Browse all 263 Delhi Metro stations across 10 lines. Find line info, interchange stations, opening dates, and platform directions for every station.',
  alternates: { canonical: `${SITE_URL}/stations` },
};

export default function StationsIndex() {
  const byLine = new Map<LineKey, typeof STATIONS>();
  for (const line of LINES) byLine.set(line.key, []);
  for (const station of STATIONS) {
    for (const lineId of station.lines) {
      const arr = byLine.get(lineId);
      if (arr) arr.push(station);
    }
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: STATIONS.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/stations/${stationSlug(s)}`,
      name: `${s.name_en} Metro Station`,
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
              Station directory
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              All 263 Delhi Metro stations.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Every station across all 10 lines, with line info, interchanges, and platform directions.
            </p>
          </div>

          {LINES.map(line => {
            const stations = (byLine.get(line.key) ?? []).slice().sort((a, b) => a.name_en.localeCompare(b.name_en));
            if (stations.length === 0) return null;
            return (
              <section key={line.key} style={{ marginBottom: 44 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: LINE_COLORS[line.key] }} />
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: -0.4 }}>
                    {line.name} <span style={{ fontWeight: 400, color: 'var(--text-mute)', fontSize: 14 }}>({stations.length} stations)</span>
                  </h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {stations.map(s => (
                    <Link
                      key={s.id}
                      href={`/stations/${stationSlug(s)}`}
                      style={{
                        fontSize: 13.5, color: 'var(--text-dim)', textDecoration: 'none',
                        padding: '8px 14px', borderRadius: 10, border: '1px solid var(--hairline)',
                        background: 'var(--surface1)',
                      }}
                    >
                      {s.name_en}
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

        </div>
      </main>
      <Footer />
    </div>
  );
}
