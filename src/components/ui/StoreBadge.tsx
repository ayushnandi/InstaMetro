'use client';

interface StoreBadgeProps {
  kind: 'play' | 'apple';
  className?: string;
}

function PlayIcon({ bg }: { bg: string }) {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
      <path d="M1 1.5 L1 22.5 C1 23.3 1.8 23.8 2.5 23.4 L19 12 L2.5 0.6 C1.8 0.2 1 0.7 1 1.5 Z" fill={bg}/>
      <path d="M14 8.2 L2.5 0.6 C2.2 0.4 1.9 0.4 1.6 0.5 L12 11 L14 8.2 Z" fill="#00C2A8"/>
      <path d="M14 15.8 L2.5 23.4 C2.2 23.6 1.9 23.6 1.6 23.5 L12 13 L14 15.8 Z" fill="#FF4F5E"/>
      <path d="M19 12 L14.5 9 L12 11 L14.5 13 L19 12 Z" fill="#FFC400"/>
    </svg>
  );
}

function AppleIcon({ bg }: { bg: string }) {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M16.5 12.7c0-2.6 2.1-3.9 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.5 0 2 .8 3.3.8 1.4 0 2.3-1.2 3.1-2.5.6-.9.9-1.4 1.4-2.4-3.6-1.4-3-5.5-2.7-5z" fill={bg}/>
      <path d="M14 4.3c.7-.9 1.2-2.1 1-3.3-1 0-2.3.7-3 1.5-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3.1-1.4z" fill={bg}/>
    </svg>
  );
}

export default function StoreBadge({ kind, className = '' }: StoreBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-[11px] px-[18px] py-[11px] rounded-[14px] cursor-pointer select-none ${className}`}
      style={{ background: 'var(--text)', color: 'var(--bg)' }}
    >
      {kind === 'play'
        ? <PlayIcon bg="var(--bg)"/>
        : <AppleIcon bg="var(--bg)"/>
      }
      <div className="text-left leading-[1.1]">
        <div className="font-mono text-[9px] font-medium opacity-70 uppercase">
          {kind === 'play' ? 'COMING TO' : 'Coming to'}
        </div>
        <div className="font-sans text-[15px] font-bold">
          {kind === 'play' ? 'Google Play' : 'App Store'}
        </div>
      </div>
    </div>
  );
}
