import { Mail, Linkedin, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="relative z-10 py-10 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-lg tracking-wide text-muted-foreground">
        HANAN <span className="text-primary">ARIF</span>
      </span>
      <div className="flex items-center gap-4">
        {[
          { icon: Mail, href: 'mailto:hananhereat@gmail.com', label: 'Email' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/hanan-arif-03b526396', label: 'LinkedIn' },
          { icon: Instagram, href: 'https://instagram.com/hanan.arif.here', label: 'Instagram' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-clickable
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={s.label}
          >
            <s.icon size={16} />
          </a>
        ))}
      </div>
      <p className="font-body text-xs text-muted-foreground">
        © 2025 Hanan Arif. Built to Convert.
      </p>
    </div>
  </footer>
);

export default Footer;