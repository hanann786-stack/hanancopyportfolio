import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/use-reveal';

const deliverables = [
  {
    title: 'Product pages that sell the outcome, not the specs',
    desc: 'I rewrite product descriptions, PDP copy, and collection pages so the reader feels the transformation before they reach the buy button.',
  },
  {
    title: 'Email sequences that recover revenue',
    desc: 'Welcome flows, abandoned cart sequences, and post-purchase campaigns written around the real psychology of online buyers.',
  },
  {
    title: 'Paid social copy that stops the scroll',
    desc: 'Facebook, Instagram, and TikTok ads with hooks, proof, and offers that match the headspace of a mobile shopper.',
  },
  {
    title: 'Landing pages built for conversion rate',
    desc: 'Sales pages, VSL scripts, and opt-in pages structured to move visitors from first skim to first purchase.',
  },
];

const process = [
  {
    step: '01',
    title: 'Diagnose the gap',
    desc: 'We audit your current copy, customer reviews, and analytics to find where buyers are dropping off and why.',
  },
  {
    step: '02',
    title: 'Write the voice',
    desc: 'I draft copy that sounds like your brand at its most persuasive, using Cialdini principles and emotional triggers.',
  },
  {
    step: '03',
    title: 'Launch and iterate',
    desc: 'Copy goes live in your store, emails, or ads. We measure what moves revenue and refine from real data.',
  },
];

const EcommerceCopywriting = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Ecommerce Copywriting Services for DTC Brands — Hanan Arif</title>
        <meta
          name="description"
          content="Ecommerce copywriting services for DTC beauty, haircare, fitness and fashion brands. Email sequences, landing pages and ad copy that convert browsers into buyers."
        />
        <meta property="og:title" content="Ecommerce Copywriting Services for DTC Brands — Hanan Arif" />
        <meta
          property="og:description"
          content="Ecommerce copywriting services for DTC brands. Email sequences, landing pages and ad copy that convert."
        />
        <meta property="og:url" content="https://hanancopyportfolio.lovable.app/ecommerce-copywriting-services" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://hanancopyportfolio.lovable.app/ecommerce-copywriting-services" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Ecommerce Copywriting Services',
            provider: {
              '@type': 'Person',
              name: 'Hanan Arif',
              url: 'https://hanancopyportfolio.lovable.app/',
            },
            areaServed: 'Worldwide',
            serviceType: 'Conversion Copywriting for E-commerce Brands',
            description:
              'Ecommerce copywriting services for DTC beauty, haircare, fitness and fashion brands.',
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        <header id="top" className="hero">
          <div className="wrap">
            <p className="hero-kicker hero-anim hero-anim-1">Ecommerce Copywriting Services</p>
            <h1 className="hero-anim hero-anim-2">
              Copy that turns your store into a sales engine.
            </h1>
            <p className="hero-anim hero-anim-3">
              Most ecommerce brands have beautiful products and weak words. I write ecommerce copywriting services for DTC founders in beauty, haircare, fitness, and fashion: product pages, email sequences, landing pages, and paid social ads that move browsers to buyers.
            </p>
            <a
              href="https://calendly.com/hananhereat/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hero-anim hero-anim-4"
            >
              Book a Free 15-Minute Call
            </a>
          </div>
        </header>

        <section className="section">
          <div className="wrap" ref={ref}>
            <h2 className="section-title reveal-up" data-reveal>
              What you get
            </h2>
            <p className="section-sub reveal-up" data-reveal>
              Every deliverable is built around one goal: revenue per visitor. No filler. No jargon. Just copy that sells.
            </p>

            {deliverables.map((d, i) => (
              <div
                key={d.title}
                className="service-row reveal-left"
                data-reveal
                style={{ '--d': `${i * 0.1}s` } as React.CSSProperties}
              >
                <h3 className="service-name">{d.title}</h3>
                <p className="service-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="wrap" ref={ref}>
            <h2 className="section-title reveal-up" data-reveal>
              How it works
            </h2>
            <p className="section-sub reveal-up" data-reveal>
              A three-step process shaped around how ecommerce actually grows.
            </p>

            <div className="process-grid">
              {process.map((p, i) => (
                <div
                  key={p.step}
                  className="process-step reveal-up"
                  data-reveal
                  style={{ '--d': `${i * 0.12}s` } as React.CSSProperties}
                >
                  <span className="process-num">{p.step}</span>
                  <h3 className="process-title">{p.title}</h3>
                  <p className="process-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap" ref={ref}>
            <h2 className="section-title reveal-up" data-reveal>
              Built for store owners, not agencies
            </h2>
            <p className="section-sub reveal-up" data-reveal>
              I work directly with DTC founders and in-house teams who are tired of copy that sounds like everyone else. The focus is always on the same thing your P&L cares about: more sales from the traffic you already have.
            </p>
            <div className="result-mini reveal-left" data-reveal style={{ '--d': '0.15s' } as React.CSSProperties}>
              <p className="result-num">47%</p>
              <p className="result-label">Average email open rate across recent ecommerce sequences.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="wrap" ref={ref}>
            <h2 className="cta-head reveal-fade" data-reveal>
              Ready to see what better ecommerce copy looks like for your brand?
            </h2>
            <a
              href="https://calendly.com/hananhereat/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-pulse reveal-fade"
              data-reveal
              style={{ '--d': '0.15s' } as React.CSSProperties}
            >
              Book a Free 15-Minute Call
            </a>
            <p className="cta-email reveal-fade" data-reveal style={{ '--d': '0.25s' } as React.CSSProperties}>
              Or email me directly:{" "}
              <a href="mailto:hananhereat@gmail.com" className="link-underline">
                hananhereat@gmail.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EcommerceCopywriting;
