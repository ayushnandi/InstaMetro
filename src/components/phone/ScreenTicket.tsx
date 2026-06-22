'use client';
import { Icon, StatusBar, Card, LineDot, Mono, QRCodeArt } from './PhoneComponents';
import { useL } from './PhoneTheme';

export default function ScreenTicket() {
  const L = useL();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: L.bg, position: 'relative', overflow: 'hidden', height: '100%' }}>
      <StatusBar />

      {/* Mint glow background */}
      <div style={{
        position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 500, borderRadius: 99,
        background: `radial-gradient(circle, ${L.money}26 0%, transparent 60%)`,
        pointerEvents: 'none',
      }}/>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 20px 18px', minHeight: 48, flexShrink: 0 }}>
        <button style={{
          width: 40, height: 40, borderRadius: 12, background: L.surface2,
          border: `1px solid ${L.hairline}`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: L.text, cursor: 'pointer', padding: 0,
        }}>
          <Icon name="arrowL" size={18}/>
        </button>
        <div style={{ flex: 1 }}/>
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          background: L.surface1, border: `1px solid ${L.hairline}`, color: L.text,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="share" size={16}/>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px', position: 'relative', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
        {/* ACTIVE badge + heading */}
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 99, background: `${L.money}1F`, marginBottom: 10,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 99, background: L.money,
              boxShadow: `0 0 0 4px ${L.money}33`,
            }}/>
            <Mono size={11} color={L.money} weight={600}>ACTIVE</Mono>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: L.text, letterSpacing: -0.3 }}>
            Show at the gate
          </div>
          <Mono size={12} color={L.textDim} style={{ marginTop: 4, display: 'block' }}>
            Valid until 12:18 PM · 1h 47m left
          </Mono>
        </div>

        {/* Ticket card — always light background */}
        <div style={{
          background: '#FEFCF8', color: '#161310',
          borderRadius: 24, padding: 22, position: 'relative',
          marginBottom: 16,
          boxShadow: L.shadowMint,
        }}>
          {/* perforation notches */}
          <div style={{
            position: 'absolute', top: '60%', left: -12, width: 24, height: 24, borderRadius: 99,
            background: L.bg,
          }}/>
          <div style={{
            position: 'absolute', top: '60%', right: -12, width: 24, height: 24, borderRadius: 99,
            background: L.bg,
          }}/>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <QRCodeArt size={196} color="#0A0A0A" bg="#FEFCF8"/>
          </div>

          <Mono size={10} color="rgba(10,10,10,0.5)" style={{ display: 'block', textAlign: 'center', letterSpacing: 1, marginBottom: 14 }}>
            LYNE · TKT-7H8K-4D2X-2026
          </Mono>

          {/* dashed separator */}
          <div style={{ borderTop: '1.5px dashed rgba(10,10,10,0.15)', margin: '0 -8px 16px' }}/>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>From</span>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', marginTop: 2 }}>Rajiv Chowk</div>
            </div>
            <Icon name="arrowR" size={16} color="rgba(10,10,10,0.4)"/>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>To</span>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', marginTop: 2 }}>Vaishali</div>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: 16, marginTop: 16, paddingTop: 14,
            borderTop: '1px solid rgba(10,10,10,0.08)',
          }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Issued</span>
              <Mono size={12} weight={500} color="#0A0A0A" style={{ display: 'block', marginTop: 3 }}>10:31 AM</Mono>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Line</span>
              <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', gap: 5 }}>
                <LineDot color={L.line.blue} size={7}/>
                <Mono size={12} weight={500} color="#0A0A0A">Blue</Mono>
              </div>
            </div>
            <div>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Fare</span>
              <Mono size={14} weight={600} color="#0A0A0A" style={{ display: 'block', marginTop: 3 }}>₹40</Mono>
            </div>
          </div>
        </div>

        {/* Info card */}
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: L.surface3,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name="info" size={18} color={L.textDim}/>
          </div>
          <div style={{ flex: 1, fontSize: 12, color: L.textDim, lineHeight: 1.4 }}>
            Hold your phone screen close to the gate scanner. Brightness will auto-boost.
          </div>
        </Card>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, padding: '14px', borderRadius: 16,
            background: L.surface1, color: L.text, border: 'none',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>My tickets</button>
          <button style={{
            flex: 1, padding: '14px', borderRadius: 16,
            background: L.surface1, color: L.text, border: 'none',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Cancel ticket</button>
        </div>
      </div>
    </div>
  );
}
