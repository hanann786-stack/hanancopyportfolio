const steps = [
  { n: '01', time: 'Days 1–2', h: 'Discovery call', p: "We talk about your brand, offer, and the exact problem you need solved. No forms, no fluff — a 45-minute conversation that decides whether we're a fit." },
  { n: '02', time: 'Days 3–7', h: 'Research and strategy', p: 'I read your reviews, study your competitors, and interview your best customers. The copy is 80% research, 20% writing — this is where the leverage lives.' },
  { n: '03', time: 'Days 8–14', h: 'Writing and iteration', p: 'First draft, one round of edits, final version. Every line is defensible: I can tell you why a word is there and what happens if we remove it.' },
  { n: '04', time: 'Days 15–21', h: 'Launch and measure', p: "We ship, watch the numbers, and adjust. The work isn't done when the copy is delivered — it's done when the metric moves." },
];

const ProcessSection = () => (
  <section id="process" className="process">
    <h2 className="process-title">How it works</h2>
    <div className="process-timeline">
      <div className="process-line" />
      {steps.map((s) => (
        <div key={s.n} className="process-step">
          <div className="process-num-block">
            <div className="process-num">{s.n}</div>
            <div className="process-time">{s.time}</div>
          </div>
          <div className="process-content">
            <h3 className="process-h">{s.h}</h3>
            <p className="process-p">{s.p}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProcessSection;
