import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import DeviceFrame from '@/components/ui/DeviceFrame';
import { WRAP } from '@/lib/tokens';

const BENEFITS = [
  'Fare shown upfront, before you tap in',
  'Platform number and interchange guidance at every change',
  'One tap to book a QR ticket, no queue',
];

export default function ProblemSolution() {
  return (
    <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div className={`${WRAP} py-[60px] lg:py-[90px]`} style={{ paddingLeft: 28, paddingRight: 28 }}>
        <AnimatedSection className="mb-14 max-w-[600px]">
          <Eyebrow color="var(--money)">Why lyne.</Eyebrow>
          <SectionTitle>Other apps bury it in clutter. lyne. lays it out clean.</SectionTitle>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 0, borderRadius: 24, overflow: 'hidden', border: '1px solid var(--hairline)' }}>
          {/* Before */}
          <AnimatedSection>
            <div style={{ background: 'var(--surface2)', padding: 'clamp(28px, 4vw, 44px)', height: '100%' }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 20 }}>
                Other apps
              </p>
              <div style={{
                borderRadius: 18, overflow: 'hidden', border: '1px solid var(--hairline2)',
                filter: 'grayscale(0.65) contrast(0.92)', opacity: 0.82,
              }}>
                <Image src="/screens/other-app-compare.png" alt="A rival metro app screen cluttered with a disclaimer banner and a plain numbered stop list" width={900} height={2000} unoptimized style={{ width: '100%', height: 'auto', display: 'block' }}/>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-dim)', marginTop: 20 }}>
                A disclaimer banner up top, cramped stat tiles, and a plain numbered list. The fare and platform are technically in there, just harder to find at a glance.
              </p>
            </div>
          </AnimatedSection>

          {/* After */}
          <AnimatedSection delay={0.08}>
            <div style={{ background: 'var(--bg)', padding: 'clamp(28px, 4vw, 44px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
                With lyne.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <DeviceFrame src="/screens/route-interchange-light.png" alt="lyne. app showing a step-by-step Delhi Metro route with interchange and fare" width={220}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
                {BENEFITS.map(b => (
                  <div key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--money)', marginTop: 7, flexShrink: 0 }}/>
                    <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--text)' }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
