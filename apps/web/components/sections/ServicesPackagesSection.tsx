const PACKAGES = [
  {
    title: "Marketing Website",
    price: "Fixed scope",
    bullets: ["Premium design system", "Core pages + conversion sections", "SEO foundations", "Analytics + tracking setup"],
    note: "Best for companies needing a high-trust web presence.",
  },
  {
    title: "Landing Pages & CRO",
    price: "Campaign based",
    bullets: ["High-conversion layout", "Messaging refinement", "A/B test ready structure", "Speed-focused build"],
    note: "Best for paid traffic and campaign launches.",
  },
  {
    title: "CMS Build & Handover",
    price: "Retainer optional",
    bullets: ["Strapi structure and modelling", "Reusable components", "Editor training + docs", "Safe content workflows"],
    note: "Best for teams that need autonomy after launch.",
  },
];

export default function ServicesPackagesSection() {
  return (
    <section className="z-section" id="packages">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">Packages</h2>
          <p className="z-sub">
            Choose a lane, keep the quality. Each package is built around clean structure and measurable outcomes.
          </p>
        </div>

        <div className="z-cards z-cards-3">
          {PACKAGES.map((p) => (
            <article key={p.title} className="z-card z-card-strong">
              <div className="z-card-top">
                <h3 className="z-card-title">{p.title}</h3>
                <div className="z-pill">{p.price}</div>
              </div>

              <ul className="z-list">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <p className="z-card-desc">{p.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}