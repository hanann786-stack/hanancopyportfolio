import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import type { CaseStudy } from './CaseStudyModal';

const CaseStudyModal = lazy(() => import('./CaseStudyModal'));

export type Metric = { value: number; suffix?: string; prefix?: string; label: string };

type Card = {
  tag: string;
  title: string;
  challenge: string;
  quote: string;
  metrics: Metric[];
  study: CaseStudy;
};

const cards: Card[] = [
  {
    tag: 'DTC',
    title: 'DTC Skincare — Welcome Sequence',
    challenge:
      'A fast-growing skincare brand had a list, but the welcome flow was a bland confirmation email. Subscribers landed, then ghosted. We rebuilt the sequence around story, ritual, and identity — five emails that turned a discount into a relationship.',
    quote:
      '"You didn\'t buy a serum. You picked a side in the most quietly radical thing women do — keeping their skin theirs."',
    metrics: [
      { value: 61, suffix: '%', label: 'Open Rate' },
      { value: 38, prefix: '$', suffix: 'K', label: 'Sequence Revenue' },
      { value: 5, suffix: '×', label: 'CTR vs. Old Flow' },
      { value: 14, suffix: ' days', label: 'Live to Revenue' },
    ],
    study: {
      type: 'DTC · Email',
      name: 'DTC Skincare Welcome Sequence',
      headline: 'A Welcome Flow That Turned First-Time Buyers Into Believers.',
      body: [
        'A direct-to-consumer skincare brand was acquiring well but losing the moment after checkout. The welcome flow read like a receipt. We rewrote it like a conversation with someone who finally felt seen.',
        'Five emails, each with a single emotional job: welcome, validate, ritualize, surprise, invite. By the final email, subscribers weren\'t just opening — they were forwarding.',
        'No new traffic. No new ad spend. Just a sequence that did what the product already deserved.',
      ],
      statLine: 'Open rate: 61% | Sequence revenue: $38K | 5× CTR vs. previous flow',
    },
  },
  {
    tag: 'SaaS',
    title: 'SaaS Landing Page — Activation Rewrite',
    challenge:
      'A B2B SaaS team had great traffic and a flat conversion rate. The page led with features. We led with the problem the buyer was already trying to solve at 11pm on a Tuesday. Same product, different page, completely different math.',
    quote:
      '"You don\'t need another dashboard. You need to stop being the person who has to check three of them."',
    metrics: [
      { value: 164, suffix: '%', label: 'Conversion Lift' },
      { value: 22, prefix: '$', suffix: 'K MRR', label: 'New MRR' },
      { value: 47, suffix: '%', label: 'Bounce Drop' },
      { value: 9, suffix: ' days', label: 'Test to Launch' },
    ],
    study: {
      type: 'SaaS · Landing Page',
      name: 'SaaS Activation Landing Page',
      headline: 'The Page That Quietly Doubled Their Activation Rate.',
      body: [
        'Strong traffic. Soft conversions. The page was a competent feature list pretending to be a landing page.',
        'We restructured it around the buyer\'s 11pm moment — the exact problem they were trying to solve when they searched. The headline named the pain, the subhead handled the doubt, and the proof block answered the price objection before it formed.',
        'Same product. Same audience. A page that finally spoke their language.',
      ],
      statLine: 'Conversion: +164% | New MRR: $22K | Bounce: -47%',
    },
  },
  {
    tag: 'Coaching',
    title: 'High-Ticket Coaching — Ad + Funnel',
    challenge:
      'A premium coach had a great offer and a quiet calendar. We built ad copy that pre-qualified the right buyer before the click, and a sales page that did the first half of the discovery call. Result: 11× ROAS and a fully booked month — without dropping the price.',
    quote:
      '"If you\'ve already coached yourself out of this twice, this isn\'t your third attempt. It\'s your last one."',
    metrics: [
      { value: 11, suffix: '× ROAS', label: 'Ad Spend Return' },
      { value: 91, prefix: '$', suffix: 'K', label: 'Booked Revenue' },
      { value: 47, label: 'Discovery Calls' },
      { value: 0, suffix: '%', label: 'Discounts Used' },
    ],
    study: {
      type: 'Coaching · Funnel',
      name: 'High-Ticket Coaching Funnel',
      headline: '11× ROAS On A Premium Offer — Without A Single Discount.',
      body: [
        'A high-ticket coach had real expertise and a calendar that didn\'t reflect it. The ads were getting clicks from the wrong people. The page was getting traffic from the right ones — and converting neither.',
        'We rewrote the ad suite to repel the wrong buyer and magnetize the right one, then rebuilt the page around certainty instead of hype. By the time a qualified prospect reached the calendar, half the sales call was already done.',
        'The calendar filled. The coach coached. The copy closed.',
      ],
      statLine: '11× ROAS | $91K booked | 47 discovery calls | 0% discounts',
    },
  },
];

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const Counter = ({ metric, start }: { metric: Metric; start: boolean }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setVal(metric.value * easeOutQuart(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, metric.value]);

  const display = Number.isInteger(metric.value) ? Math.round(val) : val.toFixed(1);
  return (
    <div className="cs-metric">
      <div className="cs-metric-num">
        {metric.prefix ?? ''}{display}{metric.suffix ?? ''}
      </div>
      <div className="cs-metric-label">{metric.label}</div>
    </div>
  );
};

const StudyCard = ({ card, onOpen, index }: { card: Card; onOpen: () => void; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const mirror = index % 2 === 1;
  const dir = index % 2 === 0 ? 'ed-from-left' : 'ed-from-right';
  return (
    <div
      ref={ref}
      className={`cs-card ed-enter ${dir}${mirror ? ' cs-card--mirror' : ''}${visible ? ' is-visible' : ''}`}
      onClick={onOpen}
      data-clickable
    >
      <div className="cs-left">
        <span className="cs-tag">{card.tag}</span>
        <h3 className="cs-title">{card.title}</h3>
        <p className="cs-challenge">{card.challenge}</p>
        <blockquote className="cs-quote">{card.quote}</blockquote>
      </div>
      <div className="cs-right">
        <div className="cs-metrics">
          {card.metrics.map((m) => (
            <Counter key={m.label} metric={m} start={visible} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CaseStudiesSection = () => {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);
  const [active, setActive] = useState<CaseStudy | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const open = useCallback((s: CaseStudy, i: number) => {
    setActive(s);
    setActiveIndex(i);
  }, []);

  return (
    <>
      <section id="work" className="cs-section">
        <div ref={headRef} className={`cs-head${headVisible ? ' is-visible' : ''}`}>
          <div className="services-eyebrow">
            <span className="services-eyebrow-line" />
            <span className="services-eyebrow-text">Case Studies</span>
          </div>
          <h2 className="cs-section-title">The work. The numbers.</h2>
          <p className="cs-section-sub">Real copy. Real results. No vanity metrics.</p>
        </div>

        <div className="cs-list">
          {cards.map((c, i) => (
            <StudyCard key={c.title} card={c} index={i} onOpen={() => open(c.study, i)} />
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
