import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';
import { getMetroNews } from '@/lib/news';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Metro News — Latest Indian Metro Rail Updates',
  description: 'The latest news on Delhi Metro, Namma Metro, Mumbai Metro, and every other Indian metro system — new lines, extensions, fares, and openings, sourced from metro-rail publications.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function BlogIndex() {
  const news = await getMetroNews();

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: news.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: item.link,
      name: item.title,
    })),
  };

  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={itemListJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>

          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              Metro news
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              What&apos;s happening on India&apos;s metros.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Headlines from metro-rail publications, refreshed hourly. Every card links to the original article — we only show a short excerpt here.
            </p>
          </div>

          {news.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--text-mute)' }}>No recent stories available right now — check back soon.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 760 }}>
              {news.map(item => (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', padding: '22px 24px', borderRadius: 16,
                    background: 'var(--surface1)', border: '1px solid var(--hairline)',
                    textDecoration: 'none', marginBottom: 10,
                  }}
                >
                  <p className="font-mono" style={{ fontSize: 11.5, color: 'var(--text-mute)', marginBottom: 8 }}>
                    {formatDate(item.pubDate)}
                  </p>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.4 }}>
                    {item.title}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 10 }}>
                    {item.excerpt}
                  </p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                    Source: {item.sourceName} — read more →
                  </span>
                </a>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
