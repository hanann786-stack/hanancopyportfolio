import { useReveal } from '@/hooks/use-reveal';

const cards = [
  {
    brand: 'The Shea Parlor',
    before: 'Ice Cream-Inspired Skincare That Truly Treat Your Skin!',
    after: 'Skincare That Smells Like Dessert. Works Like a Treatment.',
    note: 'Replaced vague filler language with a dual promise: sensory appeal plus functional proof.',
  },
  {
    brand: 'Generic Fitness Coach',
    before: 'I help busy professionals get fit with personalized workout plans.',
    after:
      'You have watched the videos. You know what to do. So why has nothing changed yet? Because knowing and doing are two different things, and I am the person who closes that gap.',
    note: "Opened a psychological loop using the reader's own internal dialogue against their hesitation.",
  },
  {
    brand: 'DTC Haircare Brand',
    before: 'Natural ingredients for healthy, beautiful hair.',
    after:
      'Most haircare brands are built in boardrooms by people who have never actually struggled to find a formula that works for their hair. This one was built differently, out of frustration, by someone who knew there had to be a better way.',
    note: 'Replaced generic benefit language with an origin story that creates instant differentiation.',
  },
];

const PracticeWork = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="practice" className="section">
      <div className="wrap" ref={ref}>
        <h2 className="section-title reveal-up" data-reveal>
          Practice Copy: Real Rewrites
        </h2>
        <p className="section-sub reveal-up" data-reveal>
          These are unsolicited rewrites I wrote for real brands to show what better copy looks like.
          No client relationship, just proof of skill.
        </p>

        {cards.map((c, i) => (
          <article
            key={c.brand}
            className="practice-card reveal-up-lg"
            data-reveal
            style={{ '--d': `${i * 0.15}s` } as React.CSSProperties}
          >
            <h3 className="practice-brand">{c.brand}</h3>

            <div className="copy-block before">
              <div className="copy-label">Before</div>
              <p>{c.before}</p>
            </div>

            <div className="rewrite-divider" aria-hidden>
              <span>Rewrite</span>
            </div>

            <div className="copy-block after">
              <div className="copy-label">After</div>
              <p>{c.after}</p>
            </div>

            <p className="practice-note">{c.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PracticeWork;
