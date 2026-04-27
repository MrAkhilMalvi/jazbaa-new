import { Hero } from "@/components/sections/Hero";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { Offerings } from "@/components/sections/Offerings";
import { PassionTracks } from "@/components/sections/PassionTracks";
import { WhyJazbaa } from "@/components/sections/WhyJazbaa";
import { Stories } from "@/components/sections/Stories";
import { ScrollJourney } from "@/components/animations/ScrollJourney";

export default function Home() {
  return (
    <>

      <main className="relative bg-background text-foreground overflow-hidden">
        {/* Your Existing Sections */}
        <Hero />
        <AboutSplit />
        <Offerings />
        <PassionTracks />
        <WhyJazbaa />
        {/* <Stories /> */}

        {/* 2. New Scroll Path Journey Animation (Transitions smoothly into the footer) */}
        <ScrollJourney />

        {/* Assuming you have a Footer component */}
        <footer className="relative bg-foreground text-background py-20 text-center z-20">
          <h2 className="display text-4xl mb-4 text-background">Ready to join JAZBAA?</h2>
          <button className="px-8 py-4 bg-accent text-background rounded-full font-bold hover:scale-105 transition-transform duration-300">
            Start Your Journey
          </button>
        </footer>
      </main>
    </>
  );
}