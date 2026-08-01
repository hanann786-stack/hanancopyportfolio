import { useEffect, useState, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Practice', href: '#practice' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
];

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.style.cssText =
      'position:absolute;top:60px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.appendChild(sentinel);
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-nav-inner">
        <a href="#top" className="site-nav-logo" onClick={close}>
          Hanan <em>Arif</em>
        </a>

        <div className="site-nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="site-nav-link">
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="site-nav-link site-nav-links" style={{ color: 'var(--copper)' }}>
          Book a call
        </a>

        <button
          className="site-nav-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`site-nav-drawer ${open ? 'open' : ''}`}>
        {[...links, { label: 'Book a call', href: '#contact' }].map((l) => (
          <a key={l.href} href={l.href} className="site-nav-link" onClick={close}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
