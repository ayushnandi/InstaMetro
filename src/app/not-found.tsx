import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { WRAP } from '@/lib/tokens';

export default function NotFound() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <main>
        <div className={WRAP} style={{ padding: '120px 28px 140px', textAlign: 'center' }}>
          <p className="font-mono" style={{ fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>
            404
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, color: 'var(--text)', marginBottom: 16 }}>
            That page doesn&apos;t exist.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', marginBottom: 36, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
            Looking for a specific station or route? Try the directories below.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/stations" style={{ padding: '12px 22px', borderRadius: 12, background: 'var(--text)', color: 'var(--bg)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Browse stations
            </Link>
            <Link href="/routes" style={{ padding: '12px 22px', borderRadius: 12, background: 'var(--surface1)', border: '1px solid var(--hairline)', color: 'var(--text)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Browse routes
            </Link>
            <Link href="/" style={{ padding: '12px 22px', borderRadius: 12, background: 'var(--surface1)', border: '1px solid var(--hairline)', color: 'var(--text)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
