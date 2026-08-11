import { useState } from 'react';
import { useInView } from '@/hooks/use-reveal';

const NUM = /(\d+(?:\.\d+)?)/g;
const DURATION = 1500;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Animates every number inside `value` from 0 to its final amount when scrolled into view. */
const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [text, setText] = useState(() => (reduced ? value : value.replace(NUM, (n) => (n.includes('.') ? '0.0' : '0'))));

  const ref = useInView<HTMLDivElement>(() => {
    if (reduced) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      const k = easeOut(p);
      setText(
        value.replace(NUM, (n) => {
          const decimals = n.includes('.') ? n.split('.')[1].length : 0;
          return (parseFloat(n) * k).toFixed(decimals);
        })
      );
      if (p < 1) requestAnimationFrame(tick);
      else setText(value);
    };
    requestAnimationFrame(tick);
  });

  return (
    <div ref={ref} className={className}>
      {text}
    </div>
  );
};

export default CountUp;
