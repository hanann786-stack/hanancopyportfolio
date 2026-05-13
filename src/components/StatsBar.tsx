import { useEffect, useRef, useState } from 'react';

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 6, suffix: '+', label: 'Industries served' },
  { value: 2, prefix: '$', suffix: 'M+', label: 'Revenue influenced' },
  { value: 40, suffix: '+', label: 'Projects delivered' },
  { value: 97, suffix: '%', label: 'Client retention' },
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
    const isInt = Number.isInteger(s.value);
    const display = isInt ? Math.round(current).toString() : current.toFixed(1);
    return `${s.prefix ?? ''}${display}${s.suffix ?? ''}`;
  };

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
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="text-center"
            style={{
              padding: '2.5rem 1rem',
              borderRight:
                i < stats.length - 1
                  ? '1px solid rgba(108,78,242,0.1)'
                  : 'none',
              borderBottom:
                i < 2 ? '1px solid rgba(108,78,242,0.1)' : 'none',
            }}
          >
            <div
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
                color: '#9B93A8',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
              }}
            >
              {s.label}
            </div>
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
