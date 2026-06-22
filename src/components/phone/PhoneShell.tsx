'use client';
import React from 'react';
import { PhoneThemeCtx, L_DARK, L_LIGHT } from './PhoneTheme';

interface PhoneShellProps {
  theme: 'light' | 'dark';
  children: React.ReactNode;
  width?: number;
}

export default function PhoneShell({ theme, children, width = 380 }: PhoneShellProps) {
  const scale = width / 380;
  const outerH = Math.round(820 * scale);
  const L = theme === 'dark' ? L_DARK : L_LIGHT;
  const bezel = L.bezel;
  const indicator = L.indicator;

  return (
    <PhoneThemeCtx.Provider value={{ L, theme }}>
      <div
        style={{
          width,
          height: outerH,
          position: 'relative',
          borderRadius: Math.round(46 * scale),
          overflow: 'hidden',
          background: L.bg,
          boxShadow: theme === 'light'
            ? `0 50px 90px -30px rgba(60,40,20,0.25), 0 0 0 1px rgba(20,18,15,0.08), 0 0 0 12px ${bezel}`
            : `0 50px 90px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), 0 0 0 12px ${bezel}`,
          flexShrink: 0,
        }}
      >
        {/* Dynamic island */}
        <div
          style={{
            position: 'absolute',
            top: Math.round(11 * scale),
            left: '50%',
            transform: 'translateX(-50%)',
            width: Math.round(118 * scale),
            height: Math.round(34 * scale),
            borderRadius: Math.round(24 * scale),
            background: '#000',
            zIndex: 50,
          }}
        />
        {/* Screen content — always rendered at 380×820, scaled */}
        <div
          className="phone-content"
          style={{
            width: 380,
            height: 820,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: Math.round(8 * scale),
            left: '50%',
            transform: 'translateX(-50%)',
            width: Math.round(132 * scale),
            height: Math.round(5 * scale),
            borderRadius: 999,
            background: indicator,
            zIndex: 60,
          }}
        />
      </div>
    </PhoneThemeCtx.Provider>
  );
}
