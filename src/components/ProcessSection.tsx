import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    n: '01',
    title: 'Discovery',
    desc: 'Deep-dive into your brand, audience, offer, and current funnel. We surface the real bottleneck — not the obvious one.',
    time: 'Days 1–2',
  },
  {
    n: '02',
    title: 'Strategy',
    desc: 'Messaging architecture, hooks, and angles mapped to buyer psychology. You approve the direction before a word is written.',
    time: 'Days 3–4',
  },
  {
    n: '03',
    title: 'Copy Delivery',
    desc: 'Final copy delivered, structured for plug-and-play. Includes variations for testing and notes for your designer or dev.',
    time: 'Days 5–10',
  },
  {
    n: '04',
    title: 'Optimize',
    desc: 'Post-launch review of performance data. We refine subject lines, headlines, and CTAs based on what your audience actually does.',
    time: 'Post-launch',
  },
];

const ProcessSection = () => {
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
    <section id="process" className="process-section">
      <div className="process-head">
        <span className="process-eyebrow"><i /> How We Work</span>
        <h2 className="process-title">A clear path from brief to revenue.</h2>
      </div>
      <div ref={ref} className="process-block process-block--zigzag">
        {steps.map((s, i) => {
          const down = i % 2 === 1;
          const dir = ['ed-from-left', 'ed-from-top', 'ed-from-right', 'ed-from-bottom'][i];
          return (
            <div
              key={s.n}
              className={`process-step ed-enter ${dir} ${down ? 'process-step--down' : ''} ${visible ? 'is-visible' : ''}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span className="process-step-bg-num">{s.n}</span>
              <div className="process-step-dot">{s.n}</div>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-desc">{s.desc}</p>
              <span className="process-step-time">{s.time}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcessSection;
