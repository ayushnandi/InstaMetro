import type { Metadata } from 'next';
import Link from 'next/link';
import GuideLayout from '@/components/guides/GuideLayout';
import { SITE_URL } from '@/lib/seo/config';

const TITLE = 'Delhi Metro Fare Guide';
const DESCRIPTION = 'How DMRC fares work, the distance slabs, and how to estimate your fare before you travel.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/fare-guide` },
};

const h2 = { fontSize: 22, fontWeight: 800, color: 'var(--text)', margin: '36px 0 16px', letterSpacing: -0.5 };
const p = { marginBottom: 16 };
const table = { width: '100%', borderCollapse: 'collapse' as const, marginBottom: 16 };
const th = { textAlign: 'left' as const, fontSize: 12.5, textTransform: 'uppercase' as const, letterSpacing: 0.5, color: 'var(--text-mute)', padding: '10px 12px', borderBottom: '1px solid var(--hairline)' };
const td = { padding: '10px 12px', borderBottom: '1px solid var(--hairline)', fontSize: 14.5, color: 'var(--text)' };

export default function FareGuide() {
  return (
    <GuideLayout slug="fare-guide" title={TITLE} description={DESCRIPTION}>
      <p style={p}>
        Delhi Metro fares are set by distance travelled, not by how many lines or interchanges your journey involves. The fewer kilometres between your origin and destination station, the less you pay — a journey with one interchange can cost the same as a direct one, as long as the total distance falls in the same slab.
      </p>

      <h2 style={h2}>The fare slabs</h2>
      <p style={p}>
        DMRC uses six distance-based slabs. These are the standard token/QR-ticket fares:
      </p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Distance</th>
            <th style={th}>Fare</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>Up to 2 km</td><td style={td}>₹10</td></tr>
          <tr><td style={td}>2–5 km</td><td style={td}>₹20</td></tr>
          <tr><td style={td}>5–12 km</td><td style={td}>₹30</td></tr>
          <tr><td style={td}>12–21 km</td><td style={td}>₹40</td></tr>
          <tr><td style={td}>21–32 km</td><td style={td}>₹50</td></tr>
          <tr><td style={td}>Above 32 km</td><td style={td}>₹60</td></tr>
        </tbody>
      </table>
      <p style={p}>
        Fares are occasionally revised by DMRC — treat these as the standard reference slabs rather than a live price feed. lyne. computes an estimated fare for any route using this same slab structure, shown on every <Link href="/routes" style={{ color: 'var(--accent)' }}>route page</Link>.
      </p>

      <h2 style={h2}>Why interchanges don&apos;t add cost</h2>
      <p style={p}>
        Because Delhi Metro fares are distance-based rather than per-line, changing lines partway through your journey (say, from the Blue Line to the Yellow Line at Rajiv Chowk) doesn&apos;t reset or add to your fare — you&apos;re still charged for the total distance from your entry to exit gate. This is different from cities where each line segment is priced separately.
      </p>

      <h2 style={h2}>Estimating your fare</h2>
      <p style={p}>
        The fastest way to check a fare is to look up your journey on lyne. — every <Link href="/stations" style={{ color: 'var(--accent)' }}>station page</Link> links to popular routes from that station with the fare shown, or use the app to calculate any origin-destination pair directly.
      </p>
    </GuideLayout>
  );
}
