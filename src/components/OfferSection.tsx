import { useEffect, useRef, useState } from 'react';

type Card = {
  number: string;
  name: string;
  tag: string;
  description: string;
  price: string;
  isNew?: boolean;
};

const coreCards: Card[] = [
  {
    number: '01',
    name: 'Email Marketing',
    tag: 'Core Service',
    description:
      'Welcome sequences, abandoned cart flows, win-back campaigns. Every email built around one metric: revenue per recipient.',
    price: 'From $800 / sequence',
  },
  {
    number: '02',
    name: 'Landing Pages',
    tag: 'Core Service',
    description:
      "Sales pages, VSL scripts, opt-in pages that turn a visitor's doubt into a buyer's certainty. Built on psychology, not guesswork.",
    price: 'From $1,200 / page',
  },
  {
    number: '03',
    name: 'Social Media Ads',
    tag: 'Core Service',
    description:
      'Facebook, Instagram, TikTok copy that stops the scroll and starts the sale. Hook-first. Tested across DTC, fitness, and high-ticket offers.',
    price: 'From $600 / campaign',
  },
];

const aiCards: Card[] = [
  {
    number: '04',
    name: 'AI Email System Setup',
    tag: 'NEW · AI Service',
    description:
      'I write the strategy and copy, then build your entire Klaviyo or ActiveCampaign flow using AI tools. You get a live, revenue-generating system — not just a Word doc.',
    price: 'From $1,500 / system',
    isNew: true,
  },
  {
    number: '05',
    name: 'AI Brand Voice & Prompt System',
    tag: 'NEW · AI Service',
    description:
      'A custom GPT trained on your brand voice. Your team generates on-brand emails, ads, and content in seconds — all sounding like you at your best.',
    price: 'From $1,200 / system',
    isNew: true,
  },
];

const ServiceCard = ({ card, index }: { card: Card; index: number }) => {
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`service-card${card.isNew ? ' service-card-ai' : ''}${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="service-card-accent" />
      <div className="service-card-top">
        <span className="service-card-number">{card.number}</span>
        <span className={`service-card-tag${card.isNew ? ' service-card-tag-ai' : ''}`}>
          {card.tag}
        </span>
      </div>
      <h3 className="service-card-name">{card.name}</h3>
      <p className="service-card-desc">{card.description}</p>
      <div className="service-card-price">{card.price}</div>
    </div>
  );
};

const OfferSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="services-section">
      <div ref={titleRef} className={`services-head${titleVisible ? ' is-visible' : ''}`}>
        <div className="services-eyebrow">
          <span className="services-eyebrow-line" />
          <span className="services-eyebrow-text">What I Do</span>
        </div>
        <h2 className="services-title">
          Three weapons. Two <span className="services-title-accent">AI systems</span>. Infinite results.
        </h2>
      </div>

      <div className="services-grid services-grid-core">
        {coreCards.map((c, i) => (
          <ServiceCard key={c.number} card={c} index={i} />
        ))}
      </div>

      <div className="services-grid services-grid-ai">
        {aiCards.map((c, i) => (
          <ServiceCard key={c.number} card={c} index={coreCards.length + i} />
        ))}
      </div>
    </section>
  );
};

export default OfferSection;
