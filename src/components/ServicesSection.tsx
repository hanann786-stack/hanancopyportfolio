const services = [
  { n: '01', name: 'Email Marketing', desc: 'Welcome sequences, flows, and win-back campaigns built around one number: revenue per recipient.', price: 'From $800' },
  { n: '02', name: 'Landing Pages', desc: "Sales pages and product pages that turn a visitor's doubt into a purchase decision.", price: 'From $1,200' },
  { n: '03', name: 'Social Media Ads', desc: 'Hook-first ad copy for Meta and TikTok. Tested across DTC, fitness, and high-ticket offers.', price: 'From $600' },
  { n: '04', name: 'AI Email System Setup', desc: 'I write the strategy, build the Klaviyo flow, and hand you a live system — not a document.', price: 'From $1,500' },
  { n: '05', name: 'AI Brand Voice System', desc: 'A custom AI trained on your voice. Your team generates on-brand content in seconds.', price: 'From $1,200' },
];

const ServicesSection = () => (
  <section id="services" className="services">
    <div className="services-grid">
      <h2 className="services-heading">What I do</h2>
      <div className="services-list">
        {services.map((s) => (
          <div key={s.n} className="services-row">
            <div className="services-num">{s.n}</div>
            <div>
              <div className="services-name">{s.name}</div>
              <p className="services-desc">{s.desc}</p>
            </div>
            <div className="services-price">{s.price}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
