const items = ['skincare', 'SaaS', 'fintech', 'fashion', 'coaching', 'fitness'];

const ProofStrip = () => {
  return (
    <section
      aria-label="Industries served"
      className="relative z-10 w-full"
      style={{ background: 'var(--bg-warm-2)', padding: '1.25rem 1rem' }}
    >
      <p
        className="text-center"
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'var(--ink-muted)',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ marginRight: '0.8em' }}>People I have worked with in</span>
        {items.map((w, i) => (
          <span key={w}>
            {i > 0 && <span aria-hidden style={{ margin: '0 0.6em' }}> </span>}
            <span>{w}</span>
          </span>
        ))}
      </p>
    </section>
  );
};

export default ProofStrip;
