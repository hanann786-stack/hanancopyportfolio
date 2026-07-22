import { useRef } from 'react';
import HeroPattern from './HeroPattern';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero"
      style={{ background: '#1A2744' }}
    >
      <HeroPattern />
      {/* Extra CSS overlay for stronger readability on small screens */}
      <div className="hero-overlay hero-overlay-readable" />

      <div className="hero-content">

        <div className="hero-bl hero-fade">
          <h1 className="hero-h1">
            Conversion Copy
            <span className="stroke">&amp; AI Systems</span>
          </h1>
          <p className="hero-sub">For DTC brands and SaaS companies.</p>
        </div>

        <div className="hero-br hero-fade-2">
          <a href="#work" className="btn-primary">See the work</a>
          <span className="scroll-hint">or scroll</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
