import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const painCards = [
  { pain: 'Emails Nobody Opens', solution: 'Sequences engineered for curiosity and clicks.' },
  { pain: 'Ads That Get Scrolled Past', solution: 'Hook-first ads built around buyer psychology.' },
  { pain: 'Landing Pages That Leak Money', solution: 'High-converting pages that close while you sleep.' },
];

const FlipCard = ({ pain, solution, index }: { pain: string; solution: string; index: number }) => {
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
        <div className="absolute inset-0 [backface-visibility:hidden] bg-card border border-border rounded-sm flex flex-col items-center justify-center p-8 group-hover:border-primary/40 transition-colors">
          <span className="text-primary text-4xl font-display mb-4">✕</span>
          <h3 className="font-display text-2xl text-foreground text-center">{pain}</h3>
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary/10 border border-primary/40 rounded-sm flex items-center justify-center p-8">
          <p className="font-body text-foreground text-center text-sm leading-relaxed">{solution}</p>
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
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4 text-foreground max-w-4xl mx-auto leading-tight"
        >
          Most brands are invisible. Not because their product is bad —{' '}
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