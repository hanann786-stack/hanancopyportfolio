import { useEffect, useRef, useState } from 'react';

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="contact" className="contact">
      <div ref={ref} className={`contact-inner ${visible ? 'visible' : ''}`}>
        <h2 className="contact-h">Let's work together.</h2>
        <p className="contact-p">
          Tell me about your brand and what you need fixed. I'll reply within 24 hours.
        </p>
        <a href="mailto:hananhereat@gmail.com" className="contact-email">
          hananhereat@gmail.com
        </a>
        <div className="contact-socials">
          <a href="https://instagram.com/hanan.arif.here" target="_blank" rel="noopener noreferrer">
            Instagram →
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn →
          </a>
        </div>
        <div className="contact-foot">
          <span>© 2026 Hanan Arif</span>
          <span>Conversion Copy &amp; AI Systems</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
