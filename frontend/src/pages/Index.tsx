import { Hero } from "@/components/sections/Hero";
import { Offerings } from "@/components/sections/Offerings";
import { PassionTracks } from "@/components/sections/PassionTracks";
import { WhyJazbaa } from "@/components/sections/WhyJazbaa";
import { Stories } from "@/components/sections/Stories";
import { ScrollJourney } from "@/components/animations/ScrollJourney";
import { Marquee } from "@/components/sections/Marquee";
import About from "./About";

export default function Home() {
  return (
    <>
      <main className="relative bg-background text-foreground overflow-hidden">
        {/* Your Existing Sections */}
        <Hero />
        <Marquee />
        <Offerings />
        <PassionTracks />
        <WhyJazbaa />
        <About />
        {/* <Stories /> */}

        {/* 2. New Scroll Path Journey Animation (Transitions smoothly into the footer) */}
        <ScrollJourney />

        {/* Assuming you have a Footer component */}
        <footer className="relative py-20 text-center z-20 bg-background text-foreground border-t">
          <h2 className="display text-4xl mb-4">Ready to join JAZBAA?</h2>

          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-bold hover:scale-105 transition-transform duration-300">
            Start Your Journey
          </button>
        </footer>
      </main>
    </>
  );
}
