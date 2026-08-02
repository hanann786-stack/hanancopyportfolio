const results = [
  { num: '62%', label: 'Drop in CPA, Fitness Ad Campaign' },
  { num: '4.1% → 7.3%', label: 'CVR on a DTC Fashion Landing Page' },
  { num: '34%', label: 'Open Rate, Email Welcome Sequence' },
];

const ResultsBar = () => (
  <section className="section" aria-label="Results">
    <div className="wrap results-row">
      {results.map((r) => (
        <div key={r.label} className="result-item">
          <div className="result-num">{r.num}</div>
          <div className="result-label">{r.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ResultsBar;
