import { handleGmailClick } from '@/lib/gmail';

const Footer = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <a href="#" className="site-nav-logo" aria-label="Hanan Arif">
          <span className="logo-hanan" style={{ color: '#FFFFFF' }}>Hanan</span>
          <span className="logo-dot" style={{ color: '#D49566' }}>.</span>
          <span className="logo-arif" style={{ color: 'rgba(232, 223, 210,0.55)' }}>Arif</span>
        </a>

        <nav className="site-footer-links" aria-label="Footer">
          <a
            href="https://instagram.com/hanan.arif.here"
            target="_blank"
            rel="noopener noreferrer"
            data-clickable
          >
            INSTAGRAM
          </a>
          <a href="#" onClick={handleGmailClick} data-clickable>
            EMAIL
          </a>
          <a href="#contact" onClick={scrollToContact} data-clickable>
            BOOK A CALL
          </a>
        </nav>

        <p className="site-footer-copy">© 2026 Hanan Arif. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
