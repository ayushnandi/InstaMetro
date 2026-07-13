import type { Metadata } from 'next';
import Link from 'next/link';
import GuideLayout from '@/components/guides/GuideLayout';
import { SITE_URL } from '@/lib/seo/config';

const TITLE = 'Delhi Metro First & Last Train Timings';
const DESCRIPTION = 'How Delhi Metro operating hours work, and where to check exact timings for your station.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/metro-timings` },
};

const h2 = { fontSize: 22, fontWeight: 800, color: 'var(--text)', margin: '36px 0 16px', letterSpacing: -0.5 };
const p = { marginBottom: 16 };

export default function MetroTimings() {
  return (
    <GuideLayout slug="metro-timings" title={TITLE} description={DESCRIPTION}>
      <p style={p}>
        Delhi Metro generally runs from early morning until close to midnight, but the exact first and last train time at any given station depends on three things: which line it&apos;s on, whether the station is a terminus or a mid-route stop, and whether it&apos;s a weekday or Sunday/holiday (Sunday service typically starts later).
      </p>

      <h2 style={h2}>Why timings vary by station</h2>
      <p style={p}>
        A terminus station&apos;s &quot;first train&quot; is the actual first departure of the day. A mid-route station further down the line sees that same train a few minutes later — so its effective first-train time is later than the terminus, and its last-train time is earlier, since it needs to be reached before the final train of the night passes through. Interchange stations have separate first/last times for each line they serve.
      </p>

      <h2 style={h2}>Where to check exact timings</h2>
      <p style={p}>
        Because these vary by station and change with DMRC&apos;s operating schedule, the reliable sources are:
      </p>
      <ul style={{ paddingLeft: 20, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <li>DMRC&apos;s official website or station notice boards, for the authoritative schedule.</li>
        <li>The <Link href="/stations" style={{ color: 'var(--accent)' }}>station page</Link> for your specific stop on lyne., which shows line and interchange context to help you plan around service hours.</li>
        <li>Station staff, if you&apos;re already at the gate and need same-day confirmation.</li>
      </ul>

      <h2 style={h2}>Planning around service hours</h2>
      <p style={p}>
        If you&apos;re taking a late trip, plan backwards from your destination&apos;s last-train time rather than your origin&apos;s — especially on journeys with an interchange, since you need to catch the last connecting train on the second line, not just leave your starting station in time. Check a <Link href="/routes" style={{ color: 'var(--accent)' }}>popular route</Link> for typical journey duration so you can budget enough buffer before the network closes for the night.
      </p>
    </GuideLayout>
  );
}
