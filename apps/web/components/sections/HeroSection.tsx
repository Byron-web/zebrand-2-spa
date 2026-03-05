import Image from "next/image";
import Link from "next/link";

type Cta = {
  label?: string;
  href?: string;
};

type HeroData = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

type Props = {
  data?: HeroData;
};

export default function HeroSection({ data }: Props) {
  const eyebrow = data?.eyebrow || "Zebrand 2.0";
  const heading = data?.heading || "Premium marketing websites that convert.";
  const subheading =
    data?.subheading ||
    "A world-class front-end with a clean CMS structure. Built for speed, clarity, and consistent design across every page.";

  const primaryLabel = data?.primaryCta?.label || "Explore services";
  const primaryHref = data?.primaryCta?.href || "/services";

  const secondaryLabel = data?.secondaryCta?.label || "Why Zebrand";
  const secondaryHref = data?.secondaryCta?.href || "/about";

  return (
    <section className="z-hero">
      <div className="z-container">
        <div className="z-hero-grid">
          <div>
            <p className="z-kicker">{eyebrow}</p>
            <h1 className="z-h1">{heading}</h1>
            <p className="z-lead">{subheading}</p>

            <div className="z-hero-actions">
              <Link className="z-btn z-btn-primary" href={primaryHref}>
                {primaryLabel}
              </Link>
              <Link className="z-btn z-btn-ghost" href={secondaryHref}>
                {secondaryLabel}
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