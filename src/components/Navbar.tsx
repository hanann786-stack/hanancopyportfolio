import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-2xl tracking-wider text-foreground" data-clickable>
          THE<span className="text-primary">COPY</span>WRITER
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-clickable
              className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-clickable
            className="font-body text-sm uppercase tracking-widest bg-primary text-primary-foreground px-5 py-2 rounded-sm hover:bg-primary/90 transition-colors duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
