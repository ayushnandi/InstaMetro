import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { WRAP } from '@/lib/tokens';
import { SITE_URL } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How lyne. collects, uses, and protects your data.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: -0.4, marginBottom: 16 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-dim)' }}>
        {children}
      </div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ paddingLeft: 8, marginBottom: 8 }}>
      {children}
    </li>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <main>
        <div className={WRAP} style={{ padding: '80px 28px 100px' }}>
          <div style={{ maxWidth: 720 }}>

            {/* Header */}
            <div style={{ marginBottom: 56 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
                Legal
              </p>
              <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.2, color: 'var(--text)', marginBottom: 16, lineHeight: 1.1 }}>
                Privacy Policy
              </h1>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                lyne. is a Delhi Metro navigation app. This policy explains what data we collect, how we use it, and the choices you have. We keep it short and honest.
              </p>
              <p className="font-mono" style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 12 }}>
                Effective: June 2026 · Last updated: June 2026
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--hairline)', marginBottom: 48 }} />

            <Section title="1. Data we collect">
              <p style={{ marginBottom: 12 }}>lyne. collects the minimum necessary to provide its features:</p>
              <ul style={{ paddingLeft: 20, listStyleType: 'disc' }}>
                <Li><strong style={{ color: 'var(--text)' }}>Account identifier</strong> — When you open the app for the first time, Firebase Auth creates an anonymous session. If you choose to sign up, we store your email address and a hashed password via Firebase Authentication.</Li>
                <Li><strong style={{ color: 'var(--text)' }}>Tickets and trips</strong> — Journey tickets you book (from/to station, fare, timestamp, status) are stored in Firestore under your user ID.</Li>
                <Li><strong style={{ color: 'var(--text)' }}>Preferences</strong> — Your display name, quick chips (saved routes), and recent trips are synced to Firestore so they persist across devices.</Li>
                <Li><strong style={{ color: 'var(--text)' }}>Device-local data</strong> — Wallet balance, theme preference, and accessibility settings are stored only on your device via AsyncStorage and are never transmitted.</Li>
                <Li><strong style={{ color: 'var(--text)' }}>Location</strong> — GPS coordinates are used on-device to show your nearest metro station. Location is <em>never</em> sent to our servers or stored anywhere.</Li>
              </ul>
            </Section>

            <Section title="2. What we do not collect">
              <ul style={{ paddingLeft: 20, listStyleType: 'disc' }}>
                <Li>We do not run ads and do not share data with advertisers.</Li>
                <Li>We do not sell or license your data to third parties.</Li>
                <Li>We do not use tracking pixels, fingerprinting, or behavioural analytics.</Li>
                <Li>We do not collect payment card numbers. The in-app wallet is virtual and holds no real monetary value.</Li>
                <Li>We do not read your contacts, messages, camera, or any other sensor beyond GPS (which you can deny).</Li>
              </ul>
            </Section>

            <Section title="3. Firebase and Google">
              <p style={{ marginBottom: 12 }}>
                lyne. uses <strong style={{ color: 'var(--text)' }}>Google Firebase</strong> for authentication and database services. Data stored in Firestore is hosted on Google Cloud infrastructure in the asia-south1 region (Mumbai). Google&apos;s handling of this data is governed by the{' '}
                <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  Firebase Privacy Policy
                </a>.
              </p>
              <p>
                We do not use Firebase Analytics, Firebase Crashlytics, Google Ads, or any other Firebase product beyond Auth and Firestore.
              </p>
            </Section>

            <Section title="4. Data retention">
              <p style={{ marginBottom: 12 }}>
                Your Firestore data (tickets, profile, preferences) is retained as long as your account exists. Anonymous accounts that have never been upgraded to email accounts may be deleted after 12 months of inactivity.
              </p>
              <p>
                You can request deletion of all your data by contacting us at the email below. We will process the request within 30 days.
              </p>
            </Section>

            <Section title="5. Your rights">
              <ul style={{ paddingLeft: 20, listStyleType: 'disc' }}>
                <Li><strong style={{ color: 'var(--text)' }}>Access</strong> — You can request a copy of the data we hold about you.</Li>
                <Li><strong style={{ color: 'var(--text)' }}>Correction</strong> — You can update your display name directly in the app under Account settings.</Li>
                <Li><strong style={{ color: 'var(--text)' }}>Deletion</strong> — You can delete your account and all associated data from Account settings, or by emailing us.</Li>
                <Li><strong style={{ color: 'var(--text)' }}>Portability</strong> — On request we will provide your ticket and trip history in JSON format.</Li>
              </ul>
            </Section>

            <Section title="6. Children">
              <p>
                lyne. is not directed at children under 13. We do not knowingly collect data from children under 13. If you believe a child has provided us with personal information, contact us and we will delete it promptly.
              </p>
            </Section>

            <Section title="7. Disclaimer">
              <p>
                lyne. is an independent, unofficial application. It is not affiliated with, endorsed by, or connected to the Delhi Metro Rail Corporation (DMRC) in any way. Official DMRC services are available at{' '}
                <a href="https://www.delhimetrorail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  delhimetrorail.com
                </a>.
              </p>
            </Section>

            <Section title="8. Changes to this policy">
              <p>
                We may update this policy as the app evolves. If we make material changes, we will update the effective date above. Continued use of lyne. after changes constitutes acceptance of the updated policy.
              </p>
            </Section>

            <Section title="9. Contact">
              <p>
                Questions about this policy? Email us at{' '}
                <a href="mailto:hi@lyne.app" style={{ color: 'var(--accent)' }}>
                  hi@lyne.app
                </a>{' '}
                or open an issue on our GitHub repository.
              </p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
