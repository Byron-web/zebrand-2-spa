type HeroSectionProps = {
  heading?: string;
  subheading?: string;
};

export default function HeroSection({ heading, subheading }: HeroSectionProps) {
  return (
    <section style={{ padding: 24 }}>
      <h1 style={{ fontSize: 44, fontWeight: 800, margin: 0 }}>
        {heading ?? "Heading missing"}
      </h1>

      {subheading ? (
        <p style={{ marginTop: 12, fontSize: 18, opacity: 0.9 }}>
          {subheading}
        </p>
      ) : null}
    </section>
  );
}
