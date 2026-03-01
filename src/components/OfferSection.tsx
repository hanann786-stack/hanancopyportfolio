import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const offerings = [
  'Deep-research copy that converts cold traffic',
  'Brand voice that people remember at 2am',
  'Landing pages built on buyer psychology',
  'Email sequences that feel like a conversation, not a broadcast',
  'Revisions until it\'s RIGHT — not just done',
];

const OfferSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-5xl md:text-6xl text-center mb-16 text-foreground"
        >
          What You're Actually <span className="text-gradient-gold">Getting</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto bg-card border border-gold rounded-sm p-10 md:p-14 relative overflow-hidden"
        >
          {/* Subtle gold corner glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 blur-3xl rounded-full" />
          
          <ul className="space-y-6 relative z-10">
            {offerings.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-4 font-body text-foreground/90"
              >
                <span className="text-accent text-lg mt-0.5">✦</span>
                <span className="text-base leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-10 pt-8 border-t border-border font-body text-muted-foreground text-center italic"
          >
            This isn't a service. It's a competitive advantage.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;
