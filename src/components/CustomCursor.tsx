import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device — don't render cursor
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    if (touchCheck) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select, [data-clickable]');
      setHovering(!!isClickable);
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkHover);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (isTouch || !visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: hovering ? 'hsl(0, 0%, 100%)' : 'hsl(43, 58%, 54%)',
          x: pos.x - 4,
          y: pos.y - 4,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9998]"
        style={{
          borderColor: hovering ? 'hsl(0, 0%, 100%)' : 'hsl(43, 58%, 54%)',
        }}
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          scale: hovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
