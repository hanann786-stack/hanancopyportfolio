import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import BookingModal from './BookingModal';

const HeroSection = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated hero background (canvas) */}
      <HeroBackground />

      <div className="relative z-10 w-full max-w-[780px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="hero-blink-dot" />
          <span className="hero-eyebrow relative">
            Conversion Copywriter × AI Marketing Systems
            <span className="hero-eyebrow-underline" />
          </span>
          <span className="hero-blink-dot" />
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display mb-7"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            fontWeight: 400,
          }}
        >
          <span className="hero-line-1 block" style={{ color: '#1A1523' }}>
            Words That Sell.
          </span>
          <span
            className="hero-line-2 block italic"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px #6C4EF2',
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
            color: '#5C5469',
            lineHeight: 1.82,
            maxWidth: '580px',
          }}
        >
          I engineer revenue through conversion copy and AI marketing systems — for DTC brands and SaaS companies done leaving money on the table.
        </p>

        {/* Availability badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 mb-8"
          style={{
            background: 'rgba(108,78,242,0.07)',
            border: '1px solid rgba(108,78,242,0.2)',
            borderRadius: '999px',
            padding: '6px 16px',
            fontSize: '12px',
            color: '#6C4EF2',
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
          Taking 2 new clients in May 2026
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
            stroke="#6C4EF2"
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
