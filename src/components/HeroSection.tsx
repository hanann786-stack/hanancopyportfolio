import { useEffect, useRef, useState } from 'react';
import heroVideo from '@/assets/hero-bg-v2.mp4.asset.json';
import heroPoster from '@/assets/hero-poster.jpg.asset.json';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isMobile !== false) return;
    const sec = sectionRef.current;
    const vid = videoRef.current;
    if (!sec || !vid) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) vid.play().catch(() => {});
          else vid.pause();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero"
      style={isMobile ? { background: '#1C1815' } : undefined}
    >
      {isMobile === false && (
        <div className="hero-video-wrap">
          <video
            ref={videoRef}
            id="hero-video"
            autoPlay muted loop playsInline preload="metadata"
            poster={heroPoster.url}
            className="hero-video"
          >
            <source src={heroVideo.url} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-tl">Hanan Arif</div>
        <div className="hero-tr">Available for projects</div>

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
