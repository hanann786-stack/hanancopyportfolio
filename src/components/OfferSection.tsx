import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const offerings = [
  'Email sequences that feel like a conversation, not a broadcast',
  'Landing pages built on buyer psychology — not guesswork',
  'Social ads with hooks so sharp they stop mid-scroll',
  'A brand voice people remember at 2am',
  'Revisions until it converts — not just until it looks nice',
];

const OfferSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 text-foreground"
        >
          What Working With Hanan{' '}
          <span className="text-gradient-gold">Actually Gets You</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto bg-card border border-gold rounded-sm p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-primary/3 blur-3xl rounded-full" />

          <ul className="space-y-6 relative z-10">
            {offerings.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-4 font-body text-foreground/90"
              >
                <span className="text-primary text-lg mt-0.5">✦</span>
                <span className="text-base leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-10 pt-8 border-t border-border font-display text-primary text-center italic text-lg"
          >
            This isn't a service. It's your unfair advantage.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;