import { useEffect, useRef, useState } from 'react';

const ManifestoSection = () => {
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
    <section id="manifesto" className="manifesto-section">
      <div
        ref={ref}
        className="manifesto-grid"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="manifesto-quote-wrap">
          <blockquote className="manifesto-quote">
            "Most brands are shouting into a void. The ones that win have learned when to speak — and when the silence does all the work."
          </blockquote>
          <p className="manifesto-attr">— Hanan Arif</p>
        </div>
        <div className="manifesto-body">
          <p>
            I'm Hanan Arif, a conversion copywriter who builds words that move money. For six years I've written for skincare, SaaS, fintech, fashion, coaching, and fitness brands — and the lesson is always the same: the best product doesn't win, the clearest message does.
          </p>
          <p>
            My obsession isn't writing. It's the psychology underneath it — what makes a stranger stop scrolling, trust a brand they've never heard of, and pull out a card. Every email, page, and ad I write is reverse-engineered from that moment.
          </p>
          <p>
            I work lean and direct. No bloated decks, no jargon, no copy that sounds like a committee wrote it. You get sharp strategy, words that punch, and AI systems your team can keep running long after I'm done.
          </p>
          <p>
            If you're tired of "nice copy" that doesn't convert, you're in the right place. I don't write copy. I write revenue.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
