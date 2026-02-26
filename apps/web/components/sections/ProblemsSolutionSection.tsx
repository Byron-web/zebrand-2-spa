type Props = {
  heading?: string;
  subheading?: string;
  problemsTitle?: string;
  solutionTitle?: string;
  problems?: string[];
  solutions?: string[];
};

export default function ProblemsSolutionSection({
  heading,
  subheading,
  problemsTitle,
  solutionTitle,
  problems,
  solutions,
}: Props) {
  const h = heading || "Why most homepages fail";
  const sh =
    subheading ||
    "If the hierarchy is unclear, users hesitate. If performance is sloppy, they bounce. If proof is missing, they do not convert.";

  const leftTitle = problemsTitle || "Common leaks";
  const rightTitle = solutionTitle || "Zebrand fix";

  const left =
    Array.isArray(problems) && problems.length
      ? problems
      : [
          "Generic hero copy with no sharp value proposition",
          "Flat sections with no rhythm or emphasis moments",
          "Weak proof: no credibility, no outcomes, no objections handled",
          "Slow, unstable UI and images that do not render reliably",
        ];

  const right =
    Array.isArray(solutions) && solutions.length
      ? solutions
      : [
          "CRO-first structure with clear CTA cadence",
          "Premium UI system with consistent spacing and type scale",
          "Proof blocks, testimonials, FAQs, and internal links",
          "Performance-safe Next.js patterns and image stability",
        ];

  return (
    <section className="z-section" aria-label="Problems and solution">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">{h}</h2>
          <p className="z-lede">{sh}</p>
        </div>

        <div className="z-two-cards">
          <div className="z-card-soft z-card-pad">
            <div className="z-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 7h10M7 12h6M7 17h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="z-h3" style={{ marginTop: 12 }}>
              {leftTitle}
            </h3>
            <ul className="z-checks" style={{ marginTop: 12 }}>
              {left.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="z-card z-card-pad">
            <div className="z-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 7l-9 10-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="z-h3" style={{ marginTop: 12 }}>
              {rightTitle}
            </h3>
            <ul className="z-checks" style={{ marginTop: 12 }}>
              {right.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
