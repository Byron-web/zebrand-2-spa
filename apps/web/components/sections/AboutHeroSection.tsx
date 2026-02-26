import Image from "next/image";
import Link from "next/link";

export default function AboutHeroSection() {
  return (
    <section className="z-hero">
      <div className="z-container">
        <div className="z-hero-grid">
          <div>
            <p className="z-kicker">About</p>
            <h1 className="z-h1">Built for teams who refuse average.</h1>
            <p className="z-lead">
              Zebrand designs and engineers premium marketing websites that load fast, look world class, and ship
              with a clean CMS structure your team can run without developers.
            </p>

            <div className="z-hero-actions">
              <Link className="z-btn" href="/services">
                See services
              </Link>
              <Link className="z-btn z-btn-ghost" href="/services">
                Get a free audit
              </Link>
            </div>

            <ul className="z-hero-bullets" aria-label="What we optimise">
              <li>
                <span className="z-bullet-dot" aria-hidden="true" />
                Conversion-first UX
              </li>
              <li>
                <span className="z-bullet-dot" aria-hidden="true" />
                Performance-safe implementation
              </li>
              <li>
                <span className="z-bullet-dot" aria-hidden="true" />
                CMS clarity and handover
              </li>
            </ul>
          </div>

          <div className="z-hero-media" aria-hidden="true">
            <div className="z-hero-card">
              <Image src="/media/about-hero.svg" alt="" width={760} height={560} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}