const AdCard = ({ platform, primaryText, headline, cta }: { platform: string; primaryText: string[]; headline: string; cta: string }) => (
  <div className="bg-[hsla(43,52%,54%,0.05)] border border-[hsla(43,52%,54%,0.12)] rounded-sm p-6 flex-1">
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

const StoryFrame = ({ frame, text }: { frame: string; text: string }) => (
  <div className="bg-[hsla(43,52%,54%,0.04)] border border-[hsla(43,52%,54%,0.1)] rounded-sm p-3 text-center">
    <span className="font-accent text-[9px] uppercase tracking-[0.15em] text-gold/50 block mb-1">{frame}</span>
    <p className="font-body text-cream text-[12px] leading-[1.6]">{text}</p>
  </div>
);

const FitnessAdsContent = () => (
  <div>
    <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-4 block">
      Social Media Ad Campaign — 3 Angles, 9 Creatives
    </span>
    <h2
      className="font-display text-2xl sm:text-3xl md:text-4xl text-gold mb-4 leading-[1.2] tracking-[-0.02em]"
      style={{ textShadow: '0 0 30px rgba(184, 112, 63,0.3)' }}
    >
      Ads So Sharp, They Cut the Cost Before Anyone Even Clicked.
    </h2>
    <div className="inline-block bg-[hsla(43,52%,54%,0.1)] border border-[hsla(43,52%,54%,0.2)] rounded-sm px-4 py-2 mb-12">
      <span className="font-accent text-sm text-gold" style={{ textShadow: '0 0 20px rgba(184, 112, 63,0.4)' }}>
        CPA Cut 62% in 30 Days
      </span>
    </div>

    {/* AD SET 1 */}
    <div className="mb-12">
      <h3 className="font-display text-xl text-white-headline mb-6 tracking-[-0.02em]">
        Ad Set 1 — <span className="text-gold">Pattern Interrupt Angle</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AdCard
          platform="Facebook / Instagram Feed"
          primaryText={[
            "Stop scrolling. This isn't another fitness ad.",
            "You don't need a 90-day transformation. You need to feel strong getting out of bed tomorrow morning.",
            "[App Name] was built for people who've tried everything — the apps that guilt you, the programs that bore you, the plans that assume you have 2 free hours a day.",
            "This is different. 15-minute workouts. Adaptive difficulty. A coach that learns how you move.",
            "Your body isn't the problem. Your last app was."
          ]}
          headline="You're Closer Than You Think. Start Free."
          cta="Download Free →"
        />
        <AdCard
          platform="Facebook / Instagram Feed"
          primaryText={[
            "What if the reason you \"can't stick to a workout plan\" isn't discipline?",
            "What if it's because every plan you've tried was designed for someone who's already fit?",
            "[App Name] starts where you actually are. Not where some influencer thinks you should be.",
            "No equipment. No judgment. No 5am alarm clock culture.",
            "Just you, 15 minutes, and the proof that consistency doesn't require punishment."
          ]}
          headline="Fitness That Meets You Where You Are."
          cta="Try It Free →"
        />
      </div>
    </div>

    {/* AD SET 2 */}
    <div className="mb-12">
      <h3 className="font-display text-xl text-white-headline mb-6 tracking-[-0.02em]">
        Ad Set 2 — <span className="text-gold">Identity / Aspiration Angle</span>
      </h3>

      <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-gold/50 mb-4">Ad 2A — Instagram Stories Sequence</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        <StoryFrame frame="Frame 1" text="She didn't join a gym. She opened an app." />
        <StoryFrame frame="Frame 2" text="15 minutes a day. No equipment. No excuses." />
        <StoryFrame frame="Frame 3" text="By week 2, she wasn't doing it for the results." />
        <StoryFrame frame="Frame 4" text="She was doing it because she finally felt like herself." />
        <StoryFrame frame="Frame 5" text="[App Name]. Start free today." />
      </div>

      <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-gold/50 mb-4">Ad 2B — Instagram Reel Script</p>
      <div className="bg-[hsla(43,52%,54%,0.05)] border border-[hsla(43,52%,54%,0.12)] rounded-sm p-6">
        {[
          { label: 'Hook', text: '"POV: You finally found a workout app that doesn\'t make you feel like garbage for being a beginner."' },
          { label: 'Body', text: '[Show phone screen — app dashboard. Quick cuts of someone doing easy, follow-along movements at home. Upbeat but chill music.]\n\nVoiceover: "No burpees. No yelling. No 6am guilt trips. Just 15 minutes, your living room, and the feeling of actually finishing something today."' },
          { label: 'Close', text: '"[App Name] — Fitness that doesn\'t feel like punishment. Link in bio."' },
        ].map((part) => (
          <div key={part.label} className="mb-5 last:mb-0">
            <span className="font-accent text-[10px] uppercase tracking-[0.15em] text-[#B8703F] font-bold block mb-1">{part.label}</span>
            <p className="font-body text-cream text-[14px] leading-[1.7] whitespace-pre-line">{part.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* AD SET 3 */}
    <div>
      <h3 className="font-display text-xl text-white-headline mb-6 tracking-[-0.02em]">
        Ad Set 3 — <span className="text-gold">Objection Handling Angle</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AdCard
          platform="Facebook Feed"
          primaryText={[
            "\"I don't have time to work out.\"",
            "You have 15 minutes. You spent longer than that deciding what to watch on Netflix last night.",
            "[App Name] workouts are 15 minutes or less. No equipment. No commute. No changing into \"gym clothes\" and then driving somewhere and then finding parking and then wiping down a bench someone sweated on.",
            "Just press play in your living room. Done before your coffee gets cold.",
            "The \"no time\" excuse is valid. That's exactly why this exists."
          ]}
          headline="15 Minutes. No Equipment. No Excuses."
          cta="Start Your Free Trial →"
        />
        <AdCard
          platform="Instagram Feed"
          primaryText={[
            "\"I always quit after two weeks.\"",
            "That's not a character flaw. That's a design flaw — in every other app you've tried.",
            "[App Name] is built on adaptive difficulty. It starts exactly where you are and adjusts as you grow. No sudden spikes. No ego-driven programming.",
            "It also celebrates small wins. Finished a 10-minute stretch? That counts. Logged in three days in a row? Streak earned.",
            "You didn't fail those other programs. They failed you."
          ]}
          headline="Built for People Who've Quit Everything Else."
          cta="Try It Free →"
        />
      </div>
    </div>
  </div>
);

export default FitnessAdsContent;
