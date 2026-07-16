import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.getElementById('cursor-dot') as HTMLDivElement | null;
    const ring = document.getElementById('cursor-ring') as HTMLDivElement | null;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };
    document.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    let raf = 0;
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest) return;
      const isInteractive = t.closest('a, button, [role="button"], .services-row, .work-card, input, textarea');
      const isText = !isInteractive && t.closest('p, h1, h2, h3, blockquote');
      document.body.classList.toggle('cursor-hover', !!isInteractive);
      document.body.classList.toggle('cursor-text', !!isText);
    };
    document.addEventListener('mouseover', onOver, { passive: true });

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
};

export default CustomCursor;
