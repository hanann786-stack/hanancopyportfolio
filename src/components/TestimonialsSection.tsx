const quotes = [
  {
    text: 'Our open rate went from 18% to 47% after Hanan rewrote the sequence. Same list, same offer — different words.',
    name: 'Marcus Webb',
  },
  {
    text: 'Conversions tripled within 60 days. She understood our customer better than we did after one call.',
    name: 'Sarah Chen',
  },
  {
    text: 'Hanan writes the way our best customers talk. That is harder than it sounds, and it shows in the numbers.',
    name: 'Elena Rossi',
  },
  {
    text: 'Fast, sharp, and no hand-holding needed. The copy landed right the first time.',
    name: 'Tripta Sports',
  },
];

const TestimonialsSection = () => (
  <section id="clients" className="section">
    <div className="wrap">
      <h2 className="section-title">What clients say</h2>

      {quotes.map((q) => (
        <figure key={q.name} className="pullquote">
          <span className="mark" aria-hidden>
            “
          </span>
          <blockquote>{q.text}</blockquote>
          <cite>— {q.name}</cite>
        </figure>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
