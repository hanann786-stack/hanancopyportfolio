import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const painCards = [
  { pain: 'Low Conversions', solution: 'Copy that turns browsers into buyers with buyer-psychology frameworks.' },
  { pain: 'Weak Brand Voice', solution: 'A distinct, ownable voice people recognize — and remember at 2am.' },
  { pain: 'Emails Nobody Opens', solution: 'Subject lines that beg to be clicked. Sequences that feel like conversations.' },
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
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-card border border-border rounded-sm flex flex-col items-center justify-center p-8">
          <span className="text-primary text-5xl font-display mb-3">✕</span>
          <h3 className="font-display text-3xl text-foreground">{pain}</h3>
        </div>
        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary rounded-sm flex items-center justify-center p-8">
          <p className="font-body text-primary-foreground text-center text-base leading-relaxed">{solution}</p>
        </div>
      </div>
    </motion.div>
  );
};

const PainSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pain" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-5xl md:text-6xl text-center mb-4 text-foreground"
        >
          Most Copy Blends In.{' '}
          <span className="text-gradient-crimson">Yours Shouldn't.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-center mb-16 font-body"
        >
          Hover to see the fix.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {painCards.map((card, i) => (
            <FlipCard key={card.pain} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;
