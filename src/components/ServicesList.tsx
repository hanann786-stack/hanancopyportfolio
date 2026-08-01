const services = [
  {
    name: 'Email Marketing',
    desc: 'Welcome sequences, abandoned cart flows, and win-back campaigns built around revenue per recipient.',
  },
  {
    name: 'Landing Pages',
    desc: "Sales pages, VSL scripts, and opt-in pages that turn a visitor's doubt into a buyer's certainty.",
  },
  {
    name: 'Social Media Ads',
    desc: 'Facebook, Instagram, and TikTok copy that stops the scroll and starts the sale.',
  },
  {
    name: 'AI Email System Setup',
    desc: 'Strategy and copy written by me, then built into your live Klaviyo or ActiveCampaign flows.',
  },
  {
    name: 'AI Brand Voice & Prompt System',
    desc: 'A custom GPT trained on your voice so your team writes on-brand copy in seconds.',
  },
];

const ServicesList = () => (
  <section id="services" className="section">
    <div className="wrap">
      <h2 className="section-title">Services</h2>
      <p className="section-sub">What I do, and what you get when I do it.</p>

      {services.map((s) => (
        <div key={s.name} className="service-row">
          <h3 className="service-name">{s.name}</h3>
          <p className="service-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ServicesList;
