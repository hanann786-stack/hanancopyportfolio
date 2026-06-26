import { useState, useCallback } from "react";
import { X, Check, Linkedin, Instagram, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { handleGmailClick } from "@/lib/gmail";

// EmailJS credentials sourced from environment variables (see .env)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS once at module level
emailjs.init(PUBLIC_KEY);

const REVENUE_OPTIONS = [
  "Just starting out",
  "$1K – $5K/month",
  "$5K – $15K/month",
  "$15K – $50K/month",
  "$50K+/month",
];

const SERVICE_OPTIONS = ["Email Marketing", "Landing Page", "Social Media Ads", "Full Funnel", "Brand Voice", "Other"];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ open, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    revenue: "",
    services: [] as string[],
    challenge: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = useCallback((s: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(s) ? prev.services.filter((x) => x !== s) : [...prev.services, s],
    }));
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Enter a valid email";
    if (!formData.challenge.trim()) errs.challenge = "Tell me about your challenge";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    setSending(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      business: formData.business,
      revenue: formData.revenue,
      services: Array.isArray(formData.services)
        ? formData.services.join(', ')
        : formData.services,
      challenge: formData.challenge,
      to_email: 'hananhereat@gmail.com',
    };

    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log('SUCCESS:', response.status, response.text);
      setStep(2);
    } catch (error) {
      console.error('EmailJS error:', error);
      // Fallback — open Gmail directly with pre-filled info
      const subject = encodeURIComponent('Strategy Call Request — ' + formData.name);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nBusiness: ${formData.business}\nRevenue: ${formData.revenue}\nNeeds: ${formData.services.join(', ')}\nChallenge: ${formData.challenge}`
      );
      window.open(
        `https://mail.google.com/mail/?view=cm&to=hananhereat@gmail.com&su=${subject}&body=${body}`,
        '_blank'
      );
      setStep(2); // still show confirmation
    }
    setSending(false);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setFormData({ name: "", email: "", business: "", revenue: "", services: [], challenge: "" });
      setErrors({});
    }, 300);
  };

  const inputClass = (field: string) =>
    `w-full bg-[rgba(184, 112, 63,0.04)] border-0 border-b ${
      errors[field] ? "border-[#B8703F]" : "border-[rgba(184, 112, 63,0.3)]"
    } focus:border-[#B8703F] text-[#1C1815] font-body placeholder:text-[rgba(245, 240, 232,0.3)] px-1 py-3 text-sm outline-none transition-colors duration-200`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[rgba(28, 24, 21,0.5)] backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[rgba(184, 112, 63,0.15)] rounded-sm"
            style={{ borderTop: "2px solid #B8703F" }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              data-clickable
              className="absolute top-4 right-4 text-[#B8703F] hover:text-[#1C1815] transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-10">
              {step === 1 ? (
                /* ——— STEP 1: FORM ——— */
                <>
                  <div className="text-center mb-8">
                    <p className="font-accent text-[11px] uppercase tracking-[0.25em] text-[#B8703F]/70 mb-3">
                      ✦&nbsp; BOOK YOUR FREE STRATEGY CALL &nbsp;✦
                    </p>
                    <p className="font-body text-sm text-[#1C1815]/50 italic">"20 minutes. No pitch. Just clarity."</p>
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-[#B8703F] text-xs mt-1 font-body">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="text-[#B8703F] text-xs mt-1 font-body">{errors.email}</p>}
                    </div>

                    {/* Business */}
                    <div>
                      <input
                        type="text"
                        placeholder="What's your brand or business?"
                        value={formData.business}
                        onChange={(e) => setFormData((p) => ({ ...p, business: e.target.value }))}
                        className={inputClass("business")}
                      />
                    </div>

                    {/* Revenue */}
                    <div>
                      <select
                        value={formData.revenue}
                        onChange={(e) => setFormData((p) => ({ ...p, revenue: e.target.value }))}
                        className={`${inputClass("revenue")} appearance-none bg-transparent`}
                      >
                        <option value="" disabled className="bg-[#FFFFFF] text-[#1C1815]/50">
                          Monthly revenue range
                        </option>
                        {REVENUE_OPTIONS.map((r) => (
                          <option key={r} value={r} className="bg-[#FFFFFF] text-[#1C1815]">
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Services */}
                    <div>
                      <p className="font-body text-xs text-[#1C1815]/40 mb-3">What do you need help with?</p>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_OPTIONS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            data-clickable
                            onClick={() => toggleService(s)}
                            className={`rounded-full px-5 py-2 text-xs font-body transition-all duration-200 border ${
                              formData.services.includes(s)
                                ? "bg-[#B8703F] text-[#FFFFFF] border-[#B8703F] font-bold"
                                : "bg-transparent text-[#1C1815] border-[rgba(184, 112, 63,0.3)] hover:border-[#B8703F]/60"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Challenge */}
                    <div>
                      <textarea
                        placeholder="What's the one thing you wish your copy was doing that it isn't?"
                        value={formData.challenge}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            challenge: e.target.value.slice(0, 300),
                          }))
                        }
                        rows={3}
                        className={`${inputClass("challenge")} resize-none`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.challenge ? (
                          <p className="text-[#B8703F] text-xs font-body">{errors.challenge}</p>
                        ) : (
                          <span />
                        )}
                        <span className="text-[#1C1815]/30 text-xs font-body">{formData.challenge.length}/300</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    data-cta
                    data-clickable
                    className="w-full mt-8 font-accent text-[13px] uppercase tracking-[0.15em] px-10 py-4 text-[#1C1815] font-semibold hover:brightness-110 transition-all disabled:opacity-50"
                    style={{ backgroundColor: "#B8703F" }}
                  >
                    {sending ? "Sending..." : "Let's Talk — Book My Call →"}
                  </button>

                  <p className="text-center font-body text-xs text-[#1C1815]/40 italic mt-4">
                    Hanan personally reviews every request. You'll hear back within 24 hours.
                  </p>
                </>
              ) : (
                /* ——— STEP 2: CONFIRMATION ——— */
                <div className="text-center py-6">
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full border-2 border-[#B8703F] flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.div
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Check size={36} className="text-[#B8703F]" />
                    </motion.div>
                  </motion.div>

                  <h3 className="font-display text-4xl text-[#1C1815] mb-4">You're in.</h3>
                  <p className="font-body text-sm text-[#1C1815]/60 max-w-sm mx-auto mb-8 leading-relaxed">
                    Hanan has received your request and will personally reach out to{" "}
                    <span className="text-[#B8703F]">{formData.email}</span> within 24 hours to confirm your call time.
                  </p>

                  <div className="w-12 h-px bg-[#B8703F]/30 mx-auto mb-8" />

                  <p className="font-body text-xs text-[#1C1815]/40 mb-5 uppercase tracking-widest">
                    While you wait — connect with Hanan
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <a
                      href="https://instagram.com/hanan.arif.here"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-clickable
                      className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(184, 112, 63,0.3)] rounded-sm text-[#1C1815] font-accent text-[11px] uppercase tracking-wider hover:border-[#B8703F] hover:text-[#B8703F] transition-all"
                    >
                      <Instagram size={14} />
                      Instagram
                    </a>
                    <a
                      href="https://www.linkedin.com/in/hanan-arif-03b526396"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-clickable
                      className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(184, 112, 63,0.3)] rounded-sm text-[#1C1815] font-accent text-[11px] uppercase tracking-wider hover:border-[#B8703F] hover:text-[#B8703F] transition-all"
                    >
                      <Linkedin size={14} />
                      LinkedIn
                    </a>
                    <a
                      href="#"
                      onClick={handleGmailClick}
                      data-clickable
                      className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(184, 112, 63,0.3)] rounded-sm text-[#1C1815] font-accent text-[11px] uppercase tracking-wider hover:border-[#B8703F] hover:text-[#B8703F] transition-all"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
