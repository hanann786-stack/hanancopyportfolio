import { useRef, useState, useEffect } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { handleGmailClick } from '@/lib/gmail';
import BookingModal from './BookingModal';

const socials = [
  { icon: Mail, href: '#', label: 'Email', onClick: handleGmailClick },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/hanan-arif-03b526396', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/hanan.arif.here', label: 'Instagram' },
];

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="contact" className="relative z-10 py-20 md:py-32 bg-gradient-cta overflow-hidden">
        <div className="bg-grain absolute inset-0" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <span
            className="section-label block text-center mb-4 transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0 }}
          >
            CONTACT
          </span>
          <h2
            ref={ref}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white-headline mb-6 max-w-4xl mx-auto leading-tight tracking-[-0.03em] transition-all duration-500 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            Your Next <span className="text-gold">High-Converting</span> Campaign{' '}
            Starts With <span className="text-gold">One Conversation.</span>
          </h2>

          <p
            className="font-body text-cream/50 text-base mb-12 max-w-lg mx-auto italic transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '0.2s' }}
          >
            I take <span className="text-crimson">limited</span> projects each month. If you're reading this, there's
            still a <span className="text-crimson">slot</span> open — but <span className="text-crimson">not for long</span>.
          </p>

          <button
            onClick={() => setBookingOpen(true)}
            data-cta
            data-clickable
            className="inline-block font-accent text-[13px] uppercase tracking-[0.15em] px-12 py-5 animate-glow-pulse-crimson hover:brightness-110 transition-all font-semibold text-white-headline"
            style={{
              backgroundColor: 'hsl(355, 84%, 40%)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
              willChange: 'transform, opacity',
            }}
          >
            Book a Free Strategy Call →
          </button>

          <div
            className="flex items-center justify-center gap-6 mt-12 transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '0.6s' }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={s.onClick}
                data-clickable
                className="w-12 h-12 rounded-full border border-[hsla(43,52%,54%,0.18)] flex items-center justify-center text-muted-foreground hover:text-gold hover:border-primary hover:glow-gold transition-all duration-300"
                aria-label={s.label}
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default CTASection;
