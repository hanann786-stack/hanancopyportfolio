import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const headlineWords = "I Don't Write Words. I Write Revenue.".split(' ');

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className={`inline-block mr-3 ${
                word === 'Revenue.' ? 'text-gradient-crimson' : 'text-foreground'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Every scroll you take on this page was engineered to make you feel something.
          That's what I do for your brand.
        </motion.p>

        <motion.a
          href="#work"
          data-clickable
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="inline-block font-body text-sm uppercase tracking-widest bg-primary text-primary-foreground px-8 py-4 rounded-sm animate-glow-pulse hover:bg-primary/90 transition-colors"
        >
          See How I Do It →
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-16"
        >
          <a href="#pain" data-clickable>
            <ChevronDown className="mx-auto text-muted-foreground animate-float" size={28} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
