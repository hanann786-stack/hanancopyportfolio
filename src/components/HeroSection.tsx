import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import BookingModal from './BookingModal';
import heroVideo from '@/assets/hero-bg.mp4.asset.json';
import heroPoster from '@/assets/hero-poster.jpg.asset.json';

const HeroSection = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background (desktop) / poster image (mobile) */}
      {!isMobile ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster.url}
          className="hero-bg-video"
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
      ) : (
        <div
          className="hero-bg-video"
          style={{
            backgroundImage: `url(${heroPoster.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Particle canvas above video, below overlay text — opacity reduced via wrapper */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ opacity: 0.5 }}>
        <HeroBackground />
      </div>

      {/* Brand overlay for readability */}
      <div className="hero-overlay" />

      <div className="relative z-[2] w-full max-w-[780px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="hero-blink-dot" />
          <span
            className="hero-eyebrow relative"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Conversion Copywriter × AI Marketing Systems
            <span className="hero-eyebrow-underline" />
          </span>
          <span className="hero-blink-dot" />
        </motion.div>

        {/* Headline */}
        <h1
          className="hero-h1 font-display mb-7"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            textShadow: '0 2px 20px rgba(0,0,0,0.25)',
          }}
        >
          <span className="hero-line-1 block" style={{ color: '#FFFFFF' }}>
            Words That Sell.
          </span>
          <span
            className="hero-line-2 block italic"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px #C9B8F5',
            }}
          >
            Silence That Sells More.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-sub mx-auto mb-7"
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.82,
            maxWidth: '580px',
            textShadow: '0 1px 12px rgba(0,0,0,0.3)',
          }}
        >
          I engineer revenue through conversion copy and AI marketing systems — for DTC brands and SaaS companies done leaving money on the table.
        </p>

        {/* Availability badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 mb-8"
          style={{
            background: 'rgba(108,78,242,0.18)',
            border: '1px solid rgba(201,184,245,0.4)',
            backdropFilter: 'blur(8px)',
            borderRadius: '999px',
            padding: '6px 16px',
            fontSize: '12px',
            color: '#FFFFFF',
            fontWeight: 500,
          }}
        >
          <span className="relative flex items-center justify-center">
            <span
              className="absolute inline-block w-2 h-2 rounded-full hero-pulse-dot"
              style={{ background: '#22C55E' }}
            />
            <span
              className="relative inline-block w-2 h-2 rounded-full"
              style={{ background: '#22C55E' }}
            />
          </span>
          Taking 2 new clients in June 2026
        </div>

        {/* CTAs */}
        <div
          className="hero-ctas flex flex-wrap justify-center items-center"
          style={{ gap: '14px' }}
        >
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            data-clickable
            className="hero-cta-primary"
          >
            Book a Strategy Call
          </button>
          <a href="#work" data-clickable className="hero-cta-secondary">
            See the Work
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#credibility"
          data-clickable
          className="hero-scroll-indicator mt-16 inline-flex"
          aria-label="Scroll down"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hero-scroll-arrow"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
};

export default HeroSection;
