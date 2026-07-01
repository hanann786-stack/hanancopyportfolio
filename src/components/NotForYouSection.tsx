import { useEffect, useRef, useState } from 'react';

const forYou = [
  'You have a product that works and want copy to scale it aggressively',
  'You understand great copy is an investment, not a cost',
  'You value strategy over surface-level pretty words',
  'You want measurable results: opens, clicks, conversions, revenue',
  "You're building a brand with a decade-long horizon",
];

const notForYou = [
  "You're looking for $50 blog posts or SEO filler content",
  'You want "nice words" without caring about metrics',
  'You expect free spec work or endless revision rounds',
  "You're not ready to brief clearly or trust the process",
  "You think copy doesn't matter — nothing I write will help",
];

const NotForYouSection = () => {
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
    <section className="nfy-section">
      <div
        ref={ref}
        className="nfy-inner"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="nfy-head">
          <h2 className="nfy-title">Who I work best with.</h2>
          <p className="nfy-sub">
            Honest filters save us both time. Read these before you book.
          </p>
        </div>

        <div className="nfy-grid">
          <div className="nfy-col">
            <h3 className="nfy-col-title nfy-col-title--for">This IS for you if…</h3>
            <ul className="nfy-list">
              {forYou.map((t) => (
                <li key={t} className="nfy-item nfy-item--for">
                  <span className="nfy-dot nfy-dot--for" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="nfy-col">
            <h3 className="nfy-col-title nfy-col-title--not">This is NOT for you if…</h3>
            <ul className="nfy-list">
              {notForYou.map((t) => (
                <li key={t} className="nfy-item nfy-item--not">
                  <span className="nfy-dot nfy-dot--not" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotForYouSection;
