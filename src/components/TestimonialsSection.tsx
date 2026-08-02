import marcus from '@/assets/testimonial-marcus-webb.jpeg.asset.json';
import sarah from '@/assets/testimonial-sarah-chen.jpeg.asset.json';
import elena from '@/assets/testimonial-elena-rossi.jpeg.asset.json';
import tripta from '@/assets/testimonial-tripta-sports.jpeg.asset.json';

const quotes = [
  {
    text: 'Our open rate went from 18% to 47% after Hanan rewrote the sequence. Same list, same offer — different words.',
    name: 'Marcus Webb',
    img: marcus.url,
    alt: 'Email from Marcus Webb noting open rate jumped from 18% to 47%',
    source: 'Email feedback',
  },
  {
    text: 'Conversions tripled within 60 days. She understood our customer better than we did after one call.',
    name: 'Sarah Chen',
    img: sarah.url,
    alt: 'Email from Sarah Chen noting conversions jumped 3.2x in 60 days',
    source: 'Email feedback',
  },
  {
    text: 'Hanan writes the way our best customers talk. That is harder than it sounds, and it shows in the numbers.',
    name: 'Elena Rossi',
    img: elena.url,
    alt: 'Email from Elena Rossi praising the copywriting work',
    source: 'Email feedback',
  },
  {
    text: 'Fast, sharp, and no hand-holding needed. The copy landed right the first time.',
    name: 'Tripta Sports',
    img: tripta.url,
    alt: 'WhatsApp message from Tripta Sports praising quality and delivery',
    source: 'WhatsApp feedback',
  },
];

const TestimonialsSection = () => (
  <section id="clients" className="section">
    <div className="wrap">
      <h2 className="section-title">What clients say</h2>
      <p className="section-sub">Real feedback. Real screenshots. Unedited.</p>

      {quotes.map((q) => (
        <figure key={q.name} className="pullquote">
          <span className="mark" aria-hidden>
            “
          </span>
          <blockquote>{q.text}</blockquote>
          <img className="testi-shot" src={q.img} alt={q.alt} loading="lazy" />
          <cite>
            — {q.name} · <span className="testi-source">{q.source}</span>
          </cite>
        </figure>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
