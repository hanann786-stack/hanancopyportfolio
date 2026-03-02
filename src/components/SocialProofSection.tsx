import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    quote: "She didn't just write copy. She rewired how we talk to our customers. Conversions jumped 3.2x in 60 days.",
    name: 'Sarah Chen',
    title: 'CMO, Velostra',
  },
  {
    quote: "Our email open rate went from 18% to 47%. I didn't think that was possible without changing our entire list.",
    name: 'Marcus Webb',
    title: 'Founder, NovaBrand',
  },
  {
    quote: "She writes like she's inside your customer's head. It's unsettling — and incredibly effective.",
    name: 'Elena Rossi',
    title: 'Head of Growth, Arcline',
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'Brands Moved' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 3, suffix: 'x', label: 'Avg Conversion Lift' },
];

// Highlight numbers in testimonials with gold
const highlightNumbers = (text: string) => {
  const parts = text.split(/(\d+[\d.]*[x%]?)/g);
  return parts.map((part, i) =>
    /\d/.test(part) ? (
      <span key={i} className="text-gold font-semibold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl lg:text-6xl text-gold">
      {count}{suffix}
    </span>
  );
};

const SocialProofSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        {/* Testimonials */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label block text-center mb-4"
        >
          TESTIMONIALS
        </motion.span>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-center mb-12 md:mb-16 text-white-headline tracking-[-0.03em]"
        >
          What They <span className="text-gradient-gold">Said</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-24 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-glass-card border border-[hsla(43,52%,54%,0.18)] rounded-sm p-8 relative"
            >
              <span className="font-display text-6xl text-gold/20 absolute top-4 left-6">"</span>
              <p className="font-body text-cream/80 text-sm leading-relaxed mt-8 mb-6">
                {highlightNumbers(t.quote)}
              </p>
              <div>
                <p className="font-body font-semibold text-cream text-sm">{t.name}</p>
                <p className="font-body text-muted-foreground text-xs">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <CountUp target={s.value} suffix={s.suffix} />
              <p className="font-accent text-muted-foreground text-[11px] mt-2 uppercase tracking-[0.15em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;