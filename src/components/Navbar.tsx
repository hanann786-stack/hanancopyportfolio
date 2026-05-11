import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Clients', href: '#clients' },
];

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen(o => !o), []);

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-nav-inner">
        <a href="#" className="site-nav-logo" data-clickable onClick={closeMobile}>
          <span className="logo-hanan">Hanan</span>
          <span className="logo-dot">.</span>
          <span className="logo-arif">Arif</span>
        </a>

        <div className="site-nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="site-nav-link" data-clickable>
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="site-nav-cta site-nav-cta-desktop" data-clickable>
          Book a Call
        </a>

        <button
          className="site-nav-burger"
          onClick={toggleMobile}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          data-clickable
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`site-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="site-nav-drawer-inner">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="site-nav-link site-nav-link-mobile"
              data-clickable
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMobile} className="site-nav-cta" data-clickable>
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
