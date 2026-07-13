'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { LINE_COLORS, LINES } from '@/lib/tokens';
import { STATIONS, stationSlug, computeRoute } from '@/lib/metro';

const sortedStations = STATIONS.slice().sort((a, b) => a.name_en.localeCompare(b.name_en));

export default function Calculator() {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');

  const route = useMemo(() => {
    if (!fromId || !toId || fromId === toId) return null;
    return computeRoute(fromId, toId);
  }, [fromId, toId]);

  const fare = route ? (route.farePaise / 100).toFixed(0) : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16, marginBottom: 32, maxWidth: 640 }}>
        <label style={{ display: 'block' }}>
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8, display: 'block' }}>From</span>
          <select
            value={fromId}
            onChange={e => setFromId(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, background: 'var(--surface1)', border: '1px solid var(--hairline)', color: 'var(--text)', fontSize: 14 }}
          >
            <option value="">Select station</option>
            {sortedStations.map(s => <option key={s.id} value={s.id}>{s.name_en}</option>)}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8, display: 'block' }}>To</span>
          <select
            value={toId}
            onChange={e => setToId(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, background: 'var(--surface1)', border: '1px solid var(--hairline)', color: 'var(--text)', fontSize: 14 }}
          >
            <option value="">Select station</option>
            {sortedStations.map(s => <option key={s.id} value={s.id}>{s.name_en}</option>)}
          </select>
        </label>
      </div>

      {fromId && toId && fromId === toId && (
        <p style={{ fontSize: 14, color: 'var(--text-mute)', marginBottom: 32 }}>Pick two different stations.</p>
      )}

      {route && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 48, maxWidth: 760 }}>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Fare</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--money)' }}>₹{fare}</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Duration</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{route.durationMin} min</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Interchanges</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{route.changes}</p>
            </div>
            <div style={{ background: 'var(--surface1)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 20 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 8 }}>Stops</p>
              <p className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{route.stops}</p>
            </div>
          </div>

          <div style={{ maxWidth: 760 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: -0.5 }}>
              Step by step
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {route.segments.map((seg, i) => {
                if (seg.type === 'walk') {
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--text-mute)' }} />
                      <p style={{ fontSize: 14, color: 'var(--text-dim)' }}>{seg.description_en} ({seg.durationMin} min)</p>
                    </div>
                  );
                }
                const lineName = LINES.find(l => l.key === seg.lineId)?.name ?? seg.lineId;
                return (
                  <div key={i} style={{ padding: '18px 20px', borderRadius: 14, background: 'var(--surface1)', border: '1px solid var(--hairline)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 5, background: LINE_COLORS[seg.lineId] }} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{lineName}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                      <Link href={`/stations/${stationSlug(seg.fromStation)}`} style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'none' }}>
                        {seg.fromStation.name_en}
                      </Link>
                      {' → '}
                      <Link href={`/stations/${stationSlug(seg.toStation)}`} style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'none' }}>
                        {seg.toStation.name_en}
                      </Link>
                      {' '}&middot; {seg.stops} stops &middot; {seg.direction}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
