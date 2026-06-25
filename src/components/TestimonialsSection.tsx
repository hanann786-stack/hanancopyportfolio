import { useEffect, useRef, useState } from 'react';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  badge: string;
  metric?: { value: string; label: string };
};

const testimonials: Testimonial[] = [
  {
    quote:
      "It feels like you write as if you're inside the customer's head. At first it's a bit unsettling, but in the best way — because it shows how deeply you understand the audience. And more importantly, it actually works. The messaging was clear, engaging, and very well aligned with what I was hoping to achieve.",
    name: 'Elena Rossi',
    role: 'Email Client',
    badge: 'Highly recommended · Would work again',
  },
  {
    quote:
      "Our email open rate jumped from 18% to 47%. I honestly didn't expect that without changing our whole list. Really impressed with the results. Let's work on something even bigger next time.",
    name: 'Marcus Webb',
    role: 'Email Marketing Client',
    badge: 'Open rate: 18% → 47%',
    metric: { value: '18% → 47%', label: 'Email open rate' },
  },
  {
    quote:
      "This wasn't just copywriting. It genuinely changed how we communicate with our customers. The feedback we got was incredible. We saw conversions jump 3.2× in just 60 days.",
    name: 'Sarah Chen',
    role: 'E-commerce Brand Owner',
    badge: '3.2× conversions in 60 days',
    metric: { value: '3.2×', label: 'Conversions in 60 days' },
  },
  {
    quote:
      "The quality genuinely impressed me. Design was clean, professional, and perfectly aligned with my brand — in some aspects even better than I expected. What stood out most was the attention to detail and perfect content alignment. Communication was smooth, revisions were handled quickly, and everything was delivered on time.",
    name: 'Tripta Sports',
    role: 'Sports Brand (Pakistan)',
    badge: 'On-time · Perfect brand alignment',
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="clients" className="testi-section" data-reveal>
      <div className="testi-head">
        <span className="testi-eyebrow"><i /> Client Results</span>
        <h2 className="testi-title">Don't take my word for it.</h2>
        <p className="testi-sub">Real feedback from real clients. Unedited.</p>
      </div>
      <div ref={ref} className="testi-grid testi-grid--asym">
        {testimonials.map((t, i) => {
          const dir = ['ed-from-top', 'ed-from-bottom', 'ed-from-top', 'ed-from-bottom'][i];
          return (
            <article
              key={t.name}
              className={`testi-card ed-enter ${dir} ${visible ? 'is-visible' : ''}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="testi-top">
                <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <span className="testi-verified">
                  <span className="testi-verified-check">✓</span> Real screenshot
                </span>
              </div>

              {t.metric && (
                <div className="testi-metric">
                  <span className="testi-metric-value">{t.metric.value}</span>
                  <span className="testi-metric-label">{t.metric.label}</span>
                </div>
              )}

              <p className="testi-quote">"{t.quote}"</p>

              <div className="testi-divider" />

              <div className="testi-meta">
                <div>
                  <p className="testi-name">{t.name}</p>
                  <p className="testi-role">{t.role}</p>
                </div>
                <span className="testi-badge"><b>↑</b>{t.badge}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TestimonialsSection;
