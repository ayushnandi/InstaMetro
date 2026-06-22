'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import StoreBadge from '@/components/ui/StoreBadge';
import PhoneShell from '@/components/phone/PhoneShell';
import ScreenHome from '@/components/phone/ScreenHome';
import ScreenTicket from '@/components/phone/ScreenTicket';
import ScreenLive from '@/components/phone/ScreenLive';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { WRAP } from '@/lib/tokens';

function StarIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M12 3l2.6 6 6.4.6-4.8 4.3 1.4 6.4L12 17l-5.6 3.3 1.4-6.4L3 9.6 9.4 9z"/>
    </svg>
  );
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? (resolvedTheme as 'light' | 'dark' ?? 'light') : 'light';

  const amber  = theme === 'light' ? '#B57A00' : '#F4B400';
  const accent = theme === 'light' ? '#2B53E8' : '#4D7CFF';
  const red    = '#E84545';
  const green  = '#29A776';

  // ── Scroll tracking ──────────────────────────────────────────
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  // ── Entry motion values ───────────────────────────────────────
  const leftEntryX    = useMotionValue(-400);
  const rightEntryX   = useMotionValue(400);
  const centerEntryY  = useMotionValue(-200);
  const leftEntryOp   = useMotionValue(0);
  const rightEntryOp  = useMotionValue(0);
  const centerEntryOp = useMotionValue(0);

  // ── Scroll transforms ─────────────────────────────────────────
  // Side phones converge toward center (x → 0) and fade out
  const leftScrollX  = useTransform(scrollYProgress, [0, 0.55], [0,  118]);
  const rightScrollX = useTransform(scrollYProgress, [0, 0.55], [0, -118]);
  const sideScrollOp = useTransform(scrollYProgress, [0.15, 0.5], [1, 0]);

  // ── Combined final values ─────────────────────────────────────
  const leftFinalX   = useTransform([leftEntryX,  leftScrollX],   ([a, b]) => (a as number) + (b as number));
  const rightFinalX  = useTransform([rightEntryX, rightScrollX],  ([a, b]) => (a as number) + (b as number));
  const leftFinalOp  = useTransform([leftEntryOp,  sideScrollOp], ([a, b]) => (a as number) * (b as number));
  const rightFinalOp = useTransform([rightEntryOp, sideScrollOp], ([a, b]) => (a as number) * (b as number));

  // ── Entry animations (fire once) ─────────────────────────────
  useEffect(() => {
    const ease = [0.22, 1, 0.36, 1] as const;
    animate(leftEntryX,    -118, { duration: 0.9, ease, delay: 0.1 });
    animate(rightEntryX,    118, { duration: 0.9, ease, delay: 0.1 });
    animate(centerEntryY,     0, { duration: 0.8, ease, delay: 0   });
    animate(leftEntryOp,      1, { duration: 0.5, delay: 0.1 });
    animate(rightEntryOp,     1, { duration: 0.5, delay: 0.1 });
    animate(centerEntryOp,    1, { duration: 0.5, delay: 0   });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', paddingTop: 70, background: 'var(--bg)' }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 700,
          background: `radial-gradient(ellipse at center, ${accent}1F 0%, transparent 60%)`,
        }}/>
        <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          <path d="M-50 180 L500 180 L700 380" stroke={amber}  strokeWidth="2.5" fill="none" opacity="0.4"/>
          <path d="M-50 420 L1250 420"          stroke={accent} strokeWidth="3"   fill="none" opacity="0.35"/>
          <path d="M250 -50 L250 750"            stroke={red}    strokeWidth="2.5" fill="none" opacity="0.3"/>
          <path d="M950 -50 L950 500 L750 700"  stroke={green}  strokeWidth="2.5" fill="none" opacity="0.3" strokeLinejoin="round"/>
          {([[250,180],[250,420],[700,380],[950,420],[500,180]] as [number,number][]).map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 5 : 8} fill="#0A0A0A" stroke="#fff" strokeWidth="2" opacity="0.5"/>
          ))}
        </svg>
      </div>

      <div className={WRAP} style={{ position: 'relative', padding: '64px 28px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center' }}>
          {/* Left: text */}
          <AnimatedSection>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 99,
              background: 'var(--surface1)', border: '1px solid var(--hairline)',
              fontSize: 12.5, color: 'var(--text-dim)', marginBottom: 26, fontWeight: 500,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--money)', display: 'inline-block' }}/>
              Delhi Metro · 303 stations · 10 lines
            </div>

            <h1 style={{
              fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
              fontSize: 'clamp(40px, 6vw, 72px)',
              letterSpacing: -2.5, lineHeight: 1.02,
              color: 'var(--text)', margin: '0 0 22px',
            }}>
              Delhi Metro navigation,<br/>in your pocket.
            </h1>

            <p style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', lineHeight: 1.55, color: 'var(--text-dim)', margin: '0 0 32px', maxWidth: 480 }}>
              Navigate the full Delhi Metro network simply. Plan routes, check fares, book QR tickets, and track your live journey on an interactive map. Available in Hindi and English.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }} id="download">
              <StoreBadge kind="play"/>
              <StoreBadge kind="apple"/>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {[0,1,2,3,4].map(i => <StarIcon key={i} color={amber}/>)}
              </div>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--text-dim)' }}>
                Coming to Play Store &amp; App Store
              </span>
            </div>
          </AnimatedSection>

          {/* Right: phone mockups with entry + scroll animations */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 600 }}>

            {/* Left phone (live) — enters from left, merges behind center on scroll */}
            <motion.div style={{ position: 'absolute', x: leftFinalX, opacity: leftFinalOp, zIndex: 1 }}>
              <div style={{ transform: 'translateY(36px) rotate(-7deg) scale(0.84)', filter: 'brightness(0.78)' }}>
                <PhoneShell theme={theme} width={280}>
                  <ScreenLive />
                </PhoneShell>
              </div>
            </motion.div>

            {/* Right phone (ticket) — enters from right, merges behind center on scroll */}
            <motion.div style={{ position: 'absolute', x: rightFinalX, opacity: rightFinalOp, zIndex: 1 }}>
              <div style={{ transform: 'translateY(36px) rotate(7deg) scale(0.84)', filter: 'brightness(0.78)' }}>
                <PhoneShell theme={theme} width={280}>
                  <ScreenTicket />
                </PhoneShell>
              </div>
            </motion.div>

            {/* Center phone (home) — enters from top */}
            <motion.div style={{ position: 'relative', y: centerEntryY, opacity: centerEntryOp, zIndex: 3 }}>
              <PhoneShell theme={theme} width={300}>
                <ScreenHome />
              </PhoneShell>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Logo cloud */}
      <div className={WRAP} style={{ padding: '0 28px 56px' }}>
        <div style={{
          borderTop: '1px solid var(--hairline)', paddingTop: 28,
          display: 'flex', alignItems: 'center', gap: 30, flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--text-mute)', letterSpacing: 0.5 }}>AVAILABLE ON</span>
          {['Android', 'Google Maps', 'Firebase', 'Expo'].map(n => (
            <span key={n} style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--text-mute)', letterSpacing: -0.3 }}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
