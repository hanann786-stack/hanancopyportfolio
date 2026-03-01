import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const clients = [
  'SaaS Startups', 'DTC Brands', 'Health & Wellness', 'FinTech', 'E-Commerce',
  'Personal Brands', 'Real Estate', 'Tech Companies', 'Coaches & Consultants', 'Agencies',
];

const testimonials = [
  {
    quote: "He didn't just write copy. He rewired how we talk to our customers. Conversions jumped 3.2x in 60 days.",
    name: 'Sarah Chen',
    title: 'CMO, Velostra',
  },
  {
    quote: "Our email open rate went from 18% to 47%. I didn't think that was possible without changing our entire list.",
    name: 'Marcus Webb',
    title: 'Founder, NovaBrand',
  },
  {
    quote: "He writes like he's inside your customer's head. It's unsettling — and incredibly effective.",
    name: 'Elena Rossi',
    title: 'Head of Growth, Arcline',
  },
];

const stats = [
  { value: 12, suffix: '+', label: 'Brands Moved' },
  { value: 40, suffix: '+', label: 'Copies Delivered' },
  { value: 3, suffix: 'x', label: 'Avg Conversion Lift' },
];

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
    <span ref={ref} className="font-display text-5xl md:text-6xl text-gradient-gold">
      {count}{suffix}
    </span>
  );
};

const SocialProofSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-5xl md:text-6xl text-center mb-16 text-foreground"
        >
          Brands I've <span className="text-gradient-gold">Moved</span>
        </motion.h2>

        {/* Marquee */}
        <div className="relative mb-20 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (
              <span
                key={i}
                className="mx-8 font-display text-2xl text-muted-foreground/40 uppercase tracking-widest"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-card border border-border rounded-sm p-8 relative"
            >
              <span className="font-display text-6xl text-primary/30 absolute top-4 left-6">"</span>
              <p className="font-body text-foreground/80 text-sm leading-relaxed mt-8 mb-6">
                {t.quote}
              </p>
              <div>
                <p className="font-body font-semibold text-foreground text-sm">{t.name}</p>
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
              <p className="font-body text-muted-foreground text-sm mt-2 uppercase tracking-wider">
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
