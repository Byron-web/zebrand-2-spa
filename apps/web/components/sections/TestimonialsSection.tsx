type Quote = {
  name: string;
  role: string;
  quote: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  items?: Quote[];
};

export default function TestimonialsSection({ heading, subheading, items }: Props) {
  const h = heading || "What stakeholders actually care about";
  const sh =
    subheading ||
    "Short, outcome-driven proof. Replace with real testimonials when available.";

  const list: Quote[] =
    Array.isArray(items) && items.length
      ? items
      : [
          {
            name: "Director",
            role: "Services business",
            quote:
              "The site finally feels premium. The flow makes sense, and the CTA moments are exactly where they should be.",
          },
          {
            name: "Marketing lead",
            role: "B2B",
            quote:
              "Load feels instant and the structure is easy to scan. Proof and FAQs remove the usual objections.",
          },
          {
            name: "Ops manager",
            role: "Internal stakeholder",
            quote:
              "Clean system. No weird build fragility. The components are consistent and easy to maintain.",
          },
        ];

  return (
    <section className="z-section" aria-label="Testimonials">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">{h}</h2>
          <p className="z-lede">{sh}</p>
        </div>

        <div className="z-grid-3">
          {list.map((q) => (
            <div key={q.quote} className="z-card-soft z-card-pad">
              <p className="z-lede" style={{ margin: 0, fontSize: 14 }}>
                “{q.quote}”
              </p>
              <div style={{ marginTop: 14 }}>
                <div className="z-h3" style={{ fontSize: 14 }}>
                  {q.name}
                </div>
                <div className="z-small">{q.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
