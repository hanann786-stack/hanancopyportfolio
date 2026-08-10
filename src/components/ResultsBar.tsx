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

const ResultsBar = () => (
  <section className="section" aria-label="Results">
    <div className="wrap results-row">
      {results.map((r) => (
        <div key={r.label} className="result-item">
          <div className="result-num">{r.num}</div>
          <div className="result-label">{r.label}</div>
          <div className="result-note">{r.note}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ResultsBar;
