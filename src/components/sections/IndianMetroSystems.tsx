import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';
import { STATIONS } from '@/lib/metro';
import { INDIAN_METRO_SYSTEMS } from '@/data/indianMetroSystems';

export default function IndianMetroSystems() {
  const systems = INDIAN_METRO_SYSTEMS.slice(0, 9);

  return (
    <section style={{ background: 'var(--bg)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="text-center mx-auto mb-14" style={{ maxWidth: 640 }}>
          <Eyebrow color="var(--accent)" className="justify-center">India&apos;s metro revolution</Eyebrow>
          <SectionTitle className="mb-4">Every metro system in India.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            Delhi is fully supported in the app today. lyne. also tracks every other operational Indian metro system.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ border: '1px solid var(--hairline)', borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
          {systems.map((system, i) => {
            const href = system.isDelhi ? '/stations' : `/metro-systems/${system.slug}`;
            const stationCount = system.isDelhi ? STATIONS.length : system.totalStations;
            const isLeftCol = i % 2 === 0;
            const classes = [
              'border-[color:var(--hairline)]',
              i > 0 ? 'border-t' : '',
              i === 1 ? 'sm:border-t-0' : '',
              isLeftCol ? '' : 'sm:border-l',
            ].join(' ');
            return (
              <Link
                key={system.slug}
                href={href}
                style={{ display: 'block', padding: '16px 20px', textDecoration: 'none' }}
                className={classes}
              >
                <p style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{system.fullName}</p>
                <p className="font-mono" style={{ fontSize: 12, color: 'var(--text-mute)' }}>
                  {system.lines.length || '—'} {system.lines.length === 1 ? 'line' : 'lines'}{stationCount ? ` · ${stationCount} stations` : ''}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/metro-systems" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
            View all metro systems →
          </Link>
        </div>
      </div>
    </section>
  );
}
