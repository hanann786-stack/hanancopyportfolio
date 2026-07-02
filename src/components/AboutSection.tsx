const credentials = [
  ['IELTS', 'Band 7 · British Council'],
  ['FSc Pre-Medical', 'Punjab Group of Colleges'],
  ['Copyblogger Certified', 'Content Marketer'],
  ['Advanced AI', 'Certification'],
  ['Languages', 'English · Urdu · Punjabi'],
];

const AboutSection = () => (
  <section id="about" className="about">
    <div className="about-grid">
      <div>
        <div className="about-eyebrow">About</div>
        <p className="about-quote">
          I studied biology and human psychology. Then I learned to use both to make people buy things.
        </p>
        <p className="about-body">
          That's the honest version. The longer version is that I spent two years obsessing over why people say yes — and building copy systems that exploit that answer. My background in Pre-Medical psychology isn't a quirk. It's the whole strategy.
        </p>
      </div>
      <div className="about-right">
        <div className="about-eyebrow">Credentials</div>
        <div>
          {credentials.map(([k, v]) => (
            <div key={k} className="about-row">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
