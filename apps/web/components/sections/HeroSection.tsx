import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="z-hero">
      <div className="z-container">
        <div className="z-hero-grid">
          <div>
            <p className="z-kicker">Zebrand 2.0</p>
            <h1 className="z-h1">Premium marketing websites that convert.</h1>
            <p className="z-lead">
              A world-class front-end with a clean CMS structure. Built for speed, clarity, and consistent design
              across every page.
            </p>

            <div className="z-hero-actions">
              <Link className="z-btn" href="/services">
                Explore services
              </Link>
              <Link className="z-btn z-btn-ghost" href="/about">
                Why Zebrand
              </Link>
            </div>

            <div className="z-metrics" aria-label="Highlights">
              <div className="z-metric">
                <div className="z-metric-num">Fast</div>
                <div className="z-metric-label">Performance-safe build</div>
              </div>
              <div className="z-metric">
                <div className="z-metric-num">Clean</div>
                <div className="z-metric-label">Component-led pages</div>
              </div>
              <div className="z-metric">
                <div className="z-metric-num">Editable</div>
                <div className="z-metric-label">CMS-ready structure</div>
              </div>
            </div>
          </div>

          <div className="z-hero-media" aria-hidden="true">
            <div className="z-hero-card">
              <Image src="/media/home-hero.svg" alt="" width={760} height={560} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}