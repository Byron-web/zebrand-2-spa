type Step = {
  title?: string;
  description?: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  steps?: Step[];
};

export default function ProcessStepsSection({ heading, subheading, steps }: Props) {
  const h = heading || "How the rebuild gets done";
  const sh =
    subheading ||
    "Fast, controlled, and reviewable. The output is production-grade, not a concept.";

  const list =
    Array.isArray(steps) && steps.length
      ? steps
      : [
          {
            title: "Audit & plan",
            description:
              "Map the current homepage leaks: hierarchy, proof, CTA cadence, performance, and SEO structure.",
          },
          {
            title: "Design system + layout",
            description:
              "Build a stable class-based system and a premium layout that stays consistent across sections.",
          },
          {
            title: "Refine + ship",
            description:
              "Tighten copy blocks, add objections handling, ensure a11y and performance, then finalise.",
          },
        ];

  return (
    <section className="z-section" aria-label="Process">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">{h}</h2>
          <p className="z-lede">{sh}</p>
        </div>

        <div className="z-grid-3">
          {list.map((step, i) => (
            <div key={step.title || i} className="z-card z-card-pad">
              <div className="z-icon" aria-hidden="true">
                <span style={{ fontWeight: 900, fontSize: 13 }}>{i + 1}</span>
              </div>
              <h3 className="z-h3" style={{ marginTop: 12 }}>
                {step.title}
              </h3>
              <p className="z-lede" style={{ marginTop: 10, fontSize: 14 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
