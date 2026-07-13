import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { WRAP } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'lyne. is a small, independently-built Delhi Metro app. Not actively hiring, but always open to hearing from great engineers and designers.',
};

const VALUES = [
  {
    title: 'Small and real',
    body: 'lyne. is built and run by one person today. No fake "join our team" pages, no funnel — just an honest note on where things stand.',
  },
  {
    title: 'Ship what actually helps riders',
    body: 'Every feature exists because it made someone’s commute easier — accurate fares, real platform directions, a live journey view that works offline-first.',
  },
  {
    title: 'Open to the right person',
    body: 'If you’re a strong React Native, Next.js, or transit-data engineer who’s genuinely excited about Delhi Metro or public transit products, reach out anyway.',
  },
];

export default function Careers() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>

          <div style={{ maxWidth: 640, marginBottom: 64 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              Careers
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              Not hiring right now &mdash; but we&apos;d still like to hear from you.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              lyne. is a small, independently-built Delhi Metro app. There&apos;s no open roles board today. If that changes, or if you&apos;re someone exceptional who wants to work on transit software in India, email us &mdash; we read everything.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 72 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: -0.3 }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 560, background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 12, letterSpacing: -0.5 }}>
              Get in touch
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 20 }}>
              Send a short note about what you&apos;d want to work on and a link to something you&apos;ve built.
            </p>
            <a
              href="mailto:hi@lyne.app?subject=Careers"
              className="font-mono"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 20px', borderRadius: 12,
                background: 'var(--text)', color: 'var(--bg)',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}
            >
              hi@lyne.app →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
