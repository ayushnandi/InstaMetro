import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionTitle({ children, className = '', style }: SectionTitleProps) {
  return (
    <h2
      className={`font-sans font-semibold text-text leading-[1.08] tracking-[-1.5px] ${className}`}
      style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', ...style }}
    >
      {children}
    </h2>
  );
}
