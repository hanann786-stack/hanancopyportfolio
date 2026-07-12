const cards = [
  {
    tag: 'DTC Skincare',
    title: 'Welcome Sequence That Converted Without Discounting',
    challenge:
      'A skincare brand hitting a wall on paid — new subscribers weren\'t buying without a first-order coupon. I rewrote the welcome flow to lead with a diagnostic story instead of a discount.',
    num: '61%',
    label: 'open rate · 4.1× conversion lift · $38K in 90 days',
    quote: '"Your skin has been lying to you..."',
  },
  {
    tag: 'SaaS',
    title: 'Trial-to-Paid Page That Doubled Conversions',
    challenge:
      'A B2B SaaS with strong signups and weak upgrades. The trial page sold features. I rebuilt it around the cost of not upgrading — and the free-to-paid rate more than doubled.',
    num: '2.8% → 7.4%',
    label: 'free-to-paid rate · +$22K MRR added',
    quote: '"You\'re not paying for software..."',
  },
  {
    tag: 'High-Ticket Coaching',
    title: 'Ad Funnel That Made 3 Previous Copywriters Look Bad',
    challenge:
      'A coach who\'d burned $40K across three prior copywriters. I stripped the funnel to one angle, one promise, one story. Cost per lead dropped, ROAS jumped, and the client stopped answering old agencies\' emails.',
    num: '11× ROAS',
    label: '$91K revenue in 60 days · $4.20 cost per lead',
    quote: '"If your business needs you to survive..."',
  },
];

const WorkSection = () => (
  <section id="work" className="work">
    <h2 className="work-title">What I did for Clients&nbsp;</h2>
    <div className="work-scroll">
      {cards.map((c) => (
        <article key={c.title} className="work-card">
          <div>
            <div className="work-tag">{c.tag}</div>
            <h3 className="work-title-card">{c.title}</h3>
          </div>
          <p className="work-challenge">{c.challenge}</p>
          <div>
            <span className="work-num">{c.num}</span>
            <span className="work-label">{c.label}</span>
            <p className="work-quote">{c.quote}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default WorkSection;
