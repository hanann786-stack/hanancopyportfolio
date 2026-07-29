import { useRef, useState, useEffect } from 'react';
import portraitImg from '@/assets/copywriter-portrait.jpg';

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Photo */}
          <div
            className="relative flex justify-center transition-all duration-800 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(1.05)',
            }}
          >
            <div className="absolute inset-4 rounded-sm bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="absolute -inset-3 border border-primary/40" />
              <div className="absolute -inset-1 border border-primary/20" />
              <div className="relative aspect-[3/4] w-full max-w-[380px] overflow-hidden">
                <img
                  src={portraitImg}
                  alt="Hanan Arif — premium copywriter"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  width={380}
                  height={507}
                  style={{
                    filter: 'saturate(0.82) contrast(1.08) brightness(0.95)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(232, 223, 210,0.55) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color"
                  style={{
                    background: 'linear-gradient(180deg, rgba(184, 112, 63,0.08) 0%, rgba(184, 112, 63,0.05) 100%)',
                  }}
                />
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-grain" />
              </div>
            </div>
          </div>

          <div
            className="transition-all duration-600 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transitionDelay: '0.15s',
            }}
          >
            <span className="section-label block mb-4">ABOUT</span>
            <h2 className="font-display text-3xl md:text-4xl text-white-headline mb-6 leading-tight tracking-[-0.03em]">
              I got tired of watching great products fail because of{' '}
              <span className="text-gradient-gold">bad words.</span>
            </h2>
            <p className="font-body text-cream/80 leading-relaxed mb-4">
              I'm <span className="text-gold">Hanan Arif</span>. I write emails, landing pages, and ads that don't just
              sound good — they <span className="text-gold">make people move</span>. My obsession isn't writing. It's the{' '}
              <span className="text-gold border-b border-primary/50 pb-0.5">psychology</span>{' '}
              behind why people click, buy, and come back.
            </p>
            <p className="font-body text-cream/80 leading-relaxed mb-4">
              Every word I write is backed by research, tested by data, and sharpened
              by instinct. I <span className="text-crimson">don't</span> do "nice copy." I do copy that makes the register ring.
            </p>
            <p className="font-accent text-gold text-[12px] uppercase tracking-[0.15em] mt-8">
              Words are my weapon. Results are my proof.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
