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
    <section id="contact" className="relative z-10 py-20 md:py-32 bg-gradient-cta overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label block text-center mb-4"
        >
          CONTACT
        </motion.span>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white-headline mb-6 max-w-4xl mx-auto leading-tight tracking-[-0.03em]"
        >
          Your Next <span className="text-gold">High-Converting</span> Campaign{' '}
          Starts With <span className="text-gold">One Conversation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-body text-cream/50 text-base mb-12 max-w-lg mx-auto italic"
        >
          I take <span className="text-crimson">limited</span> projects each month. If you're reading this, there's
          still a <span className="text-crimson">slot</span> open — but <span className="text-crimson">not for long</span>.
        </motion.p>

        <motion.a
          href="mailto:hananhereat@gmail.com"
          data-clickable
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="inline-block font-accent text-[13px] uppercase tracking-[0.15em] px-12 py-5 animate-glow-pulse-crimson hover:brightness-110 transition-all font-semibold text-white-headline"
          style={{ backgroundColor: 'hsl(355, 84%, 40%)' }}
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
              className="w-12 h-12 rounded-full border border-[hsla(43,52%,54%,0.18)] flex items-center justify-center text-muted-foreground hover:text-gold hover:border-primary hover:glow-gold transition-all duration-300"
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