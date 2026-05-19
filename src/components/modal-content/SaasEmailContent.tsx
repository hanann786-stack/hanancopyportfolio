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
    subject: 'You just made a really good decision.',
    body: [
      "Hey {{first_name}},",
      "Welcome to [Product]. You just joined 14,000+ teams who decided they were done doing things the hard way.",
      "Here's what you need to know right now: nothing.",
      "Seriously — don't try to learn everything today. The best users? They started with one thing. One workflow. One small win that made them think, \"Oh. This is going to change everything.\"",
      "Over the next few days, I'm going to send you a few short emails. Not product tutorials. Not feature dumps. Just the stuff that actually matters — the things our most successful users wish they'd known on day one.",
      "For now? Just log in. Look around. Click on something that looks interesting.",
      "You'll know what to do. The product was built that way on purpose.",
      "Talk soon,\nHanan — Head of Growth, [Product]",
    ],
    cta: 'Log In & Explore →',
  },
  {
    label: 'Email 2',
    subject: 'The #1 thing our best users do in their first 48 hours',
    body: [
      "Hey {{first_name}},",
      "I looked at the data on our top 1% of users — the ones who stay the longest, upgrade the fastest, and refer the most people.",
      "They all did one thing in their first 48 hours: they set up their first [core workflow].",
      "Not because we told them to. Because once they did, everything clicked. The value became obvious. The \"aha\" moment hit.",
      "It takes about 3 minutes. And once it's done, you'll wonder how you worked without it.",
      "Here's exactly how to do it: [Step-by-step visual or link]",
      "That's it. One action. Three minutes. And suddenly this isn't a tool you're \"trying\" — it's a tool you're using.",
    ],
    cta: 'Set Up My First Workflow →',
  },
  {
    label: 'Email 3',
    subject: "You're being watched (in a good way)",
    body: [
      "Hey {{first_name}},",
      "Quick confession: we track what our happiest users do differently. Not in a creepy way — in a \"we want to help you win\" way.",
      "And here's something interesting: you've already done two of the three things that predict whether someone becomes a power user.",
      "The third? Inviting one teammate.",
      "Here's why that matters: [Product] works fine alone. But it was built for teams. The moment you add someone — a collaborator, a manager, a client — the product stops being a tool and starts being a system.",
      "And systems? Systems are what separate \"nice to have\" from \"can't live without.\"",
      "Add one person. Just one. And watch what happens.",
    ],
    cta: 'Invite a Teammate →',
  },
  {
    label: 'Email 4',
    subject: "Honest question: what's still feeling messy?",
    body: [
      "Hey {{first_name}},",
      "You've been in [Product] for a few days now. Some things probably feel great. Other things? Maybe a little unclear.",
      "That's normal. Every new tool has a learning curve — and we'd rather help you through it than watch you quietly give up.",
      "So here's a genuine question: What's one thing you're trying to do in [Product] that doesn't feel easy yet?",
      "Hit reply and tell me. Seriously. I read every response, and I'll either point you to the right feature or pass your feedback to our product team.",
      "We built this thing to save you time. If something's costing you time instead, we want to fix it.",
      "No survey. No form. Just reply.",
    ],
    cta: 'Reply to This Email →',
  },
  {
    label: 'Email 5',
    subject: 'The team that saved 6 hours a week (and how they did it)',
    body: [
      "Hey {{first_name}},",
      "Meet the team at [Company X].",
      "Before [Product], they were running their entire [workflow] across 3 tools, 2 spreadsheets, and a Slack channel with 47 pinned messages. Every Monday started with a 45-minute \"alignment\" meeting that aligned nothing.",
      "Then they switched to [Product].",
      "Within two weeks, they'd cut their weekly workflow time by 6 hours. The Monday meeting? Gone. The spreadsheets? Archived. The Slack chaos? Replaced by one clean dashboard everyone could see.",
      "Here's what their ops lead said: \"We didn't just save time. We stopped dreading Mondays.\"",
      "You're in the same position they were. The only difference is they took 10 minutes to set up [key feature]. That's all it took.",
      "Your move.",
    ],
    cta: 'Set Up [Key Feature] →',
  },
  {
    label: 'Email 6',
    subject: "Your trial ends tonight. Here's what that means.",
    body: [
      "Hey {{first_name}},",
      "Your 7-day trial of [Product] ends tonight at midnight.",
      "Here's what happens if you don't upgrade: Your workflows will pause. Your team access will lock. The integrations you set up will disconnect. Everything you've built this week will go into read-only mode.",
      "Here's what happens if you do: Nothing changes. Literally nothing. Everything keeps working. Your data stays. Your team stays. And the momentum you've built this week doesn't hit a wall.",
      "I'm not going to pitch you. You've spent a week inside the product. You already know if it's worth it.",
      "If it saved you time — keep it.\nIf it made your team faster — keep it.\nIf you opened it more than twice — that's your answer.",
      "One click. No sales call. No contract. Just a decision you already know the answer to.",
    ],
    cta: 'Upgrade & Keep Everything →',
  },
];

const EmailAccordion = ({ email, index }: { email: Email; index: number }) => {
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

const SaasEmailContent = () => (
  <div>
    <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-4 block">
      Email Campaign — 6-Part Welcome Sequence
    </span>
    <h2
      className="font-display text-2xl sm:text-3xl md:text-4xl text-gold mb-4 leading-[1.2] tracking-[-0.02em]"
      style={{ textShadow: '0 0 30px rgba(108,78,242,0.3)' }}
    >
      You Had 7 Days to Lose Them Forever. We Used Every Single One.
    </h2>
    <div className="inline-block bg-[hsla(43,52%,54%,0.1)] border border-[hsla(43,52%,54%,0.2)] rounded-sm px-4 py-2 mb-10">
      <span className="font-accent text-sm text-gold" style={{ textShadow: '0 0 20px rgba(108,78,242,0.4)' }}>
        Open Rate 21% → 54%
      </span>
    </div>
    <div className="space-y-3">
      {emails.map((email, i) => (
        <EmailAccordion key={i} email={email} index={i} />
      ))}
    </div>
  </div>
);

export default SaasEmailContent;
