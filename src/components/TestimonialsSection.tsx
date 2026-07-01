import elenaImg from '@/assets/testimonial-elena-rossi.jpeg.asset.json';
import marcusImg from '@/assets/testimonial-marcus-webb.jpeg.asset.json';
import sarahImg from '@/assets/testimonial-sarah-chen.jpeg.asset.json';
import triptaImg from '@/assets/testimonial-tripta-sports.jpeg.asset.json';

const items = [
  { name: 'Elena Rossi', src: elenaImg.url, alt: 'Client message from Elena Rossi' },
  { name: 'Marcus Webb', src: marcusImg.url, alt: 'Client message from Marcus Webb' },
  { name: 'Sarah Chen', src: sarahImg.url, alt: 'Client message from Sarah Chen' },
  { name: 'Tripta Sports', src: triptaImg.url, alt: 'Client message from Tripta Sports' },
];

const TestimonialsSection = () => {
  return (
    <section id="clients" className="testi-scatter-section">
      <div className="testi-scatter-head">
        <span className="testi-scatter-eyebrow">What happened after</span>
        <h2 className="testi-scatter-title">What clients said.</h2>
      </div>

      <div className="testi-scatter-wrap">
        {items.map((t, i) => (
          <figure key={t.name} className={`testi-scatter-card testi-scatter-card-${i + 1}`}>
            <img src={t.src} alt={t.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
