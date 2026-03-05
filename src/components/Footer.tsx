import { Mail, Linkedin, Instagram } from 'lucide-react';
import { handleGmailClick } from '@/lib/gmail';

const Footer = () => (
  <footer className="relative z-10 py-10 border-t border-[hsla(43,52%,54%,0.18)]">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-lg tracking-wide text-cream/60">
        HANAN <span className="text-gold">ARIF</span>
      </span>
      <div className="flex items-center gap-4">
        {[
          { icon: Mail, href: '#', label: 'Email', onClick: handleGmailClick },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/hanan-arif-03b526396', label: 'LinkedIn' },
          { icon: Instagram, href: 'https://instagram.com/hanan.arif.here', label: 'Instagram' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={s.onClick}
            data-clickable
            className="text-muted-foreground hover:text-gold transition-colors"
            aria-label={s.label}
          >
            <s.icon size={16} />
          </a>
        ))}
      </div>
      <p className="font-body text-xs text-muted-foreground">
        © 2026 Hanan Arif. Built to Convert.
      </p>
    </div>
  </footer>
);

export default Footer;
