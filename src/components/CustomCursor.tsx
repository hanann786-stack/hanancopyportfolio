import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch / coarse-pointer devices: do nothing, restore native cursor
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      document.documentElement.style.cursor = 'auto';
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.style.cursor = 'none';

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let state: 'default' | 'clickable' | 'card' = 'default';
    let prevState = '';
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      const t = e.target as HTMLElement;
      let next: typeof state = 'default';
      if (t.closest('a, button, [role="button"], [data-clickable], input, textarea, select')) {
        next = 'clickable';
      } else if (t.closest('[data-cursor-card], .offer-card, .case-card, .testi-card, .process-step')) {
        next = 'card';
      }
      if (next !== state) state = next;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });

    let rafId = 0;
    const tick = () => {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;

      // Dot follows pointer instantly
      const dotScale = state === 'clickable' ? 1.5 : 1;
      const dotColor = state === 'clickable' ? '#F4622A' : '#6C4EF2';
      const ringSize = state === 'card' ? 48 : 32;
      const ringBorder = state === 'card'
        ? '1px solid rgba(108,78,242,0.5)'
        : '1px solid rgba(108,78,242,0.3)';

      dot.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0) scale(${dotScale})`;
      ring.style.transform = `translate3d(${curX - ringSize / 2}px, ${curY - ringSize / 2}px, 0)`;

      if (state !== prevState) {
        dot.style.backgroundColor = dotColor;
        ring.style.width = ringSize + 'px';
        ring.style.height = ringSize + 'px';
        ring.style.border = ringBorder;
        prevState = state;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#6C4EF2',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
          transition: 'background-color 0.2s ease, opacity 0.2s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'rgba(108, 78, 242, 0.15)',
          border: '1px solid rgba(108,78,242,0.3)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
