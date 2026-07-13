import Image from 'next/image';

interface DeviceFrameProps {
  src: string;
  alt: string;
  width?: number;
  tilt?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DeviceFrame({ src, alt, width = 260, tilt = 0, className = '', style }: DeviceFrameProps) {
  const height = Math.round((width * 2400) / 1080);
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius: Math.round(width * 0.11),
        overflow: 'hidden',
        border: '1px solid var(--hairline2)',
        boxShadow: '0 40px 70px -30px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.02)',
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
        flexShrink: 0,
        ...style,
      }}
    >
      <Image src={src} alt={alt} width={1080} height={2400} unoptimized style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}
