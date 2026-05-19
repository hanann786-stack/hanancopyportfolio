import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Email {
  subject: string;
  label: string;
  body: string[];
  cta?: string;
}

const emails: Email[] = [
  {
    label: 'Email 1',
    subject: "Welcome. Let's talk money (without the anxiety).",
    body: [
      "Hey {{first_name}},",
      "Welcome to [Platform]. Let's get one thing out of the way: money is stressful. We know. You know. Everyone knows — and nobody talks about it honestly.",
      "We built [Platform] because we believe managing money shouldn't feel like defusing a bomb. It should feel like checking the weather: quick, clear, and not emotionally devastating.",
      "Here's what we're not going to do:\n• We're not going to shame you for your spending habits.\n• We're not going to drown you in charts you don't understand.\n• We're not going to pretend that \"financial literacy\" is something you should've been born with.",
      "Here's what we are going to do: show you exactly where your money is, where it's going, and what to do about it — in plain language, at your pace, with zero judgment.",
      "For now? Just log in and take a look around. No pressure to set up anything yet. Just get comfortable. This is your space.",
    ],
    cta: 'Log In & Look Around →',
  },
  {
    label: 'Email 2',
    subject: "The number most people are scared to see (but need to).",
    body: [
      "Hey {{first_name}},",
      "There's a number in your [Platform] dashboard that most people avoid looking at. Not because it's complicated — because it's honest.",
      "It's your real monthly burn rate.",
      "Not what you think you spend. Not what your budget app pretends you spend. The actual, unfiltered number — subscriptions, impulse buys, that thing you forgot you signed up for in 2022 that's been quietly charging you $14.99/month.",
      "[Platform] finds all of it. Automatically. No manual entry. No spreadsheet shame.",
      "And here's the thing: the number isn't the problem. Not knowing the number is the problem. Once you see it, you can change it. And most users who look at their burn rate for the first time? They find an average of $127/month in spending they didn't know existed.",
      "One look. That's all it takes.",
    ],
    cta: 'See My Burn Rate →',
  },
  {
    label: 'Email 3',
    subject: "You've got more financial power than you think.",
    body: [
      "Hey {{first_name}},",
      "Quick update: based on how you've been using [Platform], you've already done more than 70% of users do in their first month.",
      "That's not a vanity metric. That means you've taken real steps toward understanding your money — and understanding is the foundation of control.",
      "Here's what you've unlocked so far:\n✓ Your accounts are connected\n✓ Your burn rate is visible\n✓ Your spending patterns are starting to take shape",
      "Next step? Set your first Goal.\n\nNot a budget. Not a restriction. A goal — something you actually want. A trip. A cushion. A \"stop worrying\" fund. Whatever it is, [Platform] will show you exactly how to get there, based on your real numbers, not some generic template.",
      "The difference between stress and confidence? A plan you can actually see working.",
      "You're already closer than you think.",
    ],
    cta: 'Set My First Goal →',
  },
];

const EmailAccordion = ({ email }: { email: Email }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[hsla(43,52%,54%,0.12)] rounded-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-[hsla(43,52%,54%,0.04)] transition-colors"
        data-clickable
      >
        {isOpen ? (
          <ChevronDown size={16} className="text-gold shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-gold shrink-0" />
        )}
        <span className="font-accent text-[11px] uppercase tracking-[0.12em] text-cream/50 shrink-0">
          {email.label}
        </span>
        <span className="font-body text-sm text-[#F4622A] font-semibold truncate">
          Subject: "{email.subject}"
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-2 border-t border-[hsla(43,52%,54%,0.08)]">
              {email.body.map((p, i) => (
                <p key={i} className="font-body text-cream text-[15px] leading-[1.7] mb-4 max-w-[64ch] whitespace-pre-line">
                  {p}
                </p>
              ))}
              {email.cta && (
                <div className="mt-6">
                  <span className="inline-block bg-[#F4622A] text-white font-accent text-[12px] uppercase tracking-[0.1em] px-6 py-3 rounded-sm">
                    {email.cta}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FinTechEmailContent = () => (
  <div>
    <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-4 block">
      Email Sequence — FinTech Onboarding
    </span>
    <h2
      className="font-display text-2xl sm:text-3xl md:text-4xl text-gold mb-4 leading-[1.2] tracking-[-0.02em]"
      style={{ textShadow: '0 0 30px rgba(108,78,242,0.3)' }}
    >
      They Came for the App. They Stayed Because of This.
    </h2>
    <div className="inline-block bg-[hsla(43,52%,54%,0.1)] border border-[hsla(43,52%,54%,0.2)] rounded-sm px-4 py-2 mb-10">
      <span className="font-accent text-sm text-gold" style={{ textShadow: '0 0 20px rgba(108,78,242,0.4)' }}>
        Churn Reduced 28% in Q1
      </span>
    </div>
    <div className="space-y-3">
      {emails.map((email, i) => (
        <EmailAccordion key={i} email={email} />
      ))}
    </div>
  </div>
);

export default FinTechEmailContent;
