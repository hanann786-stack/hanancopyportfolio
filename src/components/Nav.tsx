import { useEffect, useState } from 'react';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">Hanan Arif</a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Nav;
