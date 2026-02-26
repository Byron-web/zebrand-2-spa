export default function AboutStorySection() {
  return (
    <section className="z-section">
      <div className="z-container">
        <div className="z-split">
          <div>
            <h2 className="z-h2">Why Zebrand exists</h2>
            <p className="z-p">
              Most sites fail for boring reasons: slow pages, unclear messaging, and a CMS nobody wants to touch.
              Zebrand fixes the fundamentals first, then adds the polish.
            </p>
            <p className="z-p">
              The result is a site that feels premium, stays maintainable, and makes growth teams faster instead
              of dependent.
            </p>
          </div>

          <div className="z-panel">
            <h3 className="z-h3">What you get</h3>
            <ul className="z-list">
              <li>Clear page structure with measurable CTAs</li>
              <li>Component-led sections that keep design consistent</li>
              <li>SEO foundations that do not break during edits</li>
              <li>Handover that your team can actually use</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}