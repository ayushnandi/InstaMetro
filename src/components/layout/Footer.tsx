import Link from 'next/link';
import { WRAP, LINE_COLORS, LINES } from '@/lib/tokens';

const COL1 = [
  { label: 'Features',      href: '#features' },
  { label: 'All stations',  href: '/stations' },
  { label: 'Popular routes', href: '/routes' },
  { label: 'Guides',        href: '/guides' },
  { label: 'FAQ',           href: '/faq' },
];

const COL2 = [
  { label: 'About',          href: '#about' },
  { label: 'Careers',        href: '/careers' },
  { label: 'Contact',        href: '/contact' },
  { label: 'Play Store',     href: '#' },
];

const COL3 = [
  { label: 'Hindi support',  href: '#' },
  { label: 'Accessibility',  href: '#' },
  { label: 'Dark mode',      href: '#' },
  { label: 'Offline use',    href: '#' },
];

const COL4 = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms of use',   href: '/terms-of-use' },
  { label: 'Data deletion',  href: '/privacy-policy#4-data-retention' },
  { label: 'Cookies',        href: '/privacy-policy' },
];

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[1px] uppercase mb-4" style={{ color: 'var(--text-mute)' }}>
        {title}
      </p>
      <div className="flex flex-col gap-[11px]">
        {links.map(l => l.href.startsWith('/') ? (
          <Link key={l.label} href={l.href}
            className="text-[14px] transition-colors duration-150 hover:opacity-80"
            style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
            {l.label}
          </Link>
        ) : (
          <a key={l.label} href={l.href}
            className="text-[14px] transition-colors duration-150 hover:opacity-80"
            style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: 'var(--bg)', borderColor: 'var(--hairline)' }}>
      <div className={WRAP} style={{ padding: '56px 28px 28px' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.6fr_repeat(4,1fr)]" style={{ gap: 32 }}>
          <div className="col-span-2 md:col-span-1">
            <p className="font-sans font-bold text-[20px] tracking-[-1px] mb-2" style={{ color: 'var(--text)' }}>
              lyne<span style={{ color: 'var(--accent)' }}>.</span>
            </p>
            <p className="text-[14px] leading-[1.55] mb-5 max-w-[240px]" style={{ color: 'var(--text-dim)' }}>
              Delhi Metro, simplified.
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {LINES.map(l => (
                <div key={l.key} className="w-[18px] h-[5px] rounded-full" style={{ background: LINE_COLORS[l.key] }}/>
              ))}
            </div>
          </div>
          <FooterCol title="App"     links={COL1}/>
          <FooterCol title="Company" links={COL2}/>
          <FooterCol title="Support" links={COL3}/>
          <FooterCol title="Legal"   links={COL4}/>
        </div>

        <div className="mt-10 pt-6 flex flex-wrap justify-between items-center gap-4 border-t" style={{ borderColor: 'var(--hairline)' }}>
          <p className="font-mono text-[12.5px]" style={{ color: 'var(--text-mute)' }}>
            © 2026 lyne. Made in India. Made by Ayush Nandi.
          </p>
          <p className="font-mono text-[12.5px]" style={{ color: 'var(--text-mute)' }}>
            Not affiliated with DMRC.
          </p>
        </div>
      </div>
    </footer>
  );
}
