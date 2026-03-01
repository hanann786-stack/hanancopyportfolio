import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-glass border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl tracking-wide text-foreground" data-clickable>
          HANAN <span className="text-primary">ARIF</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-clickable
              className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-clickable
            className="font-body text-xs uppercase tracking-[0.2em] bg-primary text-primary-foreground px-6 py-2.5 hover:bg-primary/90 transition-colors duration-300 font-medium"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-clickable
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-glass border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  data-clickable
                  className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleLinkClick}
                data-clickable
                className="font-body text-sm uppercase tracking-[0.2em] bg-primary text-primary-foreground px-6 py-3 text-center hover:bg-primary/90 transition-colors font-medium"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
