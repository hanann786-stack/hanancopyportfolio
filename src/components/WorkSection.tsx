const cards = [
  {
    tag: 'DTC Skincare · Email Sequence',
    title: '5-Email Welcome Flow That Turned Subscribers Into Buyers',
    challenge:
      'The brand had 12,000 subscribers and a 1.2% conversion rate on their default Klaviyo flow. They needed a sequence that educated, built desire, and converted — without discounting.',
    metrics: [
      { n: 61, suffix: '%', label: 'Avg Open Rate' },
      { n: 14, suffix: '%', label: 'Click-Through Rate' },
      { n: 4.1, suffix: '×', label: 'Conversion Lift', decimals: 1 },
      { n: 38, prefix: '$', suffix: 'K', label: '90-Day Revenue' },
    ],
    quote:
      '"Your skin has been lying to you. Not about how it looks — about what it needs. Here\'s what 94% of skincare brands will never tell you…"',
  },
  {
    tag: 'SaaS · Landing Page',
    title: 'Trial-to-Paid Page Rewrite for B2B Productivity Tool',
    challenge:
      'Their original trial page had a 2.8% free-to-paid conversion rate. The copy led with features. It needed to lead with the cost of the problem.',
    metrics: [
      { n: 2.8, suffix: '%', label: 'Conversion Before', decimals: 1 },
      { n: 7.4, suffix: '%', label: 'Conversion After', decimals: 1 },
      { n: 164, suffix: '%', label: 'Increase' },
      { n: 22, prefix: '$', suffix: 'K', label: 'MRR Added' },
    ],
    quote:
      '"You\'re not paying for software. You\'re paying to stop losing 11 hours a week to work that a machine should be doing."',
  },
  {
    tag: 'High-Ticket Coaching · Ad Campaign',
    title: 'Facebook Ad Funnel for $5K Business Coaching Offer',
    challenge:
      'Three previous copywriters had tried. Ads were burning budget. The copy was speaking to a dream without creating belief. It needed pattern interrupts and identity-level hooks.',
    metrics: [
      { n: 4.2, prefix: '$', label: 'Cost Per Lead', decimals: 2 },
      { n: 11, suffix: '×', label: 'ROAS' },
      { n: 23, suffix: '%', label: 'VSL Watch Rate' },
      { n: 91, prefix: '$', suffix: 'K', label: 'Revenue in 60 Days' },
    ],
    quote:
      '"If your business still needs you to survive, you don\'t own a business. You own a job with extra stress."',
  },
];

const formatMetric = (m: any) => {
  const val = m.decimals ? m.n.toFixed(m.decimals) : String(m.n);
  return `${m.prefix || ''}${val}${m.suffix || ''}`;
};

const WorkSection = () => (
  <section id="work" className="work">
    <h2 className="work-title">What I did for Clients</h2>
    <div className="work-scroll-container">
      <div className="work-scroll">
        {cards.map((c) => (
          <article key={c.title} className="work-card">
            <div>
              <div className="work-tag">{c.tag}</div>
              <h3 className="work-title-card">{c.title}</h3>
            </div>
            <p className="work-challenge">{c.challenge}</p>
            <div className="work-metrics">
              {c.metrics.map((m) => {
                const target = m.decimals ? m.n.toFixed(m.decimals) : String(m.n);
                return (
                  <div key={m.label} className="work-metric">
                    <span
                      className="work-num"
                      data-count-to={target}
                      data-prefix={m.prefix || ''}
                      data-suffix={m.suffix || ''}
                      data-decimals={m.decimals || 0}
                    >
                      {formatMetric(m)}
                    </span>
                    <span className="work-label">{m.label}</span>
                  </div>
                );
              })}
            </div>
            <p className="work-quote">{c.quote}</p>
          </article>
        ))}
      </div>
      <div className="work-scroll-hint">← Drag to explore →</div>
    </div>
  </section>
);

export default WorkSection;
