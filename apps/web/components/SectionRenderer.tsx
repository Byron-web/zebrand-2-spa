import HeroSection from "@/components/sections/HeroSection";
import ServicesGridSection from "@/components/sections/ServicesGridSection";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";

export type Section = {
  type?: string;
  [key: string]: unknown;
};

function normaliseType(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function pick<T>(value: unknown, fallback: T): T {
  return (value as T) ?? fallback;
}

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  const safeSections = Array.isArray(sections) ? sections : [];

  return (
    <>
      {safeSections.map((section, index) => {
        const type = normaliseType(section.type);

        switch (type) {
          case "hero":
            return (
              <HeroSection
                key={index}
                eyebrow={pick<string | undefined>(section.eyebrow, undefined)}
                heading={pick<string | undefined>(section.heading, undefined)}
                subheading={pick<string | undefined>(section.subheading, undefined)}
                primaryCta={pick<any>(section.primaryCta, undefined)}
                secondaryCta={pick<any>(section.secondaryCta, undefined)}
              />
            );

          case "servicesgrid":
            return <ServicesGridSection key={index} />;

          case "processsteps":
            return <ProcessStepsSection key={index} />;

          case "problemssolution":
            return null;

          default:
            return null;
        }
      })}
    </>
  );
}