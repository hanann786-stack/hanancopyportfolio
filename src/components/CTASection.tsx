import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

const socials = [
  { icon: Mail, href: 'mailto:hananhereat@gmail.com', label: 'Email' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/hanan-arif-03b526396', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/hanan.arif.here', label: 'Instagram' },
];

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative z-10 py-32 bg-gradient-cta overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 max-w-4xl mx-auto leading-tight"
        >
          Your Next High-Converting Campaign{' '}
          <span className="text-gradient-gold">Starts With One Conversation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-body text-foreground/50 text-base mb-12 max-w-lg mx-auto"
        >
          I take limited projects each month. If you're reading this, there's
          still a slot open — but not for long.
        </motion.p>

        <motion.a
          href="mailto:hananhereat@gmail.com"
          data-clickable
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="inline-block font-body text-xs uppercase tracking-[0.2em] bg-primary text-primary-foreground px-12 py-5 animate-glow-pulse hover:bg-primary/90 transition-colors font-semibold"
        >
          Book a Free Strategy Call →
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
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:glow-gold transition-all duration-300"
              aria-label={s.label}
            >
              <s.icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;