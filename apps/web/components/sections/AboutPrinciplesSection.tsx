const POINTS = [
  { title: "Conversion-first UX", desc: "Message hierarchy, friction reduction, and intentional CTAs." },
  { title: "Design consistency", desc: "Reusable sections that keep pages cohesive as the site grows." },
  { title: "CMS structure", desc: "Pages built around components and fields clients understand." },
  { title: "Performance-safe delivery", desc: "No heavy bloat, no fragile plugins, and no surprises after launch." },
];

export default function AboutPrinciplesSection() {
  return (
    <section className="z-section">
      <div className="z-container">
        <div className="z-grid-2">
          <div>
            <h2 className="z-h2">How we work</h2>
            <p className="z-p">
              The process is designed to protect quality. We avoid the two common traps: shipping something pretty
              but hollow, or shipping something functional but bland.
            </p>
            <p className="z-p">
              You get a premium interface, an implementation that stays clean, and a CMS model that does not
              fight your team.
            </p>
          </div>

          <div className="z-stack">
            {POINTS.map((p) => (
              <div key={p.title} className="z-mini">
                <div className="z-mini-title">{p.title}</div>
                <div className="z-mini-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}