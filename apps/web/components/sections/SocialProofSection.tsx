type Props = {
  heading?: string;
  subheading?: string;
};

export default function SocialProofSection({ heading, subheading }: Props) {
  const h = heading || "Proof, not promises";
  const sh =
    subheading ||
    "Use real logos and numbers later. This block is structured for credibility and scanning.";

  return (
    <section className="z-section" aria-label="Social proof">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">{h}</h2>
          <p className="z-lede">{sh}</p>
        </div>

        <div className="z-card-soft z-card-pad">
          <div className="z-logos" aria-label="Client logos placeholder">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="z-logo-tile">
                Logo
              </div>
            ))}
          </div>

          <div className="z-divider" style={{ margin: "18px 0" }} />

          <div className="z-grid-3" aria-label="Trust stats">
            <div>
              <h3 className="z-h3">Faster decision-making</h3>
              <p className="z-lede" style={{ marginTop: 8, fontSize: 14 }}>
                Clear hierarchy reduces hesitation and improves CTA follow-through.
              </p>
            </div>
            <div>
              <h3 className="z-h3">Higher trust</h3>
              <p className="z-lede" style={{ marginTop: 8, fontSize: 14 }}>
                Proof blocks and objections handling remove “unknowns” early.
              </p>
            </div>
            <div>
              <h3 className="z-h3">Better performance</h3>
              <p className="z-lede" style={{ marginTop: 8, fontSize: 14 }}>
                Stable images, no layout shift, and minimal client JS keeps load reliable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
