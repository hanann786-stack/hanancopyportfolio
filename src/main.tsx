import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const markLoaded = () => {
  requestAnimationFrame(() => document.body.classList.add("page-loaded"));
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", markLoaded);
} else {
  markLoaded();
}

// Boot after mount
setTimeout(() => {
  // ANIMATION 1 — h2 reveal on scroll
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          revealIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('h2').forEach((el) => {
    el.classList.add('reveal-h2');
    revealIO.observe(el);
  });

  // ANIMATION 4 — Number counters when Work cards enter viewport
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const card = e.target as HTMLElement;
        card.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
          const target = parseFloat(el.dataset.countTo || '0');
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          const decimals = parseInt(el.dataset.decimals || '0', 10);
          const start = performance.now();
          const dur = 1400;
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const v = target * easeOutQuart(t);
            el.textContent = prefix + v.toFixed(decimals) + suffix;
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        countIO.unobserve(card);
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll('.work-card').forEach((c) => countIO.observe(c));

  // ANIMATION 3 — Magnetic CTA buttons
  const magneticEls = document.querySelectorAll<HTMLElement>('.btn-primary, .contact-email');
  magneticEls.forEach((btn) => {
    btn.style.transition = 'transform 0.4s cubic-bezier(.16,1,.3,1)';
    btn.style.display = btn.style.display || 'inline-block';
    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist > 80) { btn.style.transform = 'translate(0,0)'; return; }
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => { btn.style.transform = 'translate(0,0)'; };
    window.addEventListener('mousemove', onMove, { passive: true });
    btn.addEventListener('mouseleave', onLeave);
  });

  // ANIMATION 5 — Smooth anchor scroll with 70px offset
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  // ANIMATION 2 — Parallax on work card scroll
  const scrollEl = document.querySelector<HTMLElement>('.work-scroll');
  if (scrollEl) {
    scrollEl.addEventListener('scroll', () => {
      const cards = scrollEl.querySelectorAll<HTMLElement>('.work-card');
      const scrollLeft = scrollEl.scrollLeft;
      cards.forEach((card, i) => {
        const offset = (scrollLeft - card.offsetLeft) * 0.08;
        card.style.backgroundPosition = `${offset}px center`;
      });
    }, { passive: true });
  }
}, 200);
