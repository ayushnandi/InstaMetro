import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { WRAP } from '@/lib/tokens';
import { getMetroNews } from '@/lib/news';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default async function LatestMetroNews() {
  const news = (await getMetroNews()).slice(0, 4);
  if (news.length === 0) return null;

  return (
    <section style={{ background: 'var(--bg2)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="text-center mx-auto mb-14" style={{ maxWidth: 640 }}>
          <Eyebrow color="var(--money)" className="justify-center">Latest</Eyebrow>
          <SectionTitle className="mb-4">Metro news.</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            Headlines from metro-rail publications, refreshed hourly.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, marginBottom: 24, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          {news.map(item => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', padding: 18, borderRadius: 14,
                background: 'var(--surface1)', border: '1px solid var(--hairline)', textDecoration: 'none',
              }}
            >
              <p className="font-mono" style={{ fontSize: 11, color: 'var(--text-mute)', marginBottom: 6 }}>{formatDate(item.pubDate)} · {item.sourceName}</p>
              <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{item.title}</p>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
            View all metro news →
          </Link>
        </div>
      </div>
    </section>
  );
}
