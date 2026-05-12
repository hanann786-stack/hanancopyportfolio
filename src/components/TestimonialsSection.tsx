import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    quote: "He didn't just write copy. He rewired how we talk to our customers. Conversions jumped 3.2x in 60 days.",
    name: 'Sarah Chen',
    role: 'CMO, Velostra',
    badge: '3.2× conversions',
  },
  {
    quote: "Our email open rate went from 18% to 47%. I didn't think that was possible without changing our entire list.",
    name: 'Marcus Webb',
    role: 'Founder, NovaBrand',
    badge: '47% open rate',
  },
  {
    quote: "He writes like he's inside your customer's head. It's unsettling — and incredibly effective.",
    name: 'Elena Rossi',
    role: 'Head of Growth, Arcline',
    badge: '2.4× CTR',
  },
  {
    quote: "The AI brand voice system Hanan built saved my team 15 hours a week. Our content finally sounds consistent — and on-brand.",
    name: 'David Park',
    role: 'CEO, Lumenar',
    badge: '15 hrs/week saved',
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="clients" className="testi-section">
      <div className="testi-head">
        <span className="testi-eyebrow"><i /> Testimonials</span>
        <h2 className="testi-title">What clients actually say.</h2>
      </div>
      <div ref={ref} className="testi-grid">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="testi-card"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">"{t.quote}"</p>
            <div className="testi-meta">
              <div>
                <p className="testi-name">{t.name}</p>
                <p className="testi-role">{t.role}</p>
              </div>
              <span className="testi-badge"><b>↑</b>{t.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
