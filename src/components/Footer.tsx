import { Mail, Linkedin, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="relative z-10 py-10 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-lg tracking-wider text-muted-foreground">
        THE<span className="text-primary">COPY</span>WRITER
      </span>
      <div className="flex items-center gap-4">
        {[
          { icon: Mail, href: 'mailto:hello@thecopywriter.com', label: 'Email' },
          { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
          { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
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
            <s.icon size={18} />
          </a>
        ))}
      </div>
      <p className="font-body text-xs text-muted-foreground">
        © 2026. Words that work.
      </p>
    </div>
  </footer>
);

export default Footer;
