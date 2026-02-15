import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Benefits } from "@/components/marketing/benefits";
import { Pricing } from "@/components/marketing/pricing";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTASection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <Testimonials />
      <CTASection />
    </>
  );
}
