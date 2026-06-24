import { useEffect, useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.init(PUBLIC_KEY);

const SERVICE_OPTIONS = [
  'Email Marketing',
  'Landing Page',
  'Social Media Ads',
  'AI Email System',
  'AI Brand Voice System',
  'Full Funnel',
  'Other',
];

const REVENUE_OPTIONS = [
  'Just starting out',
  '$1K – $5K / month',
  '$5K – $15K / month',
  '$15K – $50K / month',
  '$50K+ / month',
];

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    revenue: '',
    message: '',
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const fallbackMailto = () => {
    const subject = encodeURIComponent(`New Brief — ${form.name || 'Client'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nService: ${form.service}\nRevenue: ${form.revenue}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:hananhereat@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const params = {
      from_name: form.name,
      from_email: form.email,
      business: form.company,
      services: form.service,
      revenue: form.revenue,
      challenge: form.message,
      to_email: 'hananhereat@gmail.com',
    };

    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
        setSent(true);
      } else {
        fallbackMailto();
        setSent(true);
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      fallbackMailto();
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="cta-section">
      <div
        ref={ref}
        className="cta-inner"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="cta-badge">
          <span className="cta-badge-dot" />
          <span>Accepting 2 new projects · May 2026</span>
        </div>

        <h2 className="cta-title">Ready to stop leaving money on the table?</h2>
        <p className="cta-sub">
          Send a short brief. If we're a fit, you'll hear back within 24 hours with next steps and a calendar link.
        </p>

        {sent ? (
          <div className="cta-success" role="status" aria-live="polite">
            Brief received. I'll be in touch within 24 hours.
          </div>
        ) : (
          <form className="cta-form" onSubmit={handleSubmit} noValidate>
            <div className="cta-row">
              <label className="cta-field">
                <span className="cta-label">Name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="cta-input"
                  placeholder="Your full name"
                />
              </label>
              <label className="cta-field">
                <span className="cta-label">Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="cta-input"
                  placeholder="you@brand.com"
                />
              </label>
            </div>

            <div className="cta-row">
              <label className="cta-field">
                <span className="cta-label">Brand / Company</span>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  className="cta-input"
                  placeholder="Your brand"
                />
              </label>
              <label className="cta-field">
                <span className="cta-label">Service Needed</span>
                <select
                  required
                  value={form.service}
                  onChange={(e) => update('service', e.target.value)}
                  className="cta-input cta-select"
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="cta-field">
              <span className="cta-label">Revenue Range</span>
              <select
                required
                value={form.revenue}
                onChange={(e) => update('revenue', e.target.value)}
                className="cta-input cta-select"
              >
                <option value="" disabled>Select monthly revenue</option>
                {REVENUE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </label>

            <label className="cta-field">
              <span className="cta-label">Message</span>
              <textarea
                required
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="cta-input cta-textarea"
                placeholder="What's the challenge? What does success look like in 90 days?"
              />
            </label>

            <button
              type="submit"
              disabled={sending}
              data-clickable
              className="cta-submit"
            >
              {sending ? 'Sending…' : 'Send My Brief →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default CTASection;
