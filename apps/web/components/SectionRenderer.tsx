import HeroSection from "@/components/sections/HeroSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import ServicesGridSection from "@/components/sections/ServicesGridSection";
import ProcessSection from "@/components/sections/ProcessStepsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCtaSection from "@/components/sections/FinalCTASection";

import AboutHeroSection from "@/components/sections/AboutHeroSection";
import AboutStorySection from "@/components/sections/AboutStorySection";
import AboutValuesSection from "@/components/sections/AboutValuesSection";
import AboutPrinciplesSection from "@/components/sections/AboutPrinciplesSection";

import ServicesHeroSection from "@/components/sections/ServicesHeroSection";
import ServicesPackagesSection from "@/components/sections/ServicesPackagesSection";
import ServicesProcessSection from "@/components/sections/ServicesProcessSection";

export type Section = {
  type?: string;
  [key: string]: unknown;
};

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const type = (section.type || "").toLowerCase();

        switch (type) {
          case "hero":
            return <HeroSection key={index} />;
          case "socialproof":
            return <SocialProofSection key={index} />;
          case "servicesgrid":
            return <ServicesGridSection key={index} />;
          case "process":
            return <ProcessSection key={index} />;
          case "testimonials":
            return <TestimonialsSection key={index} />;
          case "faq":
            return <FAQSection key={index} />;
          case "finalcta":
            return <FinalCtaSection key={index} />;

          // About
          case "abouthero":
            return <AboutHeroSection key={index} />;
          case "aboutstory":
            return <AboutStorySection key={index} />;
          case "aboutvalues":
            return <AboutValuesSection key={index} />;
          case "aboutprinciples":
            return <AboutPrinciplesSection key={index} />;

          // Services
          case "serviceshero":
            return <ServicesHeroSection key={index} />;
          case "servicespackages":
            return <ServicesPackagesSection key={index} />;
          case "servicesprocess":
            return <ServicesProcessSection key={index} />;

          default:
            return null;
        }
      })}
    </>
  );
}