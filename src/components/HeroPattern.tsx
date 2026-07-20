import { memo, useEffect, useRef } from 'react';

/**
 * Deep navy background with a repeating pattern of white outline
 * copywriting icons. Adds a subtle mouse-driven parallax + a slow
 * ambient float. GPU-only transforms, rAF-throttled, respects
 * prefers-reduced-motion, and pauses when the hero is offscreen.
 */
const HeroPattern = memo(() => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGGElement>(null);
  const overlayRef = useRef<SVGRectElement>(null);

  // Target + current values (LERP smoothed)
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const visible = useRef(true);
  const t0 = useRef(performance.now());

  useEffect(() => {
    const wrap = wrapRef.current;
    const pat = patternRef.current;
    const ov = overlayRef.current;
    if (!wrap || !pat) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      // -1 → 1 normalized cursor position within hero
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.current.x = Math.max(-1, Math.min(1, nx));
      target.current.y = Math.max(-1, Math.min(1, ny));
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => { visible.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const tick = (now: number) => {
      if (visible.current) {
        // LERP toward target
        current.current.x += (target.current.x - current.current.x) * 0.06;
        current.current.y += (target.current.y - current.current.y) * 0.06;

        // Ambient float (very slow sine)
        const t = (now - t0.current) * 0.00025;
        const floatX = Math.sin(t) * 6;
        const floatY = Math.cos(t * 0.8) * 4;

        // Pattern shifts more than overlay for depth
        const px = current.current.x * 22 + floatX;
        const py = current.current.y * 16 + floatY;
        pat.setAttribute('transform', `translate(${px} ${py})`);

        if (ov) {
          const ox = current.current.x * -6;
          const oy = current.current.y * -4;
          ov.setAttribute('transform', `translate(${ox} ${oy})`);
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, background: '#1A2744' }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: 'transform' }}
      >
        <defs>
          <pattern
            id="copy-icons"
            x="0"
            y="0"
            width="260"
            height="260"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-8)"
          >
            <g
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.22"
            >
              {/* Pen nib */}
              <g transform="translate(20,20)">
                <path d="M0 26 L14 0 L28 26 L14 20 Z" />
                <line x1="14" y1="20" x2="14" y2="30" />
              </g>

              {/* Quote marks */}
              <g transform="translate(110,15)">
                <path d="M0 14 Q0 0 12 0 L12 8 Q6 8 6 14 L6 22 L0 22 Z" />
                <path d="M18 14 Q18 0 30 0 L30 8 Q24 8 24 14 L24 22 L18 22 Z" />
              </g>

              {/* Document with lines */}
              <g transform="translate(200,18)">
                <path d="M0 0 H22 L30 8 V32 H0 Z" />
                <path d="M22 0 V8 H30" />
                <line x1="5" y1="16" x2="24" y2="16" />
                <line x1="5" y1="22" x2="24" y2="22" />
                <line x1="5" y1="28" x2="18" y2="28" />
              </g>

              {/* Ampersand */}
              <g transform="translate(30,100)">
                <text
                  x="0"
                  y="24"
                  fontFamily="Georgia, serif"
                  fontSize="34"
                  fontStyle="italic"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                >
                  &amp;
                </text>
              </g>

              {/* Envelope */}
              <g transform="translate(95,105)">
                <rect x="0" y="0" width="34" height="22" rx="1" />
                <path d="M0 0 L17 14 L34 0" />
              </g>

              {/* Sparkle */}
              <g transform="translate(170,108)">
                <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
              </g>

              {/* Speech bubble */}
              <g transform="translate(215,100)">
                <path d="M0 4 Q0 0 4 0 H26 Q30 0 30 4 V18 Q30 22 26 22 H12 L6 28 V22 H4 Q0 22 0 18 Z" />
              </g>

              {/* Cursor / arrow */}
              <g transform="translate(20,180)">
                <path d="M0 0 L0 22 L6 16 L10 24 L14 22 L10 14 L18 14 Z" />
              </g>

              {/* Hashtag */}
              <g transform="translate(75,185)">
                <line x1="6" y1="0" x2="2" y2="24" />
                <line x1="16" y1="0" x2="12" y2="24" />
                <line x1="0" y1="8" x2="20" y2="8" />
                <line x1="0" y1="16" x2="20" y2="16" />
              </g>

              {/* At sign */}
              <g transform="translate(115,180)">
                <circle cx="14" cy="14" r="13" />
                <circle cx="14" cy="14" r="5" />
                <path d="M19 14 V17 Q19 22 24 22" />
              </g>

              {/* Chart / bars */}
              <g transform="translate(170,185)">
                <line x1="0" y1="24" x2="26" y2="24" />
                <rect x="2" y="14" width="5" height="10" />
                <rect x="10" y="8" width="5" height="16" />
                <rect x="18" y="2" width="5" height="22" />
              </g>

              {/* Pilcrow ¶ */}
              <g transform="translate(215,180)">
                <text
                  x="0"
                  y="24"
                  fontFamily="Georgia, serif"
                  fontSize="30"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                >
                  ¶
                </text>
              </g>
            </g>
          </pattern>

          {/* Readability overlay — diagonal darken toward bottom-left */}
          <linearGradient id="hero-overlay-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A2744" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#1A2744" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0F1A30" stopOpacity="0.92" />
          </linearGradient>

          {/* Soft gold vignette to keep gold accents readable */}
          <radialGradient id="hero-vignette" cx="50%" cy="50%" r="75%">
            <stop offset="60%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </radialGradient>
        </defs>

        {/* Oversized so parallax translation never reveals edges */}
        <g ref={patternRef}>
          <rect x="-5%" y="-5%" width="110%" height="110%" fill="url(#copy-icons)" />
        </g>
        <rect width="100%" height="100%" fill="url(#hero-overlay-grad)" />
        <rect ref={overlayRef} x="-3%" y="-3%" width="106%" height="106%" fill="url(#hero-vignette)" />
      </svg>
    </div>
  );
});

HeroPattern.displayName = 'HeroPattern';

export default HeroPattern;
