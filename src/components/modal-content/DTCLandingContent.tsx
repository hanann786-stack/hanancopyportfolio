const Divider = () => (
  <div className="w-full h-px bg-[hsla(43,52%,54%,0.15)] my-10" />
);

const DTCLandingContent = () => (
  <div>
    <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-gold/60 mb-8 block">
      Landing Page Preview — DTC Skincare Brand
    </span>

    {/* HERO */}
    <div className="text-center mb-2">
      <p className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-3">
        Clinically Proven. Dermatologist Developed. Finally Yours.
      </p>
      <h2
        className="font-display text-3xl md:text-5xl text-white-headline leading-[1.15] tracking-[-0.03em] mb-5"
        style={{ textShadow: '0 0 30px rgba(108,78,242,0.15)' }}
      >
        Your Skin Doesn't Need More Products.{' '}
        <span className="text-gold">It Needs the Right One.</span>
      </h2>
      <p className="font-body text-cream/80 text-base md:text-lg max-w-[52ch] mx-auto mb-8 leading-relaxed">
        The 3-step system that replaced 9 products on her shelf — and gave her the best skin of her life in 21 days.
      </p>
      <span className="inline-block bg-[#F4622A] text-white font-accent text-[12px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-sm cursor-pointer hover:bg-[#D44E1F] transition-colors">
        Get the System — 30-Day Risk-Free →
      </span>
    </div>

    <Divider />

    {/* THE PROBLEM */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-4 block">The Problem</span>
      <h3 className="font-display text-2xl md:text-3xl text-white-headline mb-5 tracking-[-0.02em]">
        You've Tried Everything. Your Skin Still Isn't <span className="text-[#F4622A] font-bold">Listening.</span>
      </h3>
      <p className="font-body text-cream text-[16px] leading-[1.7] max-w-[64ch] mb-4">
        You've bought the serums. You've followed the routines. You've watched 47 skincare TikToks and still woke up wondering why your skin looks tired, uneven, and quietly angry.
      </p>
      <p className="font-body text-cream text-[16px] leading-[1.7] max-w-[64ch] mb-4">
        It's not your fault. The skincare industry makes money when you're confused. More steps = more products = more profit. But your skin doesn't need a 12-step routine. It needs ingredients that actually work — in the right order, at the right concentration, without the fillers.
      </p>
      <p className="font-body text-cream/70 text-[16px] leading-[1.7] max-w-[64ch] italic">
        The problem was never your skin. It was everything you were putting on it.
      </p>
    </div>

    <Divider />

    {/* THE SOLUTION */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-4 block">The Solution</span>
      <h3 className="font-display text-2xl md:text-3xl text-white-headline mb-8 tracking-[-0.02em]">
        Three Steps. <span className="text-gold">Zero Guesswork.</span> Real Results.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            step: 'Step 1',
            title: 'Cleanse',
            desc: 'A pH-balanced gel cleanser that removes what shouldn\'t be there — without stripping what should. No sulfates. No dryness. Just clean, prepped skin ready to absorb.',
          },
          {
            step: 'Step 2',
            title: 'Treat',
            desc: 'A multi-peptide serum with 4 active ingredients at clinical concentrations. Targets texture, tone, and fine lines simultaneously. One product doing the work of five.',
          },
          {
            step: 'Step 3',
            title: 'Protect',
            desc: 'A weightless SPF 50 moisturizer that doubles as hydration and UV defense. No white cast. No pilling. Wears beautifully under makeup or on its own.',
          },
        ].map((item) => (
          <div key={item.step} className="bg-[hsla(43,52%,54%,0.05)] border border-[hsla(43,52%,54%,0.12)] p-6 rounded-sm">
            <span className="font-accent text-[10px] uppercase tracking-[0.15em] text-gold mb-2 block">{item.step}</span>
            <h4 className="font-display text-xl text-white-headline mb-3">{item.title}</h4>
            <p className="font-body text-cream/80 text-[14px] leading-[1.7]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <Divider />

    {/* SOCIAL PROOF */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-6 block">What They're Saying</span>
      <div className="space-y-6">
        {[
          { quote: "I threw out 9 products after my first week. This system is the only thing my skin has ever responded to. I'm not going back.", name: 'Priya M.', detail: 'Combination skin, age 34' },
          { quote: "I've spent $4,000 on skincare in the last two years. This $89 system outperformed all of it. My derm actually asked me what changed.", name: 'Rachel K.', detail: 'Sensitive skin, age 29' },
          { quote: "My husband noticed on day 11. He never notices anything. That's when I knew this was different.", name: 'Danielle T.', detail: 'Dry skin, age 41' },
        ].map((t) => (
          <div key={t.name} className="border-l-2 border-gold/30 pl-6">
            <p className="font-body text-cream italic text-[15px] leading-[1.7] mb-2">"{t.quote}"</p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-gold/70">{t.name} — {t.detail}</p>
          </div>
        ))}
      </div>
    </div>

    <Divider />

    {/* THE OFFER */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-4 block">What You Get</span>
      <h3 className="font-display text-2xl md:text-3xl text-white-headline mb-6 tracking-[-0.02em]">
        The Complete System — <span className="text-gold">Everything Your Skin Actually Needs</span>
      </h3>
      <ul className="space-y-3 mb-8">
        {[
          'Full-size Purifying Gel Cleanser (120ml) — $38 value',
          'Multi-Peptide Treatment Serum (30ml) — $62 value',
          'Weightless SPF 50 Day Shield (50ml) — $44 value',
          'The 21-Day Glow Protocol (digital guide) — $19 value',
          'Free priority shipping — $8 value',
          '30-day full refund guarantee — priceless peace of mind',
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="text-gold mt-1">✦</span>
            <span className="font-body text-cream text-[15px] leading-[1.6]">{item}</span>
          </li>
        ))}
      </ul>
      <p className="font-body text-cream/60 text-sm mb-2">Total value: $171</p>
      <p className="font-display text-2xl text-gold" style={{ textShadow: '0 0 20px rgba(108,78,242,0.4)' }}>
        Today: $89
      </p>
    </div>

    <Divider />

    {/* FINAL CTA */}
    <div className="text-center">
      <h3 className="font-display text-2xl md:text-3xl text-white-headline mb-4 tracking-[-0.02em]">
        Your Skin Already Knows. <span className="text-gold">Now You Do Too.</span>
      </h3>
      <p className="font-body text-cream/70 text-base max-w-[48ch] mx-auto mb-8 leading-relaxed">
        Join 14,000+ women who stopped guessing and started glowing. Risk-free. Refund if you don't love it.
      </p>
      <span className="inline-block bg-[#F4622A] text-white font-accent text-[12px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-sm">
        Get the System — 30-Day Risk-Free →
      </span>
    </div>
  </div>
);

export default DTCLandingContent;
