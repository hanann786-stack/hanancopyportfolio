const steps = [
  { n: '01', title: 'Discovery', desc: 'Deep-dive into your brand, offer, and funnel. We find the real bottleneck.' },
  { n: '02', title: 'Strategy', desc: 'Messaging architecture and hooks mapped to buyer psychology. You approve before a word is written.' },
  { n: '03', title: 'Copy delivery', desc: 'Final copy, plug-and-play. Variations included for testing.' },
  { n: '04', title: 'Optimize', desc: 'Post-launch review. Subject lines, headlines, CTAs refined on data.' },
];

const ProcessSection = () => {
  return (
    <section id="process" className="process-diagonal">
      <h2 className="process-diagonal-title">How I work.</h2>
      <div className="process-diagonal-wrap">
        <span className="process-diagonal-line" aria-hidden />
        {steps.map((s, i) => (
          <div key={s.n} className="process-diagonal-step" style={{ ['--i' as string]: i }}>
            <span className="process-diagonal-num">{s.n}</span>
            <h3 className="process-diagonal-name">{s.title}</h3>
            <p className="process-diagonal-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
