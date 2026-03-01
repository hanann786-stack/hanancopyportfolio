import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const niches = [
  'E-Commerce', 'SaaS', 'Fashion', 'Health & Wellness', 'Personal Finance',
  'Real Estate', 'Coaching', 'Tech Startups', 'DTC Brands', 'Agencies',
];

const CredibilityBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      id="credibility"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative z-10 py-5 bg-glass border-y border-border overflow-hidden"
    >
      <div className="flex items-center">
        <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap pl-6 pr-8">
          Trusted across industries —
        </span>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...niches, ...niches].map((n, i) => (
            <span
              key={i}
              className="mx-6 font-body text-xs uppercase tracking-[0.2em] text-primary/50"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CredibilityBar;