import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { Offerings } from "@/components/sections/Offerings";
import { PassionTracks } from "@/components/sections/PassionTracks";
import { WhyJazbaa } from "@/components/sections/WhyJazbaa";
import { Stories } from "@/components/sections/Stories";
import { CtaSection } from "@/components/sections/CtaSection";

const Index = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutSplit />
      <Offerings />
      <PassionTracks />
      <WhyJazbaa />
      <Stories />
      <CtaSection />
    </>
  );
};

export default Index;
