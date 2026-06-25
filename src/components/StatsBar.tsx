import { useEffect, useRef, useState } from 'react';

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  subNote?: string;
  decimals?: number;
};

const stats: Stat[] = [
  { value: 47, suffix: '%', label: 'Peak email open rate achieved', subNote: '↑ from 18% baseline · Marcus Webb' },
  { value: 3.2, suffix: '×', label: 'Conversion increase (60 days)', subNote: 'Sarah Chen · E-commerce', decimals: 1 },
  { value: 6, suffix: '+', label: 'Industries served' },
  { value: 100, suffix: '%', label: 'Clients who returned', subNote: 'All 4 clients expressed intent to continue' },
];

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const StatsBar = () => {
  const ref = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const duration = 1800;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const e = easeOutQuart(t);
            setCounts(stats.map((s) => s.value * e));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const format = (s: Stat, current: number) => {
    const d = s.decimals ?? (Number.isInteger(s.value) ? 0 : 1);
    const display = current.toFixed(d);
    return `${s.prefix ?? ''}${display}${s.suffix ?? ''}`;
  };

  const dirs = ['ed-from-left', 'ed-from-top', 'ed-from-bottom', 'ed-from-right'];
  const sizeClass = ['stat-cell--lg', 'stat-cell--sm', 'stat-cell--lg', 'stat-cell--sm'];
  return (
    <section
      ref={ref}
      aria-label="Key results"
      className="relative z-10 w-full bg-white"
      style={{
        borderTop: '1px solid rgba(108,78,242,0.1)',
        borderBottom: '1px solid rgba(108,78,242,0.1)',
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 stats-bar-asym">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center ed-enter ${dirs[i]} ${sizeClass[i]} ${startedRef.current ? 'is-visible' : ''}`}
            style={{
              padding: '2.5rem 1rem',
              animationDelay: `${i * 0.15}s`,
              borderRight:
                i < stats.length - 1
                  ? '1px solid rgba(108,78,242,0.1)'
                  : 'none',
              borderBottom:
                i < 2 ? '1px solid rgba(108,78,242,0.1)' : 'none',
            }}
          >
            <div
              className="stat-value"
              style={{
                fontSize: 'clamp(1.9rem, 3vw, 2.4rem)',
                fontWeight: 600,
                color: '#6C4EF2',
                lineHeight: 1.1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {format(s, counts[i])}
            </div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#1A1523',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
            {s.subNote && (
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 300,
                  color: '#9B93A8',
                  marginTop: '4px',
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {s.subNote}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @media (min-width: 768px) {
          section[aria-label="Key results"] > div > div:nth-child(-n+2) {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsBar;
