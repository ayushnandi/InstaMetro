import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'FAQ — Delhi Metro App Questions',
  description: 'Answers to common questions about lyne.: is it free, does it work offline, how accurate are fares and routes, and which Delhi Metro lines are covered.',
  alternates: { canonical: `${SITE_URL}/faq` },
};

const FAQS = [
  {
    q: 'Is lyne. free to use?',
    a: 'Yes. lyne. is free with no ads and no paywalled features. Route planning, fare calculation, and the live journey map are all free.',
  },
  {
    q: 'Which Delhi Metro lines does lyne. cover?',
    a: 'All 10 lines — Red, Yellow, Blue, Green, Violet, Pink, Magenta, Aqua (Noida Metro), Airport Express, and Grey — across 263 unique stations.',
  },
  {
    q: 'Is lyne. an official DMRC app?',
    a: 'No. lyne. is an independent, unofficial app built on publicly available DMRC network data. It is not affiliated with, endorsed by, or operated by the Delhi Metro Rail Corporation.',
  },
  {
    q: 'How accurate are the fares and route times?',
    a: 'Fares follow the official DMRC slab table based on stops travelled. Route times and interchange counts are computed with a real shortest-path algorithm over the network graph, not estimated — though scheduled maintenance or service changes may occasionally cause DMRC’s live fares to differ slightly.',
  },
  {
    q: 'Can I use the QR ticket in lyne. at the metro gate?',
    a: 'No. The QR ticket in lyne. is an in-app trip record only, not a valid DMRC fare token. You still need an official DMRC token, card, or QR ticket purchased through DMRC channels to travel.',
  },
  {
    q: 'Does lyne. work offline?',
    a: 'Station data, route planning, and fare calculation work fully offline once the app has loaded once, since the full network is stored on-device. Live journey tracking needs a location signal but not necessarily an internet connection.',
  },
  {
    q: 'Is lyne. available in Hindi?',
    a: 'Yes. Every screen, station name, and line name is available in both Hindi and English.',
  },
  {
    q: 'Does lyne. show live train arrival times?',
    a: 'lyne. shows scheduled journey timing and a live map of your progress along your route based on your location, not real-time train positions from DMRC signalling systems.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Faq() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={faqJsonLd} />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>

          <div style={{ maxWidth: 600, marginBottom: 56 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              FAQ
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              Questions, answered.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              For app bugs or support requests, see the <a href="/contact" style={{ color: 'var(--accent)' }}>Contact page</a> instead.
            </p>
          </div>

          <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface1)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 16,
                  padding: '22px 24px',
                }}
              >
                <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 10, lineHeight: 1.4 }}>
                  {faq.q}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 760, marginTop: 48 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 14 }}>
              Related guides
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href="/guides/fare-guide" style={{ fontSize: 13.5, color: 'var(--accent)', textDecoration: 'none' }}>Fare guide →</Link>
              <Link href="/guides/smart-card-vs-qr-ticket" style={{ fontSize: 13.5, color: 'var(--accent)', textDecoration: 'none' }}>Smart card vs QR ticket →</Link>
              <Link href="/guides/metro-timings" style={{ fontSize: 13.5, color: 'var(--accent)', textDecoration: 'none' }}>First & last train timings →</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
