import HeroSection from "./sections/HeroSection";

type Section =
  | {
      type: "hero";
      heading?: string;
      subheading?: string;
    }
  | {
      type: string;
      [key: string]: any;
    };

type Props = {
  sections?: Section[] | null;
};

export default function SectionRenderer({ sections }: Props) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        if (section.type === "hero") {
          return (
            <HeroSection
              key={index}
              heading={section.heading}
              subheading={section.subheading}
            />
          );
        }

        return null;
      })}
    </>
  );
}
