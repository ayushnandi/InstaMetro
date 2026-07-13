import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Contact & Support',
  description: 'Get help with lyne., report a bug, or send us a message.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

const FAQS = [
  {
    q: 'Google Maps is not showing inside the app.',
    a: 'The map screens (Live Journey, Map Picker, Station) require a custom dev build — they don\'t work in the standard Expo Go app because the Google Maps API key can\'t be injected into a pre-built APK. Build a custom client with npx expo run:android to unlock map features.',
  },
  {
    q: 'Expo Go shows a "SDK version not supported" error.',
    a: 'lyne. uses Expo SDK 56. The Play Store version of Expo Go only supports SDK 54. Sideload the SDK 56 APK from the expo-go-releases GitHub page, or use eas go to generate a compatible build.',
  },
  {
    q: 'A route or fare looks incorrect.',
    a: 'Route data is derived from publicly available DMRC information and may not reflect recent service changes or maintenance blocks. If you spot a specific error, please open a GitHub issue with the from/to stations and expected vs actual result so we can fix the underlying data.',
  },
  {
    q: 'My QR ticket was rejected at the metro gate.',
    a: 'lyne. QR tickets are in-app representations only — they are not valid DMRC fare tokens and cannot be used at physical gates. You must purchase an official DMRC token or Smart Card for travel.',
  },
  {
    q: 'How do I delete my account and data?',
    a: 'Go to Account → Settings → Delete account inside the app. This removes your Firestore profile, tickets, and auth entry. Alternatively, email us and we will process the deletion within 30 days.',
  },
];

export default function Contact() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>

          {/* Header */}
          <div style={{ maxWidth: 600, marginBottom: 72 }}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              Support
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.4, color: 'var(--text)', marginBottom: 18, lineHeight: 1.08 }}>
              Get in touch.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Found a bug, got a question, or want to suggest a feature? We&apos;re a small team — we read every message.
            </p>
          </div>

          {/* Contact cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 80 }}>

            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 20, padding: 28 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13, marginBottom: 20,
                background: 'var(--accent)1F', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: -0.3 }}>
                Email
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.55, marginBottom: 16 }}>
                For bugs, data errors, privacy requests, and general questions.
              </p>
              <a
                href="mailto:hi@lyne.app"
                className="font-mono"
                style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
              >
                hi@lyne.app →
              </a>
            </div>

            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 20, padding: 28 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13, marginBottom: 20,
                background: 'var(--text)0F', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--text)" fillOpacity="0.85">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.833.091-.646.35-1.086.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: -0.3 }}>
                GitHub Issues
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.55, marginBottom: 16 }}>
                Report bugs or request features publicly. Best for technical issues with repro steps.
              </p>
              <a
                href="https://github.com/ayushnandi/lyne"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono"
                style={{ fontSize: 13, color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 500 }}
              >
                github.com/ayushnandi/lyne →
              </a>
            </div>

            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 20, padding: 28 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13, marginBottom: 20,
                background: 'var(--money)1F', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--money)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: -0.3 }}>
                Response time
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.55, marginBottom: 16 }}>
                We aim to respond to emails within 2–3 business days. GitHub issues are reviewed weekly.
              </p>
              <span className="font-mono" style={{ fontSize: 13, color: 'var(--money)', fontWeight: 500 }}>
                2–3 business days
              </span>
            </div>

          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 720 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8, color: 'var(--text)', marginBottom: 32 }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 10, lineHeight: 1.4 }}>
                    {faq.q}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
