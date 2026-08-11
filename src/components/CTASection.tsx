import { useReveal } from '@/hooks/use-reveal';

const CTASection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="section">
      <div className="wrap" ref={ref}>
        <h2 className="cta-head reveal-fade" data-reveal>
          Ready to see what better copy looks like for your brand?
        </h2>

        <a
          href="https://calendly.com/hananhereat/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-pulse reveal-fade"
          data-reveal
          style={{ '--d': '0.15s' } as React.CSSProperties}
        >
          Book a Free 15-Minute Call
        </a>

        <p className="cta-email reveal-fade" data-reveal style={{ '--d': '0.25s' } as React.CSSProperties}>
          Or email me directly:{' '}
          <a href="mailto:hananhereat@gmail.com" className="link-underline">
            hananhereat@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default CTASection;
