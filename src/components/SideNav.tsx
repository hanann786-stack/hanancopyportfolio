import { useEffect, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'manifesto', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const SideNav = () => {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* Desktop side nav */}
      <aside className="side-nav" aria-label="Primary">
        <a href="#hero" className="side-nav-logo" data-clickable aria-label="Hanan Arif">
          Hanan.Arif
        </a>
        <ul className="side-nav-dots">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-clickable
                aria-label={s.label}
                className={`side-nav-dot ${active === s.id ? 'is-active' : ''}`}
              >
                <span className="side-nav-tip">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile burger */}
      <button
        className="side-nav-burger"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        data-clickable
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className={`side-nav-overlay ${mobileOpen ? 'open' : ''}`} onClick={close}>
        <nav onClick={(e) => e.stopPropagation()}>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={close} data-clickable>
              {s.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="side-nav-overlay-cta" data-clickable>
            Book a call
          </a>
        </nav>
      </div>
    </>
  );
};

export default SideNav;
