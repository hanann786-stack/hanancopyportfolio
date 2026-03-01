import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

const socials = [
  { icon: Mail, href: 'mailto:hello@thecopywriter.com', label: 'Email' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative z-10 py-32 bg-gradient-cta overflow-hidden">
      {/* Grain overlay */}
      <div className="bg-grain absolute inset-0" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-6"
        >
          Your Next High-Converting Page{' '}
          <span className="text-gradient-gold">Starts Here.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-body text-foreground/60 text-lg mb-10 max-w-xl mx-auto"
        >
          I only take 3 new clients per month. Let's talk before the slot's gone.
        </motion.p>

        <motion.a
          href="mailto:hello@thecopywriter.com"
          data-clickable
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="inline-block font-body text-sm uppercase tracking-widest bg-accent text-accent-foreground px-10 py-5 rounded-sm animate-glow-pulse hover:bg-accent/90 transition-colors font-semibold"
          style={{
            boxShadow: '0 0 30px hsl(51 100% 52% / 0.3), 0 0 80px hsl(51 100% 52% / 0.1)',
          }}
        >
          Book a Free 20-Min Strategy Call
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-clickable
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:glow-crimson transition-all duration-300"
              aria-label={s.label}
            >
              <s.icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
