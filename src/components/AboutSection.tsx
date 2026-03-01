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
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={portraitImg}
                alt="Copywriter portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-sm" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              I became a copywriter because I got tired of seeing great products fail because of{' '}
              <span className="text-gradient-crimson">bad words.</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              I've spent years studying what makes people click, buy, and come back. Not theory — 
              real campaigns, real data, real results. I don't write pretty sentences. I write 
              sentences that make the cash register ring.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              When I'm not obsessing over a headline, you'll find me breaking down Super Bowl ads 
              for fun, re-reading Ogilvy, or arguing that the Oxford comma is non-negotiable.
            </p>
            <p className="font-body text-accent text-sm uppercase tracking-widest mt-6">
              Words are my weapon. Results are my proof.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
