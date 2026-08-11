import CountUp from '@/components/CountUp';
import { useReveal } from '@/hooks/use-reveal';

const results = [
  {
    num: '62%',
    label: 'Drop in CPA, Fitness Ad Campaign',
    note: 'Fitness coaching brand · Facebook ads · 30 days',
  },
  {
    num: '4.1% → 7.3%',
    label: 'CVR on a DTC Fashion Landing Page',
    note: 'DTC fashion landing page rewrite',
  },
  {
    num: '34%',
    label: 'Open Rate, Email Welcome Sequence',
    note: 'Email welcome sequence · Beauty brand',
  },
];

const ResultsBar = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" aria-label="Results">
      <div className="wrap results-row" ref={ref}>
        {results.map((r, i) => (
          <div
            key={r.label}
            className="result-item reveal-up"
            data-reveal
            style={{ '--d': `${i * 0.12}s` } as React.CSSProperties}
          >
            <CountUp className="result-num" value={r.num} />
            <div className="result-label">{r.label}</div>
            <div className="result-note">{r.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResultsBar;
