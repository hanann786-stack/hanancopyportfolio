import { useRef, useState, useEffect } from 'react';

const painCards = [
  {
    pain: 'Emails Nobody Opens',
    painHighlights: { 'Nobody': 'crimson' },
    solution: 'Sequences engineered for curiosity and clicks.',
    solutionHighlights: { 'engineered': 'gold' },
  },
  {
    pain: 'Ads That Get Scrolled Past',
    painHighlights: { 'Scrolled': 'crimson', 'Past': 'crimson' },
    solution: 'Hook-first ads built around buyer psychology.',
    solutionHighlights: { 'psychology': 'gold' },
  },
  {
    pain: 'Landing Pages That Leak Money',
    painHighlights: { 'Leak': 'crimson' },
    solution: 'High-converting pages that close while you sleep.',
    solutionHighlights: { 'High-converting': 'gold', 'while you sleep': 'gold' },
  },
];

const HighlightText = ({ text, highlights }: { text: string; highlights: Record<string, string> }) => {
  let remaining = text;
  const parts: { text: string; color: string }[] = [];
  const sortedKeys = Object.keys(highlights).sort((a, b) => text.indexOf(a) - text.indexOf(b));

  for (const key of sortedKeys) {
    const idx = remaining.indexOf(key);
    if (idx === -1) continue;
    if (idx > 0) parts.push({ text: remaining.slice(0, idx), color: '' });
    parts.push({ text: key, color: highlights[key] });
    remaining = remaining.slice(idx + key.length);
  }
  if (remaining) parts.push({ text: remaining, color: '' });

  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className={p.color === 'gold' ? 'text-gold' : p.color === 'crimson' ? 'text-crimson' : ''}>
          {p.text}
        </span>
      ))}
    </>
  );
};

const FlipCard = ({ pain, painHighlights, solution, solutionHighlights, index }: {
  pain: string; painHighlights: Record<string, string>; solution: string; solutionHighlights: Record<string, string>; index: number
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="group perspective-1000 h-64"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
    >
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden] bg-glass-card border border-[hsla(43,52%,54%,0.18)] rounded-sm flex flex-col items-center justify-center p-8 group-hover:border-primary/40 transition-colors">
          <span className="text-crimson text-4xl font-display mb-4">✕</span>
          <h3 className="font-display text-2xl text-cream text-center">
            <HighlightText text={pain} highlights={painHighlights} />
          </h3>
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-glass-card border border-primary/40 rounded-sm flex items-center justify-center p-8" style={{ background: 'hsla(43,52%,54%,0.08)' }}>
          <p className="font-body text-cream text-center text-sm leading-relaxed">
            <HighlightText text={solution} highlights={solutionHighlights} />
          </p>
        </div>
      </div>
    </div>
  );
};

const PainSection = () => {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pain" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <span
          className="section-label block text-center mb-4 transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          THE PROBLEM
        </span>
        <h2
          ref={ref}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4 text-white-headline max-w-4xl mx-auto leading-tight tracking-[-0.03em] transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          Most brands are <span className="text-crimson">invisible</span>. Not because their product is bad —{' '}
          <span className="text-gradient-gold">because their words are.</span>
        </h2>
        <p
          className="text-muted-foreground text-center mb-16 font-body text-sm hidden md:block transition-opacity duration-500 delay-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          Hover to see how I fix it.
        </p>
        <p className="text-muted-foreground text-center mb-16 font-body text-sm md:hidden">
          Tap a card to see how I fix it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {painCards.map((card, i) => (
            <FlipCard key={card.pain} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;
