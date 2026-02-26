type Item = {
  title?: string;
  description?: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  items?: Item[];
};

export default function ServicesGridSection({ heading, subheading, items }: Props) {
  const h = heading || "What makes this rebuild feel premium";
  const sh =
    subheading ||
    "Three pillars: polish, structure, and trust. Everything else is decoration.";

  const list =
    Array.isArray(items) && items.length
      ? items
      : [
          {
            title: "SaaS-grade UI system",
            description:
              "Consistent type scale, spacing rhythm, radius, borders, and shadows. No repeated bland blocks.",
          },
          {
            title: "CRO-first section flow",
            description:
              "Value prop, proof, differentiators, process, objections, then close. Built to reduce hesitation.",
          },
          {
            title: "SEO and accessibility baked in",
            description:
              "Semantic structure, heading order, link structure, focus states, and reduced-motion defaults.",
          },
        ];

  const icons = [
    <svg key="i1" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 8h10M7 12h10M7 16h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>,
    <svg key="i2" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6v12M6 12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12a8 8 0 1 0 16 0a8 8 0 0 0-16 0Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    <svg key="i3" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2l4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];

  return (
    <section className="z-section" aria-label="Differentiators">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">{h}</h2>
          <p className="z-lede">{sh}</p>
        </div>

        <div className="z-grid-3">
          {list.map((it, idx) => (
            <div key={it.title || idx} className="z-card-soft z-card-pad">
              <div className="z-icon" aria-hidden="true">
                {icons[idx] || icons[0]}
              </div>
              <h3 className="z-h3" style={{ marginTop: 12 }}>
                {it.title}
              </h3>
              <p className="z-lede" style={{ marginTop: 10, fontSize: 14 }}>
                {it.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
