import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.init(PUBLIC_KEY);

const CTASection = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', revenue: '', message: '',
  });

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const fallbackMailto = () => {
    const subject = encodeURIComponent(`New brief from ${form.name || 'client'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBrand: ${form.company}\nService: ${form.service}\nRevenue: ${form.revenue}\n\n${form.message}`
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
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
      setSent(true);
    } catch (err) {
      console.error(err);
      fallbackMailto();
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-letter">
      <p className="contact-letter-note">I have two spots open right now.</p>
      <h2 className="contact-letter-title">Tell me about your brand.</h2>

      {sent ? (
        <div className="contact-letter-success" role="status" aria-live="polite">
          Got it. I will reply within 24 hours.
        </div>
      ) : (
        <form className="contact-letter-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-letter-row">
            <input
              type="text" required value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="contact-letter-input" placeholder="Your name"
            />
            <input
              type="email" required value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="contact-letter-input" placeholder="Your email"
            />
          </div>
          <div className="contact-letter-row">
            <input
              type="text" value={form.company}
              onChange={(e) => update('company', e.target.value)}
              className="contact-letter-input" placeholder="Brand or company"
            />
            <select
              required value={form.service}
              onChange={(e) => update('service', e.target.value)}
              className="contact-letter-input"
            >
              <option value="" disabled>What kind of work</option>
              <option>Email marketing</option>
              <option>Landing page</option>
              <option>Social media ads</option>
              <option>AI email system</option>
              <option>AI brand voice system</option>
              <option>Full funnel</option>
              <option>Something else</option>
            </select>
          </div>
          <select
            required value={form.revenue}
            onChange={(e) => update('revenue', e.target.value)}
            className="contact-letter-input"
          >
            <option value="" disabled>Roughly, monthly revenue</option>
            <option>Just starting out</option>
            <option>$1K to $5K a month</option>
            <option>$5K to $15K a month</option>
            <option>$15K to $50K a month</option>
            <option>$50K+ a month</option>
          </select>
          <textarea
            required value={form.message}
            onChange={(e) => update('message', e.target.value)}
            className="contact-letter-input contact-letter-textarea"
            placeholder="What is the challenge, and what does a win look like in 90 days?"
          />
          <button type="submit" disabled={sending} data-clickable className="contact-letter-submit">
            {sending ? 'Sending' : 'Send it over'}
          </button>
        </form>
      )}
    </section>
  );
};

export default CTASection;
