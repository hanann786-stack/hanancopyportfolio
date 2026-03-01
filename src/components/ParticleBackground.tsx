import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frame: number;

    const draw = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = time * 0.00025;

      // Dramatic golden aurora blobs — larger, brighter, more mouse-reactive
      const blobs = [
        { cx: 0.3 + Math.sin(t) * 0.15 + (mx - 0.5) * 0.25, cy: 0.35 + Math.cos(t * 0.7) * 0.12 + (my - 0.5) * 0.2, r: 0.5, alpha: 0.12 },
        { cx: 0.7 + Math.cos(t * 0.8) * 0.18 + (mx - 0.5) * 0.2, cy: 0.6 + Math.sin(t * 0.6) * 0.1 + (my - 0.5) * 0.18, r: 0.45, alpha: 0.1 },
        { cx: 0.5 + Math.sin(t * 1.2) * 0.12 + (mx - 0.5) * 0.3, cy: 0.25 + Math.cos(t * 0.9) * 0.15 + (my - 0.5) * 0.25, r: 0.4, alpha: 0.08 },
        { cx: mx * 0.8 + 0.1 + Math.sin(t * 1.5) * 0.05, cy: my * 0.8 + 0.1 + Math.cos(t * 1.3) * 0.05, r: 0.3, alpha: 0.07 },
      ];

      for (const blob of blobs) {
        const gradient = ctx.createRadialGradient(
          blob.cx * w, blob.cy * h, 0,
          blob.cx * w, blob.cy * h, blob.r * Math.max(w, h)
        );
        gradient.addColorStop(0, `rgba(201, 168, 76, ${blob.alpha})`);
        gradient.addColorStop(0.5, `rgba(201, 168, 76, ${blob.alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(201, 168, 76, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // Faint geometric grid lines
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ willChange: 'transform' }}
    />
  );
};

export default ParticleBackground;