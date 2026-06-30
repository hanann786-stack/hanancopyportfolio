import { useEffect, useRef, useState } from 'react';
import elenaImg from '@/assets/testimonial-elena-rossi.jpeg.asset.json';
import marcusImg from '@/assets/testimonial-marcus-webb.jpeg.asset.json';
import sarahImg from '@/assets/testimonial-sarah-chen.jpeg.asset.json';
import triptaImg from '@/assets/testimonial-tripta-sports.jpeg.asset.json';

type Item = {
  name: string;
  src: string;
  alt: string;
  source: 'Email' | 'WhatsApp';
  dir: string;
};

const items: Item[] = [
  {
    name: 'Elena Rossi',
    src: elenaImg.url,
    alt: 'Client testimonial from Elena Rossi',
    source: 'Email',
    dir: 'ed-from-top',
  },
  {
    name: 'Marcus Webb',
    src: marcusImg.url,
    alt: 'Client testimonial from Marcus Webb - 18% to 47% open rate increase',
    source: 'Email',
    dir: 'ed-from-right',
  },
  {
    name: 'Sarah Chen',
    src: sarahImg.url,
    alt: 'Client testimonial from Sarah Chen - 3.2x conversion increase',
    source: 'Email',
    dir: 'ed-from-left',
  },
  {
    name: 'Tripta Sports',
    src: triptaImg.url,
    alt: 'Client testimonial from Tripta Sports',
    source: 'WhatsApp',
    dir: 'ed-from-bottom',
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
    <section id="clients" className="testi-section testi-proof" data-reveal>
      <div className="testi-head">
        <span className="testi-eyebrow"><i /> Client Results</span>
        <h2 className="testi-title">Don't take my word for it.</h2>
        <p
          className="testi-sub"
          style={{ fontStyle: 'italic', fontSize: '14px', opacity: 0.7 }}
        >
          Real feedback. Real screenshots. Unedited.
        </p>
      </div>

      <div ref={ref} className="testi-proof-grid">
        {items.map((t, i) => (
          <article
            key={t.name}
            className={`testi-proof-card ed-enter ${t.dir} ${visible ? 'is-visible' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="testi-proof-verified">✓ Verified</span>

            <div className="testi-proof-imgwrap">
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="testi-proof-img"
              />
            </div>

            <div className="testi-proof-divider" />

            <div className="testi-proof-attr">
              <span className="testi-proof-name">{t.name}</span>
              <span className="testi-proof-tag">
                <span aria-hidden>{t.source === 'Email' ? '✉' : '💬'}</span>
                {t.source}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
