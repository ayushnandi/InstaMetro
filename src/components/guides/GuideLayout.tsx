import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP } from '@/lib/tokens';
import { SITE_URL, SITE_NAME } from '@/lib/seo/config';

export default function GuideLayout({
  slug,
  title,
  description,
  children,
}: {
  slug: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/guides/${slug}`,
  };

  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={jsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '64px 28px 100px' }}>

          <nav style={{ marginBottom: 28, fontSize: 13.5 }}>
            <Link href="/guides" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Guides</Link>
            <span style={{ color: 'var(--text-mute)', margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text)' }}>{title}</span>
          </nav>

          <article style={{ maxWidth: 720 }}>
            <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.1, color: 'var(--text)', marginBottom: 16, lineHeight: 1.15 }}>
              {title}
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 40 }}>
              {description}
            </p>
            <div className="guide-body" style={{ fontSize: 15.5, color: 'var(--text-dim)', lineHeight: 1.75 }}>
              {children}
            </div>
          </article>

        </div>
      </main>
      <Footer />
    </div>
  );
}
