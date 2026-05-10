import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroBackground from './HeroBackground';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated hero background (canvas) */}
      <HeroBackground />

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

      {/* Floating availability badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="absolute top-24 right-6 md:right-12 z-20"
      >
        <div className="animate-slow-spin w-24 h-24 md:w-28 md:h-28 rounded-full border border-primary/30 flex items-center justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary/50 flex items-center justify-center text-center">
            <span className="font-accent text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-gold leading-tight">
              Available<br />for Projects<br />✦ 2025
            </span>
          </div>
        </div>
      </motion.div>

      {/* Horizontal accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-0 right-0 h-px bg-primary/10 origin-left z-0"
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Eyebrow label */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.05em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ delay: 0.1, duration: 1 }}
          className="block font-accent text-[11px] md:text-[13px] uppercase tracking-[0.3em] text-gold/60 mb-8"
        >
          Email Marketing · Landing Pages · Social Ads
        </motion.span>

        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[120px] leading-[0.9] mb-2 tracking-[-0.03em]">
          <span className="block overflow-hidden">
            {["I", "Don't", "Write", "Copy."].map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 80, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3 md:mr-4 text-white-headline"
                style={{ perspective: '600px' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block mt-2 overflow-hidden">
            {["I", "Write"].map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 80, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3 md:mr-4 text-white-headline"
                style={{ perspective: '600px' }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 80, rotateX: 40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-3 md:mr-4 text-gold"
              style={{ perspective: '600px' }}
            >
              Revenue.
            </motion.span>
          </span>
        </h1>

        {/* Gold accent divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-primary mx-auto my-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="font-body text-base md:text-lg text-cream max-w-2xl mx-auto mb-12 leading-relaxed opacity-70"
        >
          Hi, I'm <span className="text-gold">Hanan Arif</span> — and the fact that you're still reading this?
          <br className="hidden md:block" />
          That's exactly what I do for your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            data-clickable
            className="font-accent text-[13px] uppercase tracking-[0.15em] bg-primary text-primary-foreground px-10 py-4 animate-glow-pulse hover:bg-primary/90 transition-colors font-medium"
          >
            See My Work →
          </a>
          <a
            href="#contact"
            data-clickable
            className="font-accent text-[13px] uppercase tracking-[0.15em] border border-foreground/20 text-foreground px-10 py-4 hover:border-primary hover:text-primary transition-all duration-300 font-medium"
          >
            Let's Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.6 }}
          className="mt-20"
        >
          <a href="#credibility" data-clickable>
            <ChevronDown className="mx-auto text-primary/50 animate-float" size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;