import { ImageResponse } from 'next/og';
import { DEFAULT_TITLE } from '@/lib/seo/config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LINE_DOTS = ['#E84545', '#4D7CFF', '#29A776', '#8456D9', '#F4B400', '#2BC3D6', '#E867A7', '#C8358C', '#F58220', '#8C8C8C'];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0A0A0A',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
          {LINE_DOTS.map((c, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: c }} />
          ))}
        </div>
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 800, color: '#F5F5F5', letterSpacing: -3 }}>
          lyne<span style={{ color: '#4D7CFF' }}>.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: 'rgba(245,245,245,0.62)', marginTop: 18, maxWidth: 820, textAlign: 'center' }}>
          {DEFAULT_TITLE.replace('lyne. — ', '')}
        </div>
      </div>
    ),
    { ...size }
  );
}
