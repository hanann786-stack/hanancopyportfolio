import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portraitImg from '@/assets/copywriter-portrait.jpg';

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden border border-primary/30 p-2">
              <img
                src={portraitImg}
                alt="Hanan Arif portrait"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              I got tired of watching great products fail because of{' '}
              <span className="text-gradient-gold">bad words.</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              I'm Hanan Arif. I write emails, landing pages, and ads that don't just
              sound good — they make people move. My obsession isn't writing. It's the{' '}
              <span className="text-foreground border-b border-primary/50 pb-0.5">psychology</span>{' '}
              behind why people click, buy, and come back.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Every word I write is backed by research, tested by data, and sharpened
              by instinct. I don't do "nice copy." I do copy that makes the register ring.
            </p>
            <p className="font-body text-primary text-xs uppercase tracking-[0.2em] mt-8">
              Words are my weapon. Results are my proof.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;