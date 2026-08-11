import { useState, type ReactNode, type CSSProperties } from 'react';
import { useReveal } from '@/hooks/use-reveal';

type Tab = {
  id: string;
  label: string;
  title: string;
  before: ReactNode;
  after: ReactNode;
};

const tabs: Tab[] = [
  {
    id: 'email',
    label: 'Email',
    title: 'Welcome Email Rewrite',
    before: (
      <>
        <p className="meta">Subject: Welcome to [Brand]!</p>
        <p>
          "Hi [First Name], welcome to our store! We're so excited to have you here. Browse our
          latest collection and use code WELCOME10 for 10% off your first order. Happy shopping!"
        </p>
      </>
    ),
    after: (
      <>
        <p className="meta">
          Subject: they tested 30 braiding hair brands. only one passed.
        </p>
        <p className="meta">Preview: that one was us.</p>
        <p>
          You just made the switch most people do not know they need to make. 30 braiding hair
          brands were independently tested for heavy metals: lead, mercury, cadmium. 29 failed. You
          are holding the one that did not.
        </p>
        <p>
          [Founder name] did not start this brand with a business plan. She started it after her own
          allergic reaction, and a deep dive into what was actually in the hair she had been using
          her whole life.
        </p>
        <p>
          Over the next few days we will show you what the other 29 brands do not want you to
          Google. For now, welcome. You made the right call.
        </p>
        <p>
          P.S. Your 10% off code is LOYALTY10. Read what we send you this week first, then you will
          know exactly what you are saving on.
        </p>
      </>
    ),
  },
  {
    id: 'landing',
    label: 'Landing Page',
    title: 'Hero Section Rewrite',
    before: (
      <p>
        "Shop our collection of premium skincare products. Made with natural ingredients for glowing
        skin."
      </p>
    ),
    after: (
      <>
        <p className="lede">The Skincare Formula the Big Brands Still Have Not Figured Out.</p>
        <p>Small-batch. Real ingredients. Made by someone who needed it as badly as you do.</p>
        <p>
          Most skincare products are designed for a boardroom presentation, not a bathroom shelf.
          Every formula here is small-batch, ingredient-honest, and made for skin that mass-market
          brands still treat as a niche. This is not the secret they want you to find. That is
          exactly why you should.
        </p>
        <p className="cta-line">Shop the collection →</p>
      </>
    ),
  },
  {
    id: 'product',
    label: 'Product Description',
    title: 'Before/After Product Copy',
    before: (
      <p>
        "Whipped body butter. Deeply moisturizing. Leaves skin feeling soft and smooth. Made with
        natural ingredients."
      </p>
    ),
    after: (
      <>
        <p>
          Close your eyes. That is warm vanilla extract whipped into raw shea butter, melting into
          your skin like the first bite of something made from scratch. Your skin does not just
          absorb it, it drinks it up. And hours later, when you catch a warm sweet drift from your
          own skin, you will understand why people reorder before the jar is half empty.
        </p>
        <p className="meta">Best for: dry skin, post-shower ritual, bedtime indulgence.</p>
        <p className="cta-line">Add to cart →</p>
      </>
    ),
  },
  {
    id: 'ad',
    label: 'Ad Copy',
    title: 'Facebook/Instagram Ad Rewrite',
    before: (
      <p>"Check out our new collection! Limited time offer, 20% off all products. Shop now!"</p>
    ),
    after: (
      <>
        <p className="lede">Your CPA dropped 62% when we changed one thing.</p>
        <p>
          Not the audience. Not the budget. Not the creative. Just the copy. Same ad. Same
          targeting. Different words.
        </p>
        <p>
          Here is what we changed: we stopped selling the product and started selling the feeling of
          owning it. "Fast car" converts better than "0-60 in 3.1 seconds." "Feel like yourself
          again" converts better than "natural ingredients." Words are the lever. We pull it.
        </p>
        <p className="cta-line">See the full case study →</p>
      </>
    ),
  },
];

const WorkSamples = () => {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="work" className="section">
      <div className="wrap" ref={ref}>
        <h2 className="section-title reveal-up" data-reveal>
          Work Samples
        </h2>
        <p className="section-sub reveal-up" data-reveal>
          Real copy, side by side with what it replaced. Read the whole thing, that is the point.
        </p>

        <div className="tabs" role="tablist" aria-label="Work samples">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={t.id === active}
              className="tab reveal-left"
              data-reveal
              style={{ '--d': `${i * 0.08}s` } as CSSProperties}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" key={tab.id} className="tab-panel">
          <h3 className="panel-title">{tab.title}</h3>

          <div className="copy-block before">
            <div className="copy-label">Before</div>
            {tab.before}
          </div>

          <div className="copy-block after">
            <div className="copy-label">After</div>
            {tab.after}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSamples;
