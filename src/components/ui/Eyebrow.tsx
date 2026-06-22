interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Eyebrow({ children, color = 'var(--accent)', className = '' }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[12px] font-medium tracking-[1.5px] uppercase mb-[18px] ${className}`}
      style={{ color }}
    >
      <span style={{ width: 18, height: 1.5, background: color, borderRadius: 2, display: 'inline-block', flexShrink: 0 }}/>
      {children}
    </div>
  );
}
