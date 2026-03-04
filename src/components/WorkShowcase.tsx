import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useCallback, memo, lazy, Suspense, MouseEvent, useEffect } from 'react';

export interface CaseStudy {
  type: string;
  name: string;
  headline: string;
  body: string[];
  statLine: string;
}

const CaseStudyModal = lazy(() => import('./CaseStudyModal'));

const caseStudies: CaseStudy[] = [
  {
    type: 'Email Campaign',
    name: 'SaaS Welcome Sequence',
    headline: 'You Had 7 Days to Lose Them Forever. We Used Every Single One.',
    body: [
      "Most SaaS welcome sequences do one thing: confirm the signup. Ours did something different — it made new users feel like they'd already made the best decision of their quarter.",
      "The problem: A growing SaaS brand was bleeding trial users in the first week. Sign-ups were strong. Activation? Dismal. Users were coming in curious and leaving confused.",
      "The insight: The first 7 days aren't an onboarding window. They're a trust window. People don't need more features explained — they need to feel smart for choosing you.",
      "What we built: A 6-email sequence engineered around one psychological principle: progressive commitment. Each email did one job and one job only. Email 1 made them feel welcomed. Email 2 made them feel capable. Email 3 made them feel like insiders. By Email 6, they weren't trial users anymore — they were believers.",
      "No fluff. No feature dumps. Just the right words, in the right order, at the right moment.",
      "The result wasn't an accident. It was architecture.",
    ],
    statLine: 'Open rate: 21% → 54% | Written from scratch | Zero paid promotion',
  },
  {
    type: 'Landing Page',
    name: 'DTC Brand Landing Page',
    headline: 'The Page That Turned Browsers Into Buyers — In Under 8 Seconds.',
    body: [
      "Eight seconds. That's how long a visitor decides whether your brand is worth their money or their back button.",
      "The problem: A direct-to-consumer brand had traffic. Good traffic. But their landing page was doing what most landing pages do — existing. It had a headline. A photo. A button. And a 2.1% conversion rate quietly bleeding their ad spend dry.",
      "The insight: People don't buy products. They buy the version of themselves that owns the product. The page wasn't selling the transformation — it was selling the transaction.",
      "What we rebuilt: Every element was interrogated. The headline was rewritten to sell the feeling, not the feature. The subheadline handled the objection before it formed. The social proof was restructured to trigger herd psychology. The CTA was rewritten from a command into an invitation.",
      "The page went from a catalog to a conversation.",
      "No new traffic. No new budget. Same product. Different words.",
    ],
    statLine: 'Conversion rate: 2.1% → 7.3% | Full page rewrite | Copy + structure overhaul',
  },
  {
    type: 'Social Media Ads',
    name: 'Fitness App Ad Campaign',
    headline: "Ads So Sharp, They Cut the Cost Before Anyone Even Clicked.",
    body: [
      "The fitness space is the loudest corner of the internet. Everyone's screaming the same thing in the same font with the same before-and-after. Standing out isn't a design problem — it's a copy problem.",
      "The problem: A fitness app was running ads that looked fine and performed terribly. High CPAs. Low relevance scores. The kind of numbers that make a media buyer sweat at 2am.",
      "The insight: The audience wasn't suffering from lack of motivation. They were suffering from lack of permission. They didn't need to be pushed — they needed to be understood.",
      "What we wrote: A full ad suite built on pattern interruption and identity-based messaging. Instead of \"get fit,\" we wrote to the person they were already trying to become. Instead of features, we wrote friction points. Instead of hype, we wrote honesty — and honesty, in a sea of six-pack promises, hits like a freight train.",
      "Three hooks. Three angles. One psychological thread running through all of them: you're closer than you think.",
      "The algorithm rewards relevance. We gave it something worth rewarding.",
    ],
    statLine: 'CPA cut by 62% in 30 days | Full ad copy suite | Hook testing across 3 audiences',
  },
  {
    type: 'Email Sequence',
    name: 'FinTech Onboarding Flow',
    headline: 'They Came for the App. They Stayed Because of This.',
    body: [
      "Churn in FinTech isn't a product problem. It's a confidence problem. People leave financial tools the same way they abandon gym memberships — not because the product failed them, but because they never felt capable enough to use it fully.",
      "The problem: A FinTech platform had strong acquisition numbers and an ugly churn rate. Users were activating, poking around, getting overwhelmed, and quietly disappearing. Support tickets were rising. Retention was falling. The product team kept shipping features. Nothing moved the needle.",
      "The insight: Every financial product asks users to trust it with something deeply personal — their money, their anxiety, their future. The onboarding sequence was treating them like users. It needed to treat them like people.",
      "What we built: A behavior-triggered email flow designed around reducing financial anxiety at every stage. Plain language where the product used jargon. Reassurance where the interface created doubt. Celebration emails when users hit micro-milestones — because in FinTech, small wins build the confidence that drives long-term retention.",
      "We didn't just onboard users. We made them feel like they finally had it together.",
      "Churn is expensive. The right words are not.",
    ],
    statLine: 'Churn reduced by 28% in Q1 | Full sequence rebuild | Behavior-triggered flow',
  },
  {
    type: 'Landing Page',
    name: 'Fashion Brand Launch',
    headline: "$127,000 in Launch Week. The Collection Hadn't Even Sold Out Yet.",
    body: [
      "A fashion launch is a one-shot moment. You don't get a second first impression. The page either creates desire or it creates doubt — and doubt in fashion is fatal.",
      "The problem: A fashion brand was launching their most ambitious collection to date. The creative was stunning. The product was exceptional. But the landing page read like a press release — cold, corporate, and completely disconnected from the world the brand was trying to sell.",
      "The insight: Fashion consumers don't buy clothes. They buy identity, belonging, and the feeling of being ahead of the moment. The page needed to feel like an invitation to something exclusive — not a product listing with a checkout button.",
      "What we created: A full-page narrative arc that opened with the vision, not the product. Copy that made the reader feel like they were discovering something, not being sold something. Scarcity baked into the language naturally. An urgency that came from desire, not desperation. Every word chosen to make the reader think: this is exactly who I want to be.",
      "The collection didn't go viral. The feeling did.",
      "Great copy doesn't sell the product. It sells the world the product lives in.",
    ],
    statLine: '$127K revenue in launch week | Full page copy | Zero discount strategy',
  },
  {
    type: 'Ad Copy + Landing Page',
    name: 'Coaching High-Ticket Funnel',
    headline: '47 Discovery Calls in 14 Days. No Discounts. No Desperation. Just Copy.',
    body: [
      "High-ticket coaching is the hardest thing to sell with words — and the easiest thing to destroy with the wrong ones. One phrase that sounds pushy and the prospect is gone. One sentence that sounds weak and the authority evaporates.",
      "The problem: A high-ticket coach had an offer that genuinely changed lives. Their results were real. Their clients were loyal. But their funnel was leaking — ad click-through was low, the landing page wasn't converting, and the calendar was too quiet for someone with this level of expertise.",
      "The insight: High-ticket buyers don't respond to pressure — they respond to certainty. They need to feel that the coach already understands their problem better than they do. The moment that happens, price becomes secondary.",
      "What we built: A two-part system — ad copy that qualified the right people before they clicked (so only serious buyers landed on the page), and a landing page built entirely around the psychology of certainty. No hype. No income claims. Just a mirror held up to the reader's exact situation, followed by the clearest articulation of transformation they'd ever read.",
      "The ads didn't just drive traffic. They did the first sales call for us.",
      "The calendar filled. The coach coached. The copy closed.",
    ],
    statLine: '47 discovery calls in 14 days | Ad copy + full funnel page | High-ticket positioning',
  },
];

const highlightStats = (text: string) => {
  const parts = text.split(/(\d+[\d.]*%?|\$[\d,]+K?)/g);
  return parts.map((part, i) =>
    /\d/.test(part) || /\$/.test(part) ? (
      <span key={i} className="text-gold font-semibold" style={{ textShadow: '0 0 20px rgba(201,168,76,0.4)' }}>{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const TiltCard = memo(({ study, index, onClick }: { study: CaseStudy; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  // CSS IntersectionObserver for entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay via setTimeout
          setTimeout(() => setVisible(true), index * 100);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  const teaser = study.body[0].length > 120 ? study.body[0].slice(0, 120) + '…' : study.body[0];

  return (
    <div
      ref={cardRef}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        onClick={onClick}
        style={{
          transform: `perspective(800px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
          willChange: 'transform',
        }}
        className="bg-glass-card border border-[hsla(43,52%,54%,0.18)] rounded-sm p-8 h-full group hover:border-primary/40 transition-colors duration-300 cursor-pointer"
        data-clickable
      >
        <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-3 block">
          {study.type}
        </span>
        <h3 className="font-display text-xl text-white-headline mb-3">{study.name}</h3>
        <p className="font-body text-cream text-sm mb-4 leading-relaxed opacity-70">
          {teaser}
        </p>
        <p className="font-body text-cream text-sm mb-6 leading-relaxed font-semibold">
          {highlightStats(study.statLine.split('|')[0].trim())}
        </p>
        <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold group-hover:text-gold-bright transition-colors">
          View →
        </span>
      </div>
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

const WorkShowcase = () => {
  const ref = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleCardClick = useCallback((study: CaseStudy, index: number) => {
    setActiveStudy(study);
    setActiveIndex(index);
  }, []);

  const handleClose = useCallback(() => setActiveStudy(null), []);

  return (
    <>
      <section id="work" className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-6">
          <span
            className="section-label block text-center mb-4 transition-opacity duration-500"
            style={{ opacity: headerVisible ? 1 : 0 }}
          >
            WORK
          </span>
          <h2
            ref={ref}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4 text-white-headline tracking-[-0.03em] transition-all duration-600 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            Copy That Actually{' '}
            <span className="text-gradient-gold">Did Something</span>
          </h2>
          <p
            className="text-muted-foreground text-center mb-16 font-body text-sm transition-opacity duration-500 delay-200"
            style={{ opacity: headerVisible ? 1 : 0 }}
          >
            Every project. One goal: make someone take action.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseStudies.map((s, i) => (
              <TiltCard key={s.name} study={s} index={i} onClick={() => handleCardClick(s, i)} />
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        {activeStudy && (
          <CaseStudyModal study={activeStudy} cardIndex={activeIndex} onClose={handleClose} />
        )}
      </Suspense>
    </>
  );
};

export default WorkShowcase;
