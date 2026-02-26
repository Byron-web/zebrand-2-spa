const STEPS = [
  { title: "Discovery", desc: "Goals, audience, offer, and conversion paths. No guessing." },
  { title: "Structure", desc: "Wireframes and section plan that protects messaging hierarchy." },
  { title: "Design", desc: "Premium UI with consistent components and clear interaction." },
  { title: "Build", desc: "Clean implementation with performance and SEO kept intact." },
  { title: "Handover", desc: "CMS training, documentation, and safe editing workflows." },
];

export default function ServicesProcessSection() {
  return (
    <section className="z-section">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">Process</h2>
          <p className="z-sub">Designed to keep standards high and avoid scope drift.</p>
        </div>

        <div className="z-steps">
          {STEPS.map((s, idx) => (
            <div key={s.title} className="z-step">
              <div className="z-step-num">{String(idx + 1).padStart(2, "0")}</div>
              <div className="z-step-body">
                <div className="z-step-title">{s.title}</div>
                <div className="z-step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}