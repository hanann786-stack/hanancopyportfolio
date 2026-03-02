import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
  let result = text;
  const parts: { text: string; color: string }[] = [];
  
  // Simple approach: split and highlight
  let remaining = text;
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group perspective-1000 h-64"
    >
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Pain side — dark glass, crimson highlights */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-glass-card border border-[hsla(43,52%,54%,0.18)] rounded-sm flex flex-col items-center justify-center p-8 group-hover:border-primary/40 transition-colors">
          <span className="text-crimson text-4xl font-display mb-4">✕</span>
          <h3 className="font-display text-2xl text-cream text-center">
            <HighlightText text={pain} highlights={painHighlights} />
          </h3>
        </div>
        {/* Solution side — lighter glass, gold highlights */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-glass-card border border-primary/40 rounded-sm flex items-center justify-center p-8" style={{ background: 'hsla(43,52%,54%,0.08)' }}>
          <p className="font-body text-cream text-center text-sm leading-relaxed">
            <HighlightText text={solution} highlights={solutionHighlights} />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const PainSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pain" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label block text-center mb-4"
        >
          THE PROBLEM
        </motion.span>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4 text-white-headline max-w-4xl mx-auto leading-tight tracking-[-0.03em]"
        >
          Most brands are <span className="text-crimson">invisible</span>. Not because their product is bad —{' '}
          <span className="text-gradient-gold">because their words are.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-center mb-16 font-body text-sm hidden md:block"
        >
          Hover to see how I fix it.
        </motion.p>
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