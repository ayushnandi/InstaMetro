import type { Metadata } from 'next';
import Link from 'next/link';
import GuideLayout from '@/components/guides/GuideLayout';
import { SITE_URL } from '@/lib/seo/config';

const TITLE = 'Smart Card vs QR Ticket: Which Should You Use?';
const DESCRIPTION = 'The real trade-offs between a DMRC smart card and a single-journey QR/token ticket.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/smart-card-vs-qr-ticket` },
};

const h2 = { fontSize: 22, fontWeight: 800, color: 'var(--text)', margin: '36px 0 16px', letterSpacing: -0.5 };
const p = { marginBottom: 16 };
const ul = { paddingLeft: 20, marginBottom: 16, display: 'flex', flexDirection: 'column' as const, gap: 8 };

export default function SmartCardVsQr() {
  return (
    <GuideLayout slug="smart-card-vs-qr-ticket" title={TITLE} description={DESCRIPTION}>
      <p style={p}>
        DMRC offers two main ways to pay for a ride: a rechargeable smart/travel card, and a single-journey paper QR ticket (or token, at some stations). Which one makes sense depends entirely on how often you ride.
      </p>

      <h2 style={h2}>Smart card</h2>
      <p style={p}>
        A reloadable card you tap at entry and exit. It&apos;s the better option if you ride more than occasionally:
      </p>
      <ul style={ul}>
        <li>Faster at the gate — no need to buy a fresh ticket each trip.</li>
        <li>DMRC has historically offered a fare discount to smart card users over token/QR fares — check current terms at the station or on DMRC&apos;s official channels, as promotional discounts change over time.</li>
        <li>Refundable deposit when the card is surrendered.</li>
        <li>Works across the network, including interchanges, without repurchasing.</li>
      </ul>

      <h2 style={h2}>QR ticket / token</h2>
      <p style={p}>
        A single-journey ticket bought fresh for one trip, valid for a limited window after purchase (typically around 60–90 minutes, enough for a direct or lightly-interchanged journey — DMRC enforces an exact validity window at the gate). Makes sense if:
      </p>
      <ul style={ul}>
        <li>You&apos;re visiting Delhi and won&apos;t ride enough to justify a card deposit.</li>
        <li>You&apos;re taking a single trip and don&apos;t want to carry a card afterward.</li>
      </ul>

      <h2 style={h2}>A note on lyne.&apos;s in-app ticket</h2>
      <p style={p}>
        The QR ticket shown inside the lyne. app is a trip record for your own planning — it is <strong>not</strong> a valid DMRC fare token and can&apos;t be scanned at a physical gate. You still need an official DMRC smart card or station-purchased ticket to actually travel. Use lyne. to plan the route and check the fare in advance (see the <Link href="/guides/fare-guide" style={{ color: 'var(--accent)' }}>fare guide</Link>), then buy your real ticket at the station.
      </p>
    </GuideLayout>
  );
}
