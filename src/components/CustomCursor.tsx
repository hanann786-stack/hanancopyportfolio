import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef<{ x: number; y: number; opacity: number; age: number }[]>([]);
  const lastMoveTime = useRef(0);
  const stateRef = useRef<'default' | 'clickable' | 'cta' | 'text'>('default');
  const pressedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  const TRAIL_COUNT = 5;
  const TRAIL_LIFETIME = 350;
  const TRAIL_SPAWN_DIST = 8;
  const lastTrailPos = useRef({ x: 0, y: 0 });

  const getState = useCallback((target: HTMLElement): 'default' | 'clickable' | 'cta' | 'text' => {
    // CTA check — crimson buttons
    const ctaEl = target.closest('[data-cursor-cta], .bg-crimson, .glow-crimson, .animate-glow-pulse-crimson');
    if (ctaEl) return 'cta';
    
    // Also check for crimson-styled buttons by inline style or specific text
    if (target.closest('a, button, [role="button"], input, textarea, select, [data-clickable]')) {
      const el = target.closest('a, button, [role="button"], input, textarea, select, [data-clickable]') as HTMLElement;
      const bg = getComputedStyle(el).backgroundColor;
      // Check if it's a crimson/red button
      if (bg && (bg.includes('193, 18, 31') || bg.includes('161, 13, 23') || bg.includes('193,18,31'))) {
        return 'cta';
      }
      return 'clickable';
    }

    // Accordion triggers, tabs, nav links
    if (target.closest('[data-state], [role="tab"], .nav-link, [data-radix-collection-item]')) {
      return 'clickable';
    }

    // Text content
    const tag = target.tagName.toLowerCase();
    if (['p', 'span', 'li', 'blockquote', 'em', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
      // But not if it's inside a clickable
      if (!target.closest('a, button, [role="button"]')) {
        return 'text';
      }
    }

    return 'default';
  }, []);

  useEffect(() => {
    // Touch detection
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
      isTouchRef.current = true;
      return;
    }

    // Create trail dots
    const trailContainer = document.createElement('div');
    trailContainer.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;pointer-events:none;z-index:99998;';
    document.body.appendChild(trailContainer);

    trailRefs.current = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const d = document.createElement('div');
      d.style.cssText = `position:fixed;width:3px;height:3px;border-radius:50%;background:#C9A84C;pointer-events:none;opacity:0;will-change:transform,opacity;`;
      trailContainer.appendChild(d);
      trailRefs.current.push(d);
    }
    trailPositions.current = [];

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = performance.now();

      // Spawn trail dots based on distance
      const dx = e.clientX - lastTrailPos.current.x;
      const dy = e.clientY - lastTrailPos.current.y;
      if (dx * dx + dy * dy > TRAIL_SPAWN_DIST * TRAIL_SPAWN_DIST) {
        lastTrailPos.current = { x: e.clientX, y: e.clientY };
        trailPositions.current.push({ x: e.clientX, y: e.clientY, opacity: 0.3, age: performance.now() });
        if (trailPositions.current.length > TRAIL_COUNT) trailPositions.current.shift();
      }

      // Update state
      const target = e.target as HTMLElement;
      if (target) stateRef.current = getState(target);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) stateRef.current = getState(target);
    };

    const onDown = () => { pressedRef.current = true; };
    const onUp = () => { pressedRef.current = false; };

    const onLeave = () => {
      pos.current = { x: -100, y: -100 };
      ringPos.current = { x: -100, y: -100 };
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    // Animation loop
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) { rafRef.current = requestAnimationFrame(animate); return; }

      const { x, y } = pos.current;

      // Lerp ring position
      const lerp = 0.09;
      ringPos.current.x += (x - ringPos.current.x) * lerp;
      ringPos.current.y += (y - ringPos.current.y) * lerp;

      const state = stateRef.current;
      const pressed = pressedRef.current;

      // Sizes based on state
      let dotSize = 6, ringSize = 36, dotColor = '#C9A84C', ringBorder = '1.5px solid rgba(201,168,76,0.6)';
      let ringGlow = 'none', ringSpeed = '8s', opacity = '1';

      if (state === 'cta') {
        dotSize = 12; ringSize = 60; dotColor = '#C1121F';
        ringBorder = '2px solid #C1121F';
        ringGlow = '0 0 20px rgba(193,18,31,0.5)';
        ringSpeed = '1.5s';
      } else if (state === 'clickable') {
        dotSize = 10; ringSize = 52; dotColor = '#FFFFFF';
        ringBorder = '2px solid #C9A84C';
        ringGlow = '0 0 12px rgba(201,168,76,0.4)';
        ringSpeed = '2s';
      } else if (state === 'text') {
        dotSize = 4; ringSize = 24;
        opacity = '0.5';
      }

      let scale = 1;
      if (pressed) scale = 0.7;

      // Apply dot
      dot.style.transform = `translate(${x - dotSize / 2}px, ${y - dotSize / 2}px) scale(${scale})`;
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.backgroundColor = dotColor;
      dot.style.opacity = opacity;

      // Apply ring
      const rx = ringPos.current.x - ringSize / 2;
      const ry = ringPos.current.y - ringSize / 2;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.border = ringBorder;
      ring.style.boxShadow = ringGlow;
      ring.style.animationDuration = ringSpeed;
      ring.style.opacity = opacity;

      // Trail dots
      const now = performance.now();
      trailPositions.current = trailPositions.current.filter(t => now - t.age < TRAIL_LIFETIME);
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = trailRefs.current[i];
        if (!el) continue;
        const t = trailPositions.current[i];
        if (t) {
          const progress = (now - t.age) / TRAIL_LIFETIME;
          const o = 0.3 * (1 - progress);
          el.style.transform = `translate(${t.x - 1.5}px, ${t.y - 1.5}px)`;
          el.style.opacity = `${o}`;
        } else {
          el.style.opacity = '0';
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      trailContainer.remove();
    };
  }, [getState]);

  if (isTouchRef.current || ('ontouchstart' in (typeof window !== 'undefined' ? window : {}))) return null;

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
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring-spin"
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
          willChange: 'transform',
          transform: 'rotate(45deg)',
          transition: 'width 0.2s ease, height 0.2s ease, border 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
