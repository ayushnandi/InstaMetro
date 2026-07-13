'use client';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { WRAP } from '@/lib/tokens';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Stations', href: '/stations' },
  { label: 'Routes',   href: '/routes' },
  { label: 'FAQ',      href: '/faq' },
];

function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="6"  cy="6"  r="2.4" fill="var(--accent)"/>
      <circle cx="22" cy="6"  r="2.4" fill="var(--text)"/>
      <circle cx="14" cy="14" r="2.4" fill="var(--text)"/>
      <circle cx="6"  cy="22" r="2.4" fill="var(--text)"/>
      <circle cx="22" cy="22" r="2.4" fill="var(--amber-c)"/>
      <path d="M6 6L14 14L22 22" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 6L14 14L6 22" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'var(--hairline)',
          height: 70,
        }}
      >
        <div className={`${WRAP} flex items-center h-full`} style={{ gap: 20 }}>
          {/* Wordmark */}
          <div className="inline-flex items-center" style={{ gap: 9, fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, letterSpacing: -0.5, color: 'var(--text)', flexShrink: 0 }}>
            <BrandMark size={26}/>
            <span>lyne<span style={{ color: 'var(--accent)' }}>.</span></span>
          </div>

          {/* Nav links — desktop only */}
          <nav className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'center', gap: 28 }}>
            {NAV_LINKS.map(({ label, href }) => {
              const linkStyle = {
                color: 'var(--text-dim)', textDecoration: 'none',
              };
              const handlers = {
                onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--text)'),
                onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--text-dim)'),
              };
              return href.startsWith('/') ? (
                <Link key={href} href={href} className="text-[14px] font-medium transition-colors duration-150" style={linkStyle} {...handlers}>
                  {label}
                </Link>
              ) : (
                <a key={href} href={href} className="text-[14px] font-medium transition-colors duration-150" style={linkStyle} {...handlers}>
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Right: theme toggle + CTA + hamburger */}
          <div className="flex items-center ml-auto" style={{ gap: 10 }}>
            <ThemeToggle />
            <a
              href="#download"
              className="hidden sm:flex items-center transition-opacity hover:opacity-80"
              style={{ padding: '9px 18px', borderRadius: 11, background: 'var(--text)', color: 'var(--bg)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
            >
              Get the app
            </a>
            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden items-center justify-center"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface1)', border: '1px solid var(--hairline)', color: 'var(--text)', cursor: 'pointer' }}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h18M3 12h18M3 16h18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {open && (
        <div
          className="md:hidden sticky top-[70px] z-40 border-b"
          style={{
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: 'var(--hairline)',
          }}
        >
          <div className={WRAP} style={{ padding: '16px 28px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_LINKS.map(({ label, href }) => {
              const style = {
                fontSize: 17, fontWeight: 500, color: 'var(--text)', textDecoration: 'none',
                padding: '12px 0', borderBottom: '1px solid var(--hairline)',
              };
              return href.startsWith('/') ? (
                <Link key={href} href={href} onClick={() => setOpen(false)} style={style}>{label}</Link>
              ) : (
                <a key={href} href={href} onClick={() => setOpen(false)} style={style}>{label}</a>
              );
            })}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              style={{
                marginTop: 12, padding: '14px 0', borderRadius: 12,
                background: 'var(--text)', color: 'var(--bg)',
                fontSize: 15, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
              }}
            >
              Get the app
            </a>
          </div>
        </div>
      )}
    </>
  );
}
