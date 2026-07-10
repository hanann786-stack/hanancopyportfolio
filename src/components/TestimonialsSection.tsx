import elenaImg from '@/assets/testimonial-elena-rossi.jpeg.asset.json';
import marcusImg from '@/assets/testimonial-marcus-webb.jpeg.asset.json';
import sarahImg from '@/assets/testimonial-sarah-chen.jpeg.asset.json';
import triptaImg from '@/assets/testimonial-tripta-sports.jpeg.asset.json';

const TestimonialsSection = () => (
  <section id="clients" className="testi">
    <h2 className="testi-title">What clients say</h2>

    <div className="testi-row-1">
      <div>
        <figure className="testi-frame">
          <img src={marcusImg.url} alt="Client message from Marcus Webb" loading="lazy" />
        </figure>
        <div className="testi-cap">Marcus Webb · Email Client</div>
        <div className="testi-metric">Open rate: 18% → 47%</div>
      </div>

      <div className="testi-right">
        <div>
          <p className="testi-pull">
            It feels like you write as if you're inside the customer's head.
          </p>
          <div className="testi-attr">— Elena Rossi</div>
        </div>
        <div>
          <figure className="testi-frame testi-frame-sm">
            <img src={sarahImg.url} alt="Client message from Sarah Chen" loading="lazy" />
          </figure>
          <div className="testi-cap testi-cap-sm">Sarah Chen · E-commerce</div>
          <div className="testi-metric testi-metric-sm">3.2× conversions in 60 days</div>
        </div>
      </div>
    </div>

    <div className="testi-row-2">
      <div>
        <figure className="testi-frame testi-frame-sm">
          <img src={triptaImg.url} alt="Client message from Tripta Sports" loading="lazy" />
        </figure>
        <div className="testi-cap testi-cap-sm">Tripta Sports · Pakistan</div>
        <div className="testi-note-it">
          Feedback in Urdu: impressed with quality, perfect brand alignment, on-time delivery.
        </div>
      </div>

      <div>
        <div className="testi-stat-cap" style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
          Testimonials from some of the recent cases
        </div>
      </div>


      <div>
        <figure className="testi-frame testi-frame-sm">
          <img src={elenaImg.url} alt="Client message from Elena Rossi" loading="lazy" />
        </figure>
        <div className="testi-cap testi-cap-sm">Elena Rossi · Email Client</div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
