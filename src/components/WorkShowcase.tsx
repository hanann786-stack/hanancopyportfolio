import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import type { CaseStudy } from './CaseStudyModal';

const CaseStudyModal = lazy(() => import('./CaseStudyModal'));

export type Metric = { value: number; suffix?: string; prefix?: string; label: string };

type Card = {
  n: string;
  tag: string;
  title: string;
  challenge: string;
  quote: string;
  metrics: Metric[];
  study: CaseStudy;
};

const cards: Card[] = [
  {
    n: '01',
    tag: 'DTC skincare',
    title: 'A welcome sequence that turned first-time buyers into believers.',
    challenge:
      'A fast-growing skincare brand had a list, but the welcome flow was a bland receipt. Subscribers landed, then ghosted. We rebuilt the sequence around story, ritual, and identity.',
    quote:
      'You didn\'t buy a serum. You picked a side in the most quietly radical thing women do, keeping their skin theirs.',
    metrics: [
      { value: 61, suffix: '%', label: 'Open rate' },
      { value: 38, prefix: '$', suffix: 'K', label: 'Sequence revenue' },
      { value: 5, suffix: '×', label: 'CTR vs. old flow' },
      { value: 14, suffix: ' days', label: 'Live to revenue' },
    ],
    study: {
      type: 'DTC · Email',
      name: 'DTC Skincare Welcome Sequence',
      headline: 'A welcome flow that turned first-time buyers into believers.',
      body: [
        'A direct-to-consumer skincare brand was acquiring well but losing the moment after checkout. The welcome flow read like a receipt. We rewrote it like a conversation with someone who finally felt seen.',
        'Five emails, each with a single emotional job: welcome, validate, ritualize, surprise, invite.',
        'No new traffic. No new ad spend. Just a sequence that did what the product already deserved.',
      ],
      statLine: 'Open rate 61% | Sequence revenue $38K | 5× CTR',
    },
  },
  {
    n: '02',
    tag: 'B2B SaaS',
    title: 'The page that quietly doubled their activation rate.',
    challenge:
      'Strong traffic, soft conversions. The page was a competent feature list pretending to be a landing page. We led with the problem the buyer was already trying to solve at 11pm.',
    quote:
      'You don\'t need another dashboard. You need to stop being the person who has to check three of them.',
    metrics: [
      { value: 164, suffix: '%', label: 'Conversion lift' },
      { value: 22, prefix: '$', suffix: 'K MRR', label: 'New MRR' },
      { value: 47, suffix: '%', label: 'Bounce drop' },
      { value: 9, suffix: ' days', label: 'Test to launch' },
    ],
    study: {
      type: 'SaaS · Landing Page',
      name: 'SaaS Activation Landing Page',
      headline: 'The page that quietly doubled their activation rate.',
      body: [
        'Strong traffic. Soft conversions. The page was a competent feature list pretending to be a landing page.',
        'We restructured it around the buyer\'s 11pm moment. The headline named the pain, the subhead handled the doubt, and the proof block answered price before it was raised.',
        'Same product. Same audience. A page that finally spoke their language.',
      ],
      statLine: 'Conversion +164% | New MRR $22K | Bounce -47%',
    },
  },
  {
    n: '03',
    tag: 'High-ticket coaching',
    title: '11× ROAS on a premium offer, without a single discount.',
    challenge:
      'A premium coach had a great offer and a quiet calendar. We built ad copy that pre-qualified the right buyer before the click, and a sales page that did the first half of the discovery call.',
    quote:
      'If you have already coached yourself out of this twice, this is not your third attempt. It is your last one.',
    metrics: [
      { value: 11, suffix: '× ROAS', label: 'Ad spend return' },
      { value: 91, prefix: '$', suffix: 'K', label: 'Booked revenue' },
      { value: 47, label: 'Discovery calls' },
      { value: 0, suffix: '%', label: 'Discounts used' },
    ],
    study: {
      type: 'Coaching · Funnel',
      name: 'High-Ticket Coaching Funnel',
      headline: '11× ROAS on a premium offer, without a single discount.',
      body: [
        'A high-ticket coach had real expertise and a calendar that did not reflect it.',
        'We rewrote the ad suite to repel the wrong buyer and magnetize the right one, then rebuilt the page around certainty instead of hype.',
        'The calendar filled. The coach coached. The copy closed.',
      ],
      statLine: '11× ROAS | $91K booked | 47 discovery calls | 0% discounts',
    },
  },
];

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const Counter = ({ metric, start, delay }: { metric: Metric; start: boolean; delay: number }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const timeoutId = window.setTimeout(() => {
      const duration = 1500;
      const t0 = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        setVal(metric.value * easeOutQuart(p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delay);
    return () => window.clearTimeout(timeoutId);
  }, [start, metric.value, delay]);

  const display = Number.isInteger(metric.value) ? Math.round(val) : val.toFixed(1);
  return (
    <div className="cs-stack-metric">
      <div className="cs-stack-metric-num">
        {metric.prefix ?? ''}{display}{metric.suffix ?? ''}
      </div>
      <div className="cs-stack-metric-label">{metric.label}</div>
    </div>
  );
};

const delays = [0, 180, 90, 260];

const StudyBlock = ({ card, onOpen }: { card: Card; onOpen: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article ref={ref} className={`cs-stack-block ${visible ? 'is-visible' : ''}`} onClick={onOpen} data-clickable>
      <div className="cs-stack-left">
        <span className="cs-stack-num">{card.n}</span>
        <span className="cs-stack-tag">{card.tag}</span>
        <h3 className="cs-stack-title">{card.title}</h3>
        <p className="cs-stack-challenge">{card.challenge}</p>
      </div>
      <div className="cs-stack-right">
        {card.metrics.map((m, i) => (
          <div key={m.label} className={`cs-stack-metric-slot cs-stack-metric-slot-${i + 1}`}>
            <Counter metric={m} start={visible} delay={delays[i] ?? 0} />
          </div>
        ))}
      </div>
      <blockquote className="cs-stack-quote">{card.quote}</blockquote>
    </article>
  );
};

const CaseStudiesSection = () => {
  const [active, setActive] = useState<CaseStudy | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const open = useCallback((s: CaseStudy, i: number) => {
    setActive(s);
    setActiveIndex(i);
  }, []);

  return (
    <>
      <section id="work" className="cs-stack-section">
        <div className="cs-stack-head">
          <span className="cs-stack-eyebrow">People I have worked with</span>
          <h2 className="cs-stack-heading">Work I have done.</h2>
        </div>
        <div className="cs-stack-list">
          {cards.map((c, i) => (
            <StudyBlock key={c.title} card={c} onOpen={() => open(c.study, i)} />
          ))}
        </div>
      </section>

      <Suspense fallback={null}>
        {active && (
          <CaseStudyModal study={active} cardIndex={activeIndex} onClose={() => setActive(null)} />
        )}
      </Suspense>
    </>
  );
};

export default CaseStudiesSection;
