import { useEffect, useRef, useState } from 'react';

type Row = { number: string; name: string; price: string; description: string };

const rows: Row[] = [
  {
    number: '01',
    name: 'Email marketing',
    price: 'From $800 / sequence',
    description:
      'Welcome flows, abandoned cart, win-back. Built around one metric: revenue per recipient.',
  },
  {
    number: '02',
    name: 'Landing pages',
    price: 'From $1,200 / page',
    description:
      "Sales pages and VSL scripts that turn a visitor's doubt into a buyer's certainty.",
  },
  {
    number: '03',
    name: 'Social media ads',
    price: 'From $600 / campaign',
    description:
      'Hook-first ad copy that stops the scroll and pre-qualifies the click.',
  },
  {
    number: '04',
    name: 'AI email system setup',
    price: 'From $1,500 / system',
    description:
      'I write the strategy and copy, then build the live Klaviyo or ActiveCampaign system with AI tools.',
  },
  {
    number: '05',
    name: 'AI brand voice system',
    price: 'From $1,200 / system',
    description:
      'A custom GPT trained on your voice. Your team ships on-brand emails, ads, and content in seconds.',
  },
];

const OfferSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="offer-editorial">
      <h2 className="offer-editorial-title">Here is what I actually do.</h2>
      <div ref={ref} className={`offer-list ${visible ? 'is-visible' : ''}`}>
        {rows.map((r, i) => (
          <a
            key={r.number}
            href="#contact"
            data-clickable
            className="offer-row"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="offer-row-num" aria-hidden>{r.number}</span>
            <div className="offer-row-body">
              <div className="offer-row-head">
                <h3 className="offer-row-name">{r.name}</h3>
                <span className="offer-row-price">{r.price}</span>
              </div>
              <p className="offer-row-desc">{r.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default OfferSection;
