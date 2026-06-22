import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { WRAP } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'Terms of Use — lyne.',
  description: 'Terms and conditions for using the lyne. Delhi Metro app.',
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

export default function TermsOfUse() {
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
                Terms of Use
              </h1>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                These terms govern your use of lyne., a Delhi Metro navigation app. By using lyne. you agree to these terms.
              </p>
              <p className="font-mono" style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 12 }}>
                Effective: June 2026 · Last updated: June 2026
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--hairline)', marginBottom: 48 }} />

            <Section title="1. About lyne.">
              <p>
                lyne. is an independent, unofficial Delhi Metro navigation application developed by Ayush Nandi. It is not affiliated with, endorsed by, or connected to the Delhi Metro Rail Corporation (DMRC), the Government of India, or any related public body. For official DMRC services, visit{' '}
                <a href="https://www.delhimetrorail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  delhimetrorail.com
                </a>.
              </p>
            </Section>

            <Section title="2. Eligibility">
              <p>
                You must be at least 13 years old to use lyne. By using the app you confirm that you meet this requirement. If you are under 18, you should review these terms with a parent or guardian.
              </p>
            </Section>

            <Section title="3. QR tickets">
              <ul style={{ paddingLeft: 20, listStyleType: 'disc' }}>
                <Li>QR tickets generated in lyne. are <strong style={{ color: 'var(--text)' }}>in-app representations only</strong>. They are not official DMRC fare tokens and cannot be used at physical metro gates.</Li>
                <Li>You are responsible for purchasing valid fare media from DMRC before travelling on the Delhi Metro.</Li>
                <Li>lyne. bears no liability for denied entry, penalty fare, or any other consequence arising from reliance on in-app tickets as travel documents.</Li>
              </ul>
            </Section>

            <Section title="4. Route and fare information">
              <ul style={{ paddingLeft: 20, listStyleType: 'disc' }}>
                <Li>Route data, platform directions, travel times, and fares in lyne. are provided for informational purposes and are derived from publicly available DMRC data.</Li>
                <Li>This information may be out of date due to route changes, maintenance blocks, or fare revisions. Always verify critical journey details through official DMRC channels.</Li>
                <Li>lyne. makes no warranty, express or implied, regarding the accuracy, completeness, or timeliness of any information in the app.</Li>
              </ul>
            </Section>

            <Section title="5. Virtual wallet">
              <p>
                The wallet balance displayed in lyne. is <strong style={{ color: 'var(--text)' }}>virtual and for demonstration purposes only</strong>. It does not represent real money, is not redeemable for cash or credit, and has no monetary value whatsoever. No real financial transactions occur within the app.
              </p>
            </Section>

            <Section title="6. Account and data">
              <ul style={{ paddingLeft: 20, listStyleType: 'disc' }}>
                <Li>You are responsible for maintaining the security of your account credentials.</Li>
                <Li>You must not use lyne. for any unlawful purpose or in a way that violates these terms.</Li>
                <Li>We reserve the right to suspend or terminate accounts that violate these terms.</Li>
              </ul>
            </Section>

            <Section title="7. Intellectual property">
              <p style={{ marginBottom: 12 }}>
                The lyne. name, logo, design system, and all original content in this app are the property of Ayush Nandi and are protected by applicable intellectual property laws.
              </p>
              <p>
                Station names, line designations, and network data are factual public information. Metro line colours used in lyne. are adapted from DMRC&apos;s publicly published branding.
              </p>
            </Section>

            <Section title="8. Limitation of liability">
              <p>
                To the maximum extent permitted by applicable law, lyne. and its developer shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the app — including but not limited to missed journeys, incorrect fares paid, or reliance on route information.
              </p>
            </Section>

            <Section title="9. Governing law">
              <p>
                These terms are governed by the laws of India. Any dispute arising from these terms or your use of lyne. shall be subject to the exclusive jurisdiction of courts in New Delhi, India.
              </p>
            </Section>

            <Section title="10. Changes to these terms">
              <p>
                We may revise these terms as the app evolves. Material changes will be reflected by an updated effective date. Continued use after changes constitutes acceptance.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Questions about these terms? Email{' '}
                <a href="mailto:hi@lyne.app" style={{ color: 'var(--accent)' }}>
                  hi@lyne.app
                </a>.
              </p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
