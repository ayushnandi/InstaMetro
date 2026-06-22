import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import StoreBadge from '@/components/ui/StoreBadge';
import { WRAP } from '@/lib/tokens';

export default function CTA() {
  return (
    <section id="download" style={{ background: 'var(--bg)' }}>
      <div className={WRAP} style={{ padding: '96px 28px' }}>
        <AnimatedSection>
          <div style={{
            position: 'relative', overflow: 'hidden', textAlign: 'center',
            background: 'var(--cta-gradient)',
            borderRadius: 28, border: '1px solid var(--hairline2)',
            padding: 'clamp(40px, 6vw, 72px)',
          }}>
            {/* Decorative amber glow */}
            <div style={{
              position: 'absolute', top: -80, right: -60, width: 320, height: 320, borderRadius: '50%',
              background: 'var(--amber-c)', opacity: 0.08, filter: 'blur(80px)', pointerEvents: 'none',
            }}/>

            <SectionTitle
              className="mb-5 mx-auto"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', maxWidth: 560, position: 'relative' }}
            >
              Skip the queue tomorrow morning.
            </SectionTitle>

            <p style={{ fontSize: 18, color: 'var(--text-dim)', margin: '0 auto 32px', maxWidth: 460, lineHeight: 1.55, position: 'relative' }}>
              Free to plan. Book digital QR tickets directly in the app.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <StoreBadge kind="play"/>
              <StoreBadge kind="apple"/>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
