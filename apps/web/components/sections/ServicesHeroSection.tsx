import Image from "next/image";
import Link from "next/link";

export default function ServicesHeroSection() {
  return (
    <section className="z-hero">
      <div className="z-container">
        <div className="z-hero-grid">
          <div>
            <p className="z-kicker">Services</p>
            <h1 className="z-h1">Premium marketing delivery, end to end.</h1>
            <p className="z-lead">
              Conversion-led design, clean implementation, and a CMS structure that stays fast as you scale. Built
              for teams that care about quality and outcomes.
            </p>

            <div className="z-hero-actions">
              <Link className="z-btn" href="#packages">
                View packages
              </Link>
              <Link className="z-btn z-btn-ghost" href="/services">
                Request a quote
              </Link>
            </div>

            <div className="z-metrics" aria-label="Delivery metrics">
              <div className="z-metric">
                <div className="z-metric-num">4 weeks</div>
                <div className="z-metric-label">Typical delivery</div>
              </div>
              <div className="z-metric">
                <div className="z-metric-num">SEO-ready</div>
                <div className="z-metric-label">From day one</div>
              </div>
              <div className="z-metric">
                <div className="z-metric-num">CMS clean</div>
                <div className="z-metric-label">Editor friendly</div>
              </div>
            </div>
          </div>

          <div className="z-hero-media" aria-hidden="true">
            <div className="z-hero-card">
              <Image src="/media/services-hero.svg" alt="" width={760} height={560} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}