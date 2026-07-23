import { Hero } from "@/components/sections/Hero";
import { Offerings } from "@/components/sections/Offerings";
import { PassionTracks } from "@/components/sections/PassionTracks";
import { WhyJazbaa } from "@/components/sections/WhyJazbaa";
import { Marquee } from "@/components/sections/Marquee";
import About from "../components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Offerings />
      <PassionTracks />
      <WhyJazbaa />
      <About />
    </>
  );
}