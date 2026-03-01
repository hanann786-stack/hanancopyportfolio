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
          {/* Photo with luxury treatments */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 1.05 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center"
          >
            {/* Gold glow halo behind frame */}
            <div className="absolute inset-4 rounded-sm bg-primary/10 blur-3xl" />
            
            {/* Offset gold geometric border */}
            <div className="relative">
              {/* Outer offset frame */}
              <div className="absolute -inset-3 border border-primary/40" />
              {/* Inner frame */}
              <div className="absolute -inset-1 border border-primary/20" />
              
              {/* Photo container */}
              <div className="relative aspect-[3/4] w-full max-w-[380px] overflow-hidden">
                <img
                  src={portraitImg}
                  alt="Hanan Arif — premium copywriter"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  style={{
                    filter: 'saturate(0.82) contrast(1.08) brightness(0.95)',
                  }}
                />
                {/* Vignette overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, transparent 50%, rgba(8,8,8,0.7) 100%)',
                  }}
                />
                {/* Cool shadows / warm highlights color grade */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(201,168,76,0.08) 0%, rgba(40,60,80,0.12) 100%)',
                  }}
                />
                {/* Grain texture overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-grain" />
              </div>
            </div>
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