import { useEffect, useRef, memo } from 'react';

const ParticleBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // On mobile, skip canvas entirely — CSS gradient fallback handles it
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    let resizeTimer = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // FPS cap
    let lastTime = 0;
    const FRAME_MIN = 1000 / 60;

    const draw = (time: number) => {
      if (time - lastTime < FRAME_MIN) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      const w = canvas.width;
      const h = canvas.height;

      // Trail fade fill (avoids full clear+redraw cost)
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(232, 223, 210, 0.2)';
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = time * 0.00025;

      // Aurora blobs
      const blobs = [
        { cx: 0.3 + Math.sin(t) * 0.15 + (mx - 0.5) * 0.25, cy: 0.35 + Math.cos(t * 0.7) * 0.12 + (my - 0.5) * 0.2, r: 0.5, alpha: 0.12, color: '184, 112, 63' },
        { cx: 0.7 + Math.cos(t * 0.8) * 0.18 + (mx - 0.5) * 0.2, cy: 0.6 + Math.sin(t * 0.6) * 0.1 + (my - 0.5) * 0.18, r: 0.45, alpha: 0.10, color: '184, 112, 63' },
        { cx: 0.5 + Math.sin(t * 1.2) * 0.12 + (mx - 0.5) * 0.3, cy: 0.25 + Math.cos(t * 0.9) * 0.15 + (my - 0.5) * 0.25, r: 0.4, alpha: 0.08, color: '184, 112, 63' },
        { cx: mx * 0.8 + 0.1 + Math.sin(t * 1.5) * 0.05, cy: my * 0.8 + 0.1 + Math.cos(t * 1.3) * 0.05, r: 0.3, alpha: 0.06, color: '184, 112, 63' },
      ];

      for (const blob of blobs) {
        const gradient = ctx.createRadialGradient(
          blob.cx * w, blob.cy * h, 0,
          blob.cx * w, blob.cy * h, blob.r * Math.max(w, h)
        );
        gradient.addColorStop(0, `rgba(${blob.color}, ${blob.alpha})`);
        gradient.addColorStop(0.5, `rgba(${blob.color}, ${blob.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // Batched grid lines — single beginPath + single stroke
      ctx.strokeStyle = 'rgba(184, 112, 63, 0.07)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      const gridSize = 80;
      for (let x = 0; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        lastTime = 0;
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <>
      {/* CSS gradient fallback for mobile */}
      <div
        className="fixed inset-0 pointer-events-none z-0 md:hidden"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(184, 112, 63,0.08) 0%, transparent 60%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
