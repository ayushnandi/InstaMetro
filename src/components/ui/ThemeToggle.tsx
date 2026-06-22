'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-9" />;

  const isLight = resolvedTheme === 'light';

  return (
    <button
      data-testid="theme-toggle"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      title="Toggle theme"
      className="flex items-center justify-center w-10 h-9 rounded-lg text-[17px] leading-none transition-colors"
      style={{
        background: 'var(--surface2)',
        border: '1px solid var(--hairline2)',
        color: 'var(--text)',
        cursor: 'pointer',
      }}
    >
      {isLight ? '☾' : '☀'}
    </button>
  );
}
