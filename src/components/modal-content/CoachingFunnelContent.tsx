import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdCard = ({ platform, primaryText, headline, cta }: { platform: string; primaryText: string[]; headline: string; cta: string }) => (
  <div className="bg-[hsla(43,52%,54%,0.05)] border border-[hsla(43,52%,54%,0.12)] rounded-sm p-6 mb-5">
    <span className="font-accent text-[10px] uppercase tracking-[0.15em] text-gold/60 mb-4 block">{platform}</span>
    <div className="space-y-3 mb-5">
      {primaryText.map((line, i) => (
        <p key={i} className="font-body text-cream text-[14px] leading-[1.7]">{line}</p>
      ))}
    </div>
    <p className="font-display text-lg text-white-headline mb-4">{headline}</p>
    <span className="inline-block bg-[#B8703F] text-white font-accent text-[10px] uppercase tracking-[0.1em] px-5 py-2.5 rounded-sm">
      {cta}
    </span>
  </div>
);

const Divider = () => <div className="w-full h-px bg-[hsla(43,52%,54%,0.15)] my-10" />;

const AdCopyTab = () => (
  <div>
    <AdCard
      platform="Facebook / Instagram Feed — Ad 1"
      primaryText={[
        "You don't need another course.",
        "You've taken the courses. You've read the books. You've watched the masterclasses. And you're still stuck in the same place — knowing exactly what to do, but not doing it.",
        "Because knowledge isn't the problem. It never was.",
        "The problem is the pattern you can't see. The story you keep telling yourself. The invisible ceiling you built with beliefs you didn't know you had.",
        "[Coach Name] doesn't teach you more. He shows you what's in the way — and then he helps you dismantle it. Permanently.",
        "This isn't therapy. This isn't a course. This is the conversation that changes the trajectory."
      ]}
      headline="Stop Learning. Start Becoming."
      cta="Book a Discovery Call →"
    />
    <AdCard
      platform="Facebook / Instagram Feed — Ad 2"
      primaryText={[
        "His clients don't come to him because they're broken.",
        "They come because they're successful — and stuck. Making great money but feeling empty. Hitting goals but not feeling fulfilled. Performing at a high level and quietly wondering: is this it?",
        "[Coach Name] works with high-performers who've outgrown their current version. CEOs. Founders. Creative directors. People who've won the game and realized it was the wrong game.",
        "The work isn't about fixing what's wrong. It's about finally building what's right.",
        "If you've done everything \"right\" and it still doesn't feel right — this is the conversation you've been avoiding."
      ]}
      headline="For High-Performers Who've Outgrown Their Own Success."
      cta="Apply for a Session →"
    />
    <AdCard
      platform="Instagram Stories"
      primaryText={[
        "Frame 1: \"He charges $3,000 per session.\"",
        "Frame 2: \"His clients say it's the best investment they've ever made.\"",
        "Frame 3: \"Not because of what he teaches.\"",
        "Frame 4: \"Because of what he helps them see.\"",
        "Frame 5: \"[Coach Name]. Book a discovery call. Link in bio.\""
      ]}
      headline=""
      cta="Book a Call →"
    />
  </div>
);

const LandingPageTab = () => (
  <div>
    {/* HERO */}
    <div className="text-center mb-2">
      <h2
        className="font-display text-3xl md:text-4xl text-white-headline leading-[1.15] tracking-[-0.03em] mb-5"
        style={{ textShadow: '0 0 30px rgba(184, 112, 63,0.15)' }}
      >
        You Don't Need More Advice. You Need{' '}
        <span className="text-gold">the Right Conversation.</span>
      </h2>
      <p className="font-body text-cream/80 text-base md:text-lg max-w-[52ch] mx-auto mb-8 leading-relaxed">
        High-performance coaching for founders, executives, and leaders who've outgrown every framework — and are ready to build from the inside out.
      </p>
      <span className="inline-block bg-[#B8703F] text-white font-accent text-[12px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-sm">
        Book Your Discovery Call →
      </span>
    </div>

    <Divider />

    {/* PROBLEM */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-4 block">The Problem</span>
      <h3 className="font-display text-2xl text-white-headline mb-5 tracking-[-0.02em]">
        You've Won the Game. So Why Does It Feel Like <span className="text-[#B8703F] font-bold">You're Losing?</span>
      </h3>
      <p className="font-body text-cream text-[16px] leading-[1.7] max-w-[64ch] mb-4">
        You've built something real. Revenue. Team. Reputation. By every external measure, you've made it. But internally? Something shifted. The drive that used to fuel you now feels like a treadmill. The success you chased is here — and it's not enough.
      </p>
      <p className="font-body text-cream text-[16px] leading-[1.7] max-w-[64ch]">
        You don't need a motivational speaker. You don't need another mastermind. You need someone who can see the pattern you can't — and help you build something that actually matters to the person you're becoming.
      </p>
    </div>

    <Divider />

    {/* THE OFFER */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-4 block">The Coaching</span>
      <h3 className="font-display text-2xl text-white-headline mb-6 tracking-[-0.02em]">
        What <span className="text-gold">Working Together</span> Looks Like
      </h3>
      <ul className="space-y-3 mb-6">
        {[
          '1-on-1 deep sessions (90 minutes, bi-weekly)',
          'Custom framework built around your specific blind spots',
          'Voxer access between sessions for real-time breakthroughs',
          'Identity-level work — not surface-level goal setting',
          'A 90-day container designed for permanent transformation',
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="text-gold mt-1">✦</span>
            <span className="font-body text-cream text-[15px] leading-[1.6]">{item}</span>
          </li>
        ))}
      </ul>
      <p className="font-body text-cream/60 italic text-sm">Investment: $3,000/month · 3-month minimum · Application required</p>
    </div>

    <Divider />

    {/* SOCIAL PROOF */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-6 block">Client Results</span>
      <div className="space-y-6">
        {[
          { quote: "I came in wanting to scale my business. I left understanding why I was afraid to. That distinction changed everything — revenue doubled in 6 months, but more importantly, I actually enjoy what I'm building now.", name: 'David K.', detail: 'Founder & CEO, SaaS' },
          { quote: "I've worked with three coaches before this. The difference? He didn't give me a playbook. He helped me see the story I'd been telling myself for 15 years — and rewrite it. I'm a different leader now.", name: 'Sarah M.', detail: 'VP of Operations' },
          { quote: "The ROI isn't even a question. One insight from our third session saved me from a $200K hiring mistake. But the real value? I sleep at night now. I make decisions without the anxiety spiral.", name: 'Alex T.', detail: 'Serial Entrepreneur' },
        ].map((t) => (
          <div key={t.name} className="border-l-2 border-gold/30 pl-6">
            <p className="font-body text-cream italic text-[15px] leading-[1.7] mb-2">"{t.quote}"</p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-gold/70">{t.name} — {t.detail}</p>
          </div>
        ))}
      </div>
    </div>

    <Divider />

    {/* FINAL CTA */}
    <div className="text-center">
      <h3 className="font-display text-2xl md:text-3xl text-white-headline mb-4 tracking-[-0.02em]">
        The Next Version of You Is <span className="text-gold">One Conversation Away.</span>
      </h3>
      <p className="font-body text-cream/70 text-base max-w-[48ch] mx-auto mb-8 leading-relaxed">
        Discovery calls are free, confidential, and zero-pressure. If it's not the right fit, we'll both know in 15 minutes.
      </p>
      <span className="inline-block bg-[#B8703F] text-white font-accent text-[12px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-sm">
        Book Your Discovery Call →
      </span>
    </div>
  </div>
);

const CoachingFunnelContent = () => {
  const [activeTab, setActiveTab] = useState<'ads' | 'landing'>('ads');

  return (
    <div>
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-4 block">
        Ad Copy + Landing Page — High-Ticket Coaching Funnel
      </span>
      <h2
        className="font-display text-2xl sm:text-3xl md:text-4xl text-gold mb-4 leading-[1.2] tracking-[-0.02em]"
        style={{ textShadow: '0 0 30px rgba(184, 112, 63,0.3)' }}
      >
        47 Discovery Calls in 14 Days. No Discounts. No Desperation. Just Copy.
      </h2>
      <div className="inline-block bg-[hsla(43,52%,54%,0.1)] border border-[hsla(43,52%,54%,0.2)] rounded-sm px-4 py-2 mb-8">
        <span className="font-accent text-sm text-gold" style={{ textShadow: '0 0 20px rgba(184, 112, 63,0.4)' }}>
          47 Discovery Calls in 14 Days
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-10">
        <button
          onClick={() => setActiveTab('ads')}
          className={`font-accent text-[12px] uppercase tracking-[0.12em] px-5 py-2.5 rounded-sm border transition-all ${
            activeTab === 'ads'
              ? 'bg-gold text-[#F5F0E8] border-gold'
              : 'bg-transparent text-gold border-gold/40 hover:border-gold'
          }`}
          data-clickable
        >
          Ad Copy
        </button>
        <button
          onClick={() => setActiveTab('landing')}
          className={`font-accent text-[12px] uppercase tracking-[0.12em] px-5 py-2.5 rounded-sm border transition-all ${
            activeTab === 'landing'
              ? 'bg-gold text-[#F5F0E8] border-gold'
              : 'bg-transparent text-gold border-gold/40 hover:border-gold'
          }`}
          data-clickable
        >
          Landing Page
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ads' ? (
          <motion.div
            key="ads"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AdCopyTab />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LandingPageTab />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoachingFunnelContent;
