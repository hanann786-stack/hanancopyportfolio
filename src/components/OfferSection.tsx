import { useRef, useState, useEffect } from 'react';

const offerings = [
  'Email sequences that feel like a conversation, not a broadcast',
  'Landing pages built on buyer psychology — not guesswork',
  'Social ads with hooks so sharp they stop mid-scroll',
  'A brand voice people remember at 2am',
  'Revisions until it converts — not just until it looks nice',
];

const OfferSection = () => {
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
    <section id="services" className="py-20 md:py-32 relative z-10 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <span
          className="section-label block text-center mb-4 transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          SERVICES
        </span>
        <h2
          ref={ref}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-12 md:mb-16 text-white-headline tracking-[-0.03em] transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          What Working With Hanan{' '}
          <span className="text-gradient-gold">Actually Gets You</span>
        </h2>

        <div
          className="max-w-2xl mx-auto bg-glass-card border border-[hsla(43,52%,54%,0.18)] rounded-sm p-8 md:p-14 relative overflow-hidden transition-all duration-600 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '0.2s',
          }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-primary/3 blur-3xl rounded-full" />

          <ul className="space-y-6 relative z-10">
            {offerings.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 font-body text-cream transition-all duration-500 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${0.4 + i * 0.1}s`,
                }}
              >
                <span className="text-gold text-lg mt-0.5">✦</span>
                <span className="text-base leading-relaxed">
                  {item.includes('psychology') ? (
                    <>
                      {item.split('psychology')[0]}
                      <span className="text-gold">psychology</span>
                      {item.split('psychology')[1]}
                    </>
                  ) : item}
                </span>
              </li>
            ))}
          </ul>

          <p
            className="mt-10 pt-8 border-t border-[hsla(43,52%,54%,0.18)] font-display text-center italic text-lg md:text-xl transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '1s' }}
          >
            <span className="text-cream">This isn't a service. It's your </span>
            <span className="text-gold">unfair advantage</span>
            <span className="text-cream">.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
