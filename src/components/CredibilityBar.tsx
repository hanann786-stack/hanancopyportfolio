import { useRef, useState, useEffect } from 'react';

const niches = [
  'E-Commerce', 'SaaS', 'Fashion', 'Health & Wellness', 'Personal Finance',
  'Real Estate', 'Coaching', 'Tech Startups', 'DTC Brands', 'Agencies',
];

const CredibilityBar = () => {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="credibility"
      ref={ref}
      className="relative z-10 py-5 bg-glass border-y border-[hsla(43,52%,54%,0.18)] overflow-hidden transition-opacity duration-600"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex items-center">
        <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap pl-6 pr-8">
          Trusted across industries —
        </span>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...niches, ...niches].map((n, i) => (
            <span
              key={i}
              className="mx-6 font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityBar;
