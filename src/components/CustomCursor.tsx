import { useEffect, useRef } from 'react';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailContainer = useRef<HTMLDivElement | null>(null);
  const trailDots = useRef<HTMLDivElement[]>([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const rotation = useRef(0);
  const state = useRef<'default' | 'clickable' | 'cta' | 'text'>('default');
  const pressed = useRef(false);
  const rafId = useRef(0);
  const lastTrailX = useRef(0);
  const lastTrailY = useRef(0);
  const trailData = useRef<{ x: number; y: number; born: number }[]>([]);
  const visible = useRef(false);

  const TRAIL_COUNT = 5;
  const TRAIL_LIFE = 350;

  useEffect(() => {
    // Touch detection
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Create trail dots via DOM
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:99998;';
    document.body.appendChild(container);
    trailContainer.current = container;
    trailDots.current = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const d = document.createElement('div');
      d.style.cssText = 'position:fixed;top:0;left:0;width:3px;height:3px;border-radius:50%;background:#C9A84C;pointer-events:none;opacity:0;will-change:transform,opacity;';
      container.appendChild(d);
      trailDots.current.push(d);
    }

    const getState = (target: HTMLElement): typeof state.current => {
      // CTA check
      const ctaEl = target.closest('[data-cursor-cta], .animate-glow-pulse-crimson');
      if (ctaEl) return 'cta';

      const clickable = target.closest('a, button, [role="button"], input, textarea, select, [data-clickable], [data-state], [role="tab"]');
      if (clickable) {
        const bg = getComputedStyle(clickable as HTMLElement).backgroundColor;
        if (bg && (bg.includes('193, 18, 31') || bg.includes('193,18,31'))) return 'cta';
        return 'clickable';
      }

      const tag = target.tagName.toLowerCase();
      if (['p', 'span', 'li', 'blockquote', 'em', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        if (!target.closest('a, button, [role="button"]')) return 'text';
      }
      return 'default';
    };

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Spawn trail
      const dx = e.clientX - lastTrailX.current;
      const dy = e.clientY - lastTrailY.current;
      if (dx * dx + dy * dy > 64) {
        lastTrailX.current = e.clientX;
        lastTrailY.current = e.clientY;
        trailData.current.push({ x: e.clientX, y: e.clientY, born: performance.now() });
        if (trailData.current.length > TRAIL_COUNT) trailData.current.shift();
      }

      state.current = getState(e.target as HTMLElement);
    };

    const onOver = (e: MouseEvent) => { state.current = getState(e.target as HTMLElement); };
    const onDown = () => { pressed.current = true; };
    const onUp = () => { pressed.current = false; };
    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mousedown', onDown, { passive: true });
    document.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });

    // Sizes lookup — avoid branching in hot loop
    const CONFIGS = {
      default: { ds: 6, rs: 36, dc: '#C9A84C', rb: '1.5px solid rgba(201,168,76,0.6)', glow: 'none', speed: 8, op: 1 },
      clickable: { ds: 10, rs: 52, dc: '#FFFFFF', rb: '2px solid #C9A84C', glow: '0 0 12px rgba(201,168,76,0.4)', speed: 2, op: 1 },
      cta: { ds: 12, rs: 60, dc: '#C1121F', rb: '2px solid #C1121F', glow: '0 0 20px rgba(193,18,31,0.5)', speed: 1.5, op: 1 },
      text: { ds: 4, rs: 24, dc: '#C9A84C', rb: '1.5px solid rgba(201,168,76,0.6)', glow: 'none', speed: 8, op: 0.5 },
    };

    let prevState = '';
    let prevPressed = false;

    const animate = (now: number) => {
      const mx = mouseX.current;
      const my = mouseY.current;

      // Dot — instant, no lerp
      const s = state.current;
      const cfg = CONFIGS[s];
      const scale = pressed.current ? 0.7 : 1;

      // Only update styles when state changes (avoid per-frame style writes)
      if (s !== prevState) {
        dot.style.width = cfg.ds + 'px';
        dot.style.height = cfg.ds + 'px';
        dot.style.backgroundColor = cfg.dc;
        ring.style.border = cfg.rb;
        ring.style.boxShadow = cfg.glow;
        ring.style.animationDuration = cfg.speed + 's';
        if (cfg.op < 1) {
          dot.style.opacity = '0.5';
          ring.style.opacity = '0.5';
        } else if (visible.current) {
          dot.style.opacity = '1';
          ring.style.opacity = '1';
        }
        prevState = s;
      }

      if (pressed.current !== prevPressed) {
        // Scale handled in transform below
        prevPressed = pressed.current;
      }

      dot.style.transform = `translate(${mx - cfg.ds / 2}px, ${my - cfg.ds / 2}px) scale(${scale})`;

      // Ring — lerp follow
      ringX.current = lerp(ringX.current, mx, 0.12);
      ringY.current = lerp(ringY.current, my, 0.12);
      rotation.current += (360 / (cfg.speed * 60)); // approx rotation per frame

      const rs = cfg.rs;
      ring.style.transform = `translate(${ringX.current - rs / 2}px, ${ringY.current - rs / 2}px) rotate(${rotation.current}deg) scale(${scale})`;
      ring.style.width = rs + 'px';
      ring.style.height = rs + 'px';

      // Trail dots
      const trails = trailData.current;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = trailDots.current[i];
        const t = trails[i];
        if (t) {
          const age = (now - t.born) / TRAIL_LIFE;
          if (age >= 1) {
            el.style.opacity = '0';
          } else {
            el.style.transform = `translate(${t.x - 1.5}px, ${t.y - 1.5}px)`;
            el.style.opacity = String(0.3 * (1 - age));
          }
        } else {
          el.style.opacity = '0';
        }
      }
      // Clean expired
      trailData.current = trails.filter(t => now - t.born < TRAIL_LIFE);

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      container.remove();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#C9A84C',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '30%',
          border: '1.5px solid rgba(201,168,76,0.6)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, border 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
