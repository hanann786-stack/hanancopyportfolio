import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const line1Words = "I Don't Just Write Copy.".split(' ');
const line2Words = "I Engineer Decisions.".split(' ');

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating availability badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
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

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] mb-4">
          <span className="block">
            {line1Words.map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                className="inline-block mr-3 text-foreground"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block mt-2">
            {line2Words.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12, duration: 0.7, ease: 'easeOut' }}
                className={`inline-block mr-3 ${
                  word === 'Decisions.' ? 'text-gradient-gold' : 'text-foreground'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Hi, I'm Hanan Arif — and the fact that you're still reading this?
          That's exactly what I do for your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
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
          transition={{ delay: 2.8, duration: 0.6 }}
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