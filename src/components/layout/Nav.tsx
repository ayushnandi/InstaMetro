'use client';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { WRAP } from '@/lib/tokens';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Network',  href: '#network' },
  { label: 'Stack',    href: '#stack' },
  { label: 'Reviews',  href: '#reviews' },
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
  return (
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
        {/* Wordmark: BrandMark SVG + text */}
        <div className="inline-flex items-center" style={{ gap: 9, fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, letterSpacing: -0.5, color: 'var(--text)', flexShrink: 0 }}>
          <BrandMark size={26}/>
          <span>lyne<span style={{ color: 'var(--accent)' }}>.</span></span>
        </div>

        {/* Nav links — centered */}
        <nav className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'center', gap: 28 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[14px] font-medium transition-colors duration-150"
              style={{ color: 'var(--text-dim)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center" style={{ gap: 12 }}>
          <ThemeToggle />
          <a
            href="#download"
            className="hidden sm:flex items-center transition-opacity hover:opacity-80"
            style={{ padding: '9px 18px', borderRadius: 11, background: 'var(--text)', color: 'var(--bg)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
          >
            Get the app
          </a>
        </div>
      </div>
    </header>
  );
}
