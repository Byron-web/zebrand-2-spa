type Item = { q: string; a: string };

type Props = {
  heading?: string;
  subheading?: string;
  items?: Item[];
};

export default function FAQSection({ heading, subheading, items }: Props) {
  const h = heading || "FAQs";
  const sh = subheading || "Answer objections before they become drop-offs.";

  const list: Item[] =
    Array.isArray(items) && items.length
      ? items
      : [
          {
            q: "Is this just a design refresh?",
            a: "No. This is a conversion-first rebuild: structure, hierarchy, proof, accessibility, and performance are treated as core requirements.",
          },
          {
            q: "Will this be SEO-safe?",
            a: "Yes. Semantic structure, heading order, internal links, and copy blocks are built in. FAQ content aligns with on-page content.",
          },
          {
            q: "Will it stay stable in Next.js?",
            a: "Yes. No styled-jsx, no fragile @apply usage, minimal client JS, and stable image rendering using local assets.",
          },
          {
            q: "How do we swap content later?",
            a: "Replace section props from Strapi (or hardcode). The layout is componentised, consistent, and safe to extend.",
          },
        ];

  return (
    <section className="z-section" aria-label="Frequently asked questions">
      <div className="z-container">
        <div className="z-section-head">
          <h2 className="z-h2">{h}</h2>
          <p className="z-lede">{sh}</p>
        </div>

        <div className="z-faq">
          {list.map((it) => (
            <details key={it.q}>
              <summary>{it.q}</summary>
              <div className="z-faq-body">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
