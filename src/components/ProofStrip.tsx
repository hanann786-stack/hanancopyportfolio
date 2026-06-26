import { useEffect, useRef, useState } from 'react';

const items = ['skincare', 'SaaS', 'fintech', 'fashion', 'coaching', 'fitness'];

const ProofStrip = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Industries trusted by"
      className="relative z-10 w-full"
      style={{ background: '#E8DFD2', padding: '1.5rem 1rem' }}
    >
      <p
        className="text-center"
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: '#918878',
          textTransform: 'uppercase',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-24px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out',
        }}
      >
        <span style={{ marginRight: '0.5em' }}>Trusted by brands in</span>
        {items.map((w, i) => (
          <span key={w}>
            {i > 0 && (
              <span
                aria-hidden
                style={{
                  color: '#B8703F',
                  margin: '0 0.6em',
                  display: 'inline-block',
                }}
              >
                ·
              </span>
            )}
            <span>{w}</span>
          </span>
        ))}
      </p>
    </section>
  );
};

export default ProofStrip;
