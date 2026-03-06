import Image from "next/image";
import Link from "next/link";

type Cta = {
  label?: string;
  href?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  imageSrc?: string;
  imageAlt?: string;
};

function renderMultiline(text: string) {
  const parts = text.split("\n");
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

export default function HeroSection(props: Props) {
  const eyebrow = (props.eyebrow || "Zebrand 2.0").trim();

  const headingRaw = (props.heading || "Premium marketing websites that convert.").trim();

  const subheading = (
    props.subheading ||
    "A world-class front-end with a clean CMS structure. Built for speed, clarity, and consistent design across every page."
  ).trim();

  const primary =
    props.primaryCta?.label && props.primaryCta?.href
      ? { label: String(props.primaryCta.label), href: String(props.primaryCta.href) }
      : { label: "Explore services", href: "/services" };

  const secondary =
    props.secondaryCta?.label && props.secondaryCta?.href
      ? { label: String(props.secondaryCta.label), href: String(props.secondaryCta.href) }
      : { label: "Why Zebrand", href: "/about" };

  const imageSrc = (props.imageSrc || "/media/home-hero.svg").trim();
  const imageAlt = (props.imageAlt || "").trim();

  return (
    <section className="z-hero">
      <div className="z-container">
        <div className="z-hero-grid">
          <div>
            <p className="z-kicker">{eyebrow}</p>

            <h1 className="z-h1">{renderMultiline(headingRaw)}</h1>

            <p className="z-lead">{subheading}</p>

            <div className="z-hero-actions">
              <Link className="z-btn z-btn-primary" href={primary.href}>
                {primary.label}
              </Link>

              <Link className="z-btn z-btn-ghost" href={secondary.href}>
                {secondary.label}
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
              <Image src={imageSrc} alt={imageAlt} width={760} height={560} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}