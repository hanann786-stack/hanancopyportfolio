import { useEffect, useRef } from 'react';

const OPTS: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

/** Adds `is-in` to the element (and to its [data-reveal] children) when it scrolls into view. */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('is-in');
      el.querySelectorAll('[data-reveal]').forEach((c) => c.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = e.target as HTMLElement;
        target.classList.add('is-in');
        io.unobserve(target);
      });
    }, OPTS);

    const targets: Element[] = el.hasAttribute('data-reveal') ? [el] : [];
    el.querySelectorAll('[data-reveal]').forEach((c) => targets.push(c));
    (targets.length ? targets : [el]).forEach((t) => io.observe(t));

    return () => io.disconnect();
  }, []);

  return ref;
}

/** Fires once when the element enters the viewport. */
export function useInView<T extends HTMLElement = HTMLElement>(onEnter: () => void) {
  const ref = useRef<T | null>(null);
  const cb = useRef(onEnter);
  cb.current = onEnter;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        cb.current();
        io.disconnect();
      }
    }, OPTS);
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
