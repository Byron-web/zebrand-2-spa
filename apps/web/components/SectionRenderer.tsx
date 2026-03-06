import HeroSection from "@/components/sections/HeroSection";
import ProblemsSolutionSection from "@/components/sections/ProblemsSolutionSection";
import ServicesGridSection from "@/components/sections/ServicesGridSection";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";

type Cta = {
  label?: string;
  href?: string;
};

type ServicesGridItem = {
  title?: string;
  description?: string;
};

type ProcessStep = {
  title?: string;
  description?: string;
};

function normaliseType(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const cleaned: string[] = [];

  for (const entry of value) {
    if (typeof entry !== "string") continue;

    const trimmed = entry.trim();
    if (!trimmed) continue;

    cleaned.push(trimmed);
  }

  return cleaned.length > 0 ? cleaned : undefined;
}

function asCta(value: unknown): Cta | undefined {
  if (!isRecord(value)) return undefined;

  const label = asString(value.label);
  const href = asString(value.href);

  if (!label || !href) return undefined;
  return { label, href };
}

function asServicesGridItems(value: unknown): ServicesGridItem[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const cleaned: ServicesGridItem[] = [];

  for (const entry of value) {
    if (!isRecord(entry)) continue;

    const title = asString(entry.title);
    const description = asString(entry.description);

    if (!title && !description) continue;

    cleaned.push({ title, description });
  }

  return cleaned.length > 0 ? cleaned : undefined;
}

function asProcessSteps(value: unknown): ProcessStep[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const cleaned: ProcessStep[] = [];

  for (const entry of value) {
    if (!isRecord(entry)) continue;

    const title = asString(entry.title);
    const description = asString(entry.description);

    if (!title && !description) continue;

    cleaned.push({ title, description });
  }

  return cleaned.length > 0 ? cleaned : undefined;
}

export default function SectionRenderer({ sections }: { sections: unknown[] }) {
  const safeSections = Array.isArray(sections) ? sections : [];

  return (
    <>
      {safeSections.map((section, index) => {
        const r = isRecord(section) ? section : {};
        const type = normaliseType(r.type);

        switch (type) {
          case "hero":
            return (
              <HeroSection
                key={index}
                eyebrow={asString(r.eyebrow)}
                heading={asString(r.heading)}
                subheading={asString(r.subheading)}
                primaryCta={asCta(r.primaryCta)}
                secondaryCta={asCta(r.secondaryCta)}
                imageSrc={asString(r.imageSrc)}
                imageAlt={asString(r.imageAlt)}
              />
            );

          case "problemssolution":
            return (
              <ProblemsSolutionSection
                key={index}
                heading={asString(r.heading)}
                subheading={asString(r.subheading)}
                problemsTitle={asString(r.leftTitle)}
                solutionTitle={asString(r.rightTitle)}
                problems={asStringArray(r.leftItems)}
                solutions={asStringArray(r.rightItems)}
              />
            );

          case "servicesgrid": {
            const heading = asString(r.title) ?? asString(r.heading);
            const subheading = asString(r.subtitle) ?? asString(r.subheading);
            const items = asServicesGridItems(r.items);

            return (
              <ServicesGridSection
                key={index}
                heading={heading}
                subheading={subheading}
                items={items}
              />
            );
          }

          case "processsteps": {
            const heading = asString(r.title) ?? asString(r.heading);
            const subheading = asString(r.subtitle) ?? asString(r.subheading);
            const steps = asProcessSteps(r.steps);

            return (
              <ProcessStepsSection
                key={index}
                heading={heading}
                subheading={subheading}
                steps={steps}
              />
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}