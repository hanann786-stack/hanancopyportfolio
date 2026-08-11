import portrait from '@/assets/hanan-arif.jpg.asset.json';
import { useReveal } from '@/hooks/use-reveal';

const AboutSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="section">
      <div className="wrap about-grid" ref={ref}>
        <img
          className="about-photo reveal-up"
          data-reveal
          src={portrait.url}
          alt="Hanan Arif, conversion copywriter"
          loading="lazy"
        />
        <div>
          <h2 className="section-title reveal-up" data-reveal>
            About
          </h2>
          <p className="about-text reveal-up" data-reveal>
            I am Hanan Arif, a conversion copywriter for DTC brands in beauty, haircare, fitness, and
            fashion. I came to copywriting through an unusual route: a pre-medical background in human
            psychology, which means I write from an understanding of how people actually make decisions
            not just what sounds good on paper. Every piece of copy I write is grounded in Cialdini's
            persuasion principles, emotional trigger frameworks, and a genuine obsession with the gap
            between a great product and the revenue it deserves.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
