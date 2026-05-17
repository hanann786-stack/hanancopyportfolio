import { useEffect, useRef, memo } from 'react';

/**
 * Hero-only animated background:
 *  - 4 soft blur orbs (violet + persimmon) drifting and breathing
 *  - 160 (or 80 on mobile) drifting particles in violet / persimmon / lavender
 *  - Nearby particles connect with thin lines
 *  - Mouse repulsion within 90px
 *  - Light scroll parallax (0.04x)
 */
const HeroBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const isMobile = () => window.innerWidth < 768;
    const mobile = isMobile();
    const PARTICLE_COUNT = mobile ? 60 : 120;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    };

    const pickColor = () => {
      const r = Math.random();
      if (r < 0.6) return '108, 78, 242';      // violet
      if (r < 0.85) return '201, 184, 245';    // light lavender (25%)
      return '244, 98, 42';                    // persimmon (15%)
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.25;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.5,
        color: pickColor(),
      };
    });

    // Orbs
    type Orb = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseR: number;
      color: string; // rgb triplet
      alpha: number;
      phase: number;
    };
    const orbs: Orb[] = [
      { x: width * 0.2, y: height * 0.3, vx: 0.05, vy: 0.03, baseR: 320, color: '108, 78, 242', alpha: 0.04, phase: 0 },
      { x: width * 0.8, y: height * 0.7, vx: -0.04, vy: -0.025, baseR: 320, color: '108, 78, 242', alpha: 0.04, phase: 2 },
      { x: width * 0.7, y: height * 0.25, vx: 0.03, vy: 0.04, baseR: 240, color: '244, 98, 42', alpha: 0.03, phase: 4 },
      { x: width * 0.25, y: height * 0.75, vx: -0.035, vy: -0.02, baseR: 240, color: '244, 98, 42', alpha: 0.03, phase: 6 },
    ];

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    window.addEventListener('mouseout', onMouseLeave, { passive: true });

    const onScroll = () => {
      scrollRef.current = window.scrollY * 0.04;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let lastTime = 0;
    const FRAME_MIN = 1000 / 60;

    const draw = (time: number) => {
      if (time - lastTime < FRAME_MIN) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      const dt = lastTime ? Math.min((time - lastTime) / 16.67, 2) : 1;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Apply scroll parallax via transform on the wrapper element instead of canvas math
      wrapper.style.transform = `translate3d(0, ${-scrollRef.current}px, 0)`;

      // --- Orbs ---
      for (const orb of orbs) {
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        orb.phase += 0.0025 * dt;
        if (orb.x < -orb.baseR) orb.x = width + orb.baseR;
        if (orb.x > width + orb.baseR) orb.x = -orb.baseR;
        if (orb.y < -orb.baseR) orb.y = height + orb.baseR;
        if (orb.y > height + orb.baseR) orb.y = -orb.baseR;

        const breathe = 0.95 + (Math.sin(orb.phase) * 0.5 + 0.5) * 0.1; // 0.95→1.05
        const r = orb.baseR * breathe;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(orb.x - r, orb.y - r, r * 2, r * 2);
      }

      // --- Particles update + repulsion ---
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const REPEL = 90;
      const REPEL_SQ = REPEL * REPEL;

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < REPEL_SQ && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / REPEL) * 0.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // --- Connection lines ---
      const LINK = 110;
      const LINK_SQ = LINK * LINK;
      ctx.strokeStyle = 'rgba(108, 78, 242, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_SQ) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();

      // --- Particles draw ---
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

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
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, willChange: 'transform' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
});

HeroBackground.displayName = 'HeroBackground';

export default HeroBackground;
