import Link from "next/link";

type Props = {
  heading?: string;
  subheading?: string;
};

export default function FinalCtaSection({ heading, subheading }: Props) {
  const h = heading || "Ready to raise your web standard?";
  const sh =
    subheading ||
    "Book a quick audit and walk away with a clear priority list: messaging, UX, performance, and SEO fundamentals.";

  return (
    <section className="z-section" aria-label="Final call to action">
      <div className="z-container">
        <div className="z-card z-cta">
          <div className="z-grid-2">
            <div>
              <h2 className="z-h2">{h}</h2>
              <p className="z-lead">{sh}</p>
            </div>

            <div className="z-cta-actions">
              <Link className="z-btn" href="/services">
                Get a free audit
              </Link>
              <Link className="z-btn z-btn-ghost" href="/services">
                View services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}