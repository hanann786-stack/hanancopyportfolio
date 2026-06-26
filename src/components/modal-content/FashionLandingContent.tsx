const Divider = () => (
  <div className="w-full h-px bg-[hsla(43,52%,54%,0.15)] my-10" />
);

const FashionLandingContent = () => (
  <div>
    <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-gold/60 mb-8 block">
      Landing Page Preview — Meridian Fashion Collection
    </span>

    {/* HERO */}
    <div className="text-center mb-2">
      <p className="font-accent text-[11px] uppercase tracking-[0.2em] text-gold/50 mb-4">
        The Meridian Collection — Limited Release
      </p>
      <h2
        className="font-display text-3xl md:text-5xl text-white-headline leading-[1.1] tracking-[-0.03em] mb-5"
        style={{ textShadow: '0 0 30px rgba(184, 112, 63,0.15)' }}
      >
        This Isn't Fashion. This Is <span className="text-gold">a Declaration.</span>
      </h2>
      <p className="font-body text-cream/80 text-base md:text-lg max-w-[54ch] mx-auto mb-8 leading-relaxed">
        27 pieces. One philosophy. For the ones who don't follow trends — they set the standard and let the world catch up.
      </p>
      <span className="inline-block bg-[#B8703F] text-white font-accent text-[12px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-sm">
        Explore the Collection →
      </span>
    </div>

    <Divider />

    {/* BRAND STORY */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-4 block">The Story</span>
      <h3 className="font-display text-2xl md:text-3xl text-white-headline mb-5 tracking-[-0.02em]">
        We Didn't Design a Collection. We Built a <span className="text-gold">World.</span>
      </h3>
      <p className="font-body text-cream text-[16px] leading-[1.7] max-w-[64ch] mb-4">
        Meridian started with a question: What would clothes look like if they were designed for the person you're becoming — not the person you were yesterday?
      </p>
      <p className="font-body text-cream text-[16px] leading-[1.7] max-w-[64ch] mb-4">
        Every fabric was chosen for how it moves, not just how it looks. Every silhouette was cut to feel intentional — the kind of intentional that turns heads without trying. Every detail, from the stitching weight to the hardware finish, was considered with one principle: this should feel like it was made for you. Because it was.
      </p>
      <p className="font-body text-gold/80 italic text-[16px] leading-[1.7] max-w-[64ch]">
        Meridian isn't a brand you wear. It's a standard you carry.
      </p>
    </div>

    <Divider />

    {/* PRODUCTS */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-6 block">The Pieces</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            name: 'The Architect Coat',
            desc: 'Structured. Unapologetic. A wool-cashmere overcoat with a silhouette that commands every room before you say a word. Lined in silk. Finished with matte black hardware. The kind of coat that makes people ask where you got it — and you don\'t tell them.',
            price: '$485',
          },
          {
            name: 'The Aura Knit',
            desc: 'A ribbed merino crewneck in a weight that works year-round. Slim without being tight. Relaxed without being sloppy. The piece you reach for when you want to look like you didn\'t try — even though the fit says otherwise.',
            price: '$165',
          },
          {
            name: 'The Foundation Trouser',
            desc: 'High-waisted. Perfectly tapered. Cut in Japanese cotton-twill with just enough stretch to move with you. Designed to make everything you pair with it look more expensive. The trouser equivalent of a cheat code.',
            price: '$220',
          },
        ].map((p) => (
          <div key={p.name} className="bg-[hsla(43,52%,54%,0.05)] border border-[hsla(43,52%,54%,0.12)] p-6 rounded-sm">
            <h4 className="font-display text-lg text-white-headline mb-3">{p.name}</h4>
            <p className="font-body text-cream/80 text-[14px] leading-[1.7] mb-4">{p.desc}</p>
            <span className="font-accent text-sm text-gold" style={{ textShadow: '0 0 20px rgba(184, 112, 63,0.4)' }}>{p.price}</span>
          </div>
        ))}
      </div>
    </div>

    <Divider />

    {/* SOCIAL PROOF */}
    <div className="mb-2">
      <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold/50 mb-6 block">First Impressions</span>
      <div className="space-y-6">
        {[
          { quote: "I've bought designer pieces that cost three times this and felt half as considered. Meridian understands something most brands don't: luxury isn't a price tag — it's a feeling.", name: 'James R.', detail: 'Creative Director' },
          { quote: "The Architect Coat is the best piece of clothing I've ever owned. Full stop. I've worn it every day for three weeks and I still catch myself in the mirror.", name: 'Anika S.', detail: 'Brand Strategist' },
          { quote: "This is what happens when a fashion brand actually respects its customer. No logos screaming for attention. Just beautifully made clothes that speak for themselves.", name: 'Marcus L.', detail: 'Entrepreneur' },
        ].map((t) => (
          <div key={t.name} className="border-l-2 border-gold/30 pl-6">
            <p className="font-body text-cream italic text-[15px] leading-[1.7] mb-2">"{t.quote}"</p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-gold/70">{t.name} — {t.detail}</p>
          </div>
        ))}
      </div>
    </div>

    <Divider />

    {/* SCARCITY + FINAL CTA */}
    <div className="text-center">
      <h3 className="font-display text-2xl md:text-3xl text-white-headline mb-4 tracking-[-0.02em]">
        27 Pieces. <span className="text-[#B8703F] font-bold">Limited</span> Inventory. No Restocks.
      </h3>
      <p className="font-body text-cream/70 text-base max-w-[50ch] mx-auto mb-8 leading-relaxed">
        When they're gone, they're gone. This isn't artificial scarcity — it's intentional craft. Every piece is produced in limited runs because quality at this level doesn't scale.
      </p>
      <span className="inline-block bg-[#B8703F] text-white font-accent text-[12px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-sm">
        Shop the Collection Before It's Gone →
      </span>
    </div>
  </div>
);

export default FashionLandingContent;
