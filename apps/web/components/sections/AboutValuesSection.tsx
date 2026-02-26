const VALUES = [
  { title: "Craft", desc: "Details matter. Typography, spacing, and interaction all signal trust." },
  { title: "Speed", desc: "Performance is a feature. Fast pages convert better and rank better." },
  { title: "Clarity", desc: "Simple systems win. Clean components, clean CMS, clean handover." },
  { title: "Ownership", desc: "You should not need a developer for every change. We build for autonomy." },
];

export default function AboutValuesSection() {
  return (
    <section className="z-section">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">Principles that drive the work</h2>
          <p className="z-sub">Every decision maps back to conversion, maintainability, and brand perception.</p>
        </div>

        <div className="z-cards">
          {VALUES.map((v) => (
            <article key={v.title} className="z-card">
              <h3 className="z-card-title">{v.title}</h3>
              <p className="z-card-desc">{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}