import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';
import { STATIONS, stationSlug, getCuratedRoutes, CURATED_SEED_STATION_IDS } from '@/lib/metro';

export default function PopularLinks() {
  const stationById = new Map(STATIONS.map(s => [s.id, s]));
  const popularStations = CURATED_SEED_STATION_IDS
    .map(id => stationById.get(id))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .slice(0, 16);

  const popularRoutes = getCuratedRoutes().slice(0, 10);

  return (
    <section style={{ background: 'var(--bg2)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="text-center mx-auto mb-14" style={{ maxWidth: 640 }}>
          <Eyebrow color="var(--money)" className="justify-center">Explore the network</Eyebrow>
          <SectionTitle className="mb-4">Popular stations &amp; routes.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            Fares, timings, and interchange info for every station and dozens of common journeys.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 32 }}>
          <AnimatedSection>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 16 }}>
              Popular stations
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {popularStations.map(s => (
                <Link
                  key={s.id}
                  href={`/stations/${stationSlug(s)}`}
                  style={{
                    fontSize: 13.5, color: 'var(--text-dim)', textDecoration: 'none',
                    padding: '8px 14px', borderRadius: 10, border: '1px solid var(--hairline)',
                    background: 'var(--surface1)',
                  }}
                >
                  {s.name_en}
                </Link>
              ))}
            </div>
            <Link href="/stations" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
              View all stations →
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 16 }}>
              Popular routes
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {popularRoutes.map(r => (
                <Link
                  key={r.slug}
                  href={`/routes/${r.slug}`}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: 13.5, color: 'var(--text-dim)', textDecoration: 'none',
                    padding: '10px 14px', borderRadius: 10, border: '1px solid var(--hairline)',
                    background: 'var(--surface1)',
                  }}
                >
                  <span>{r.from.name_en} → {r.to.name_en}</span>
                  <span className="font-mono" style={{ color: 'var(--text-mute)', fontSize: 12 }}>₹{(r.route.farePaise / 100).toFixed(0)}</span>
                </Link>
              ))}
            </div>
            <Link href="/routes" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
              View all routes →
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
