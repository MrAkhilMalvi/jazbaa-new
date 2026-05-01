import { Hero } from "@/components/sections/Hero";
import { Offerings } from "@/components/sections/Offerings";
import { PassionTracks } from "@/components/sections/PassionTracks";
import { WhyJazbaa } from "@/components/sections/WhyJazbaa";
import { Marquee } from "@/components/sections/Marquee";
import About from "../components/sections/About";

export default function Home() {
  return (
    <>
      <main className="relative bg-background text-foreground overflow-hidden">
        <Hero />
        <Marquee />
        <Offerings />
        <PassionTracks />
        <WhyJazbaa />
        <About />
      </main>
    </>
  );
}
