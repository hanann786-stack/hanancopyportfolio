import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const line1Words = "I Don't Write Copy.".split(' ');
const line2Words = "I Write Revenue.".split(' ');

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            <span className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-primary leading-tight">
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
          className="block font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/60 mb-8"
        >
          Email Marketing · Landing Pages · Social Ads
        </motion.span>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-2">
          <span className="block overflow-hidden">
            {line1Words.map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 80, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3 md:mr-4 text-foreground"
                style={{ perspective: '600px' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block mt-2 overflow-hidden">
            {line2Words.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 80, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block mr-3 md:mr-4 ${
                  word === 'Decisions.' ? 'text-gradient-gold' : 'text-foreground'
                }`}
                style={{ perspective: '600px' }}
              >
                {word}
              </motion.span>
            ))}
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
          className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Hi, I'm Hanan Arif — and the fact that you're still reading this?
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
            className="font-body text-xs uppercase tracking-[0.2em] bg-primary text-primary-foreground px-10 py-4 animate-glow-pulse hover:bg-primary/90 transition-colors font-medium"
          >
            See My Work →
          </a>
          <a
            href="#contact"
            data-clickable
            className="font-body text-xs uppercase tracking-[0.2em] border border-foreground/20 text-foreground px-10 py-4 hover:border-primary hover:text-primary transition-all duration-300 font-medium"
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
