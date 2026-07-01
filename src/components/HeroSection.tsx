import { useState, useEffect, useRef } from 'react';
import BookingModal from './BookingModal';
import heroVideo from '@/assets/hero-bg.mp4.asset.json';
import heroPoster from '@/assets/hero-poster.jpg.asset.json';

const words = ['Words', 'That', 'Sell.'];
const words2 = ['Silence', 'That', 'Sells', 'More.'];

const HeroSection = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
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
      className="hero-masthead"
      style={
        isMobile
          ? {
              backgroundImage: `url(${heroPoster.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {isMobile === false && (
        <div className="hero-bg-video-wrap">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster.url}
            className="hero-bg-video"
          >
            <source src={heroVideo.url} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="hero-overlay" />

      <div className="hero-masthead-inner">
        <h1 className="hero-masthead-h1">
          <span className="hero-masthead-line hero-masthead-line-1">
            {words.map((w, i) => (
              <span key={i} className="hero-masthead-word" style={{ ['--wy' as string]: `${(i % 2 === 0 ? -1 : 1) * (2 + i)}px` }}>
                {w}{i < words.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </span>
          <span className="hero-masthead-line hero-masthead-line-2">
            {words2.map((w, i) => (
              <span key={i} className="hero-masthead-word" style={{ ['--wy' as string]: `${(i % 2 === 0 ? 2 : -3) + i}px` }}>
                {w}{i < words2.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-masthead-sub">
          I write copy that makes people buy things. For DTC brands and SaaS
          companies done leaving revenue on the table.
        </p>

        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          data-clickable
          className="hero-masthead-cta"
        >
          Book a strategy call
        </button>

        <div className="hero-masthead-avail">
          Currently taking 2 clients. Book below.
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
};

export default HeroSection;
