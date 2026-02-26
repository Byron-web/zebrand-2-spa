import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="z-footer" role="contentinfo">
      <div className="z-container">
        <div className="z-footer-grid">
          <div>
            <div className="z-brand" aria-label="Zebrand">
              <span className="z-dot" aria-hidden="true" />
              <span>Zebrand</span>
            </div>

            <p className="z-lede" style={{ marginTop: 10 }}>
              Premium marketing sites built with conversion-first UX, clean structure, and
              performance-safe implementation.
            </p>

            <p className="z-small" style={{ marginTop: 10, maxWidth: "70ch" }}>
              This homepage is a production-grade draft layout: swap imagery and copy when the final
              brand messaging is approved.
            </p>
          </div>

          <div>
            <h3 className="z-footer-title">Pages</h3>
            <div className="z-footer-links">
              <Link href="/home">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
            </div>
          </div>

          <div>
            <h3 className="z-footer-title">Capabilities</h3>
            <div className="z-footer-links">
              <Link href="/services">Marketing websites</Link>
              <Link href="/services">Landing pages & CRO</Link>
              <Link href="/services">CMS build & handover</Link>
            </div>
          </div>
        </div>

        <div className="z-footer-small">
          <span>© Zebrand. All rights reserved.</span>
          <span>Built by Freelance IT Solutions.</span>
        </div>
      </div>
    </footer>
  );
}
