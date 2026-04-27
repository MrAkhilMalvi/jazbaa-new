import { Link } from "react-router-dom";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/animations/Aurora";
import { Magnetic } from "@/components/animations/MagneticButton";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-36 overflow-hidden bg-background noise">
      {/* <Aurora className="opacity-90" intensity={1.2} /> */}
      
      <div className="container-editorial relative text-center px-4">
        <Reveal>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent">
            Don't just scroll through life
          </p>
        </Reveal>
        
        <RevealText
          as="h2"
          text="Sing. Dance. Play."
          className="display text-[12vw] sm:text-5xl md:text-7xl lg:text-[8rem] font-light mt-4 sm:mt-6 leading-[1.1]"
        />
        <RevealText
          as="h2"
          text="Read it. Live it."
          className="display text-[12vw] sm:text-5xl md:text-7xl lg:text-[8rem] font-light  text-accent leading-[1.1]"
          delay={0.15}
        />

        <Reveal delay={0.3}>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-2">
            Be a part of a community that celebrates YOU.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
            <div className="w-full sm:w-auto">
              <Magnetic strength={0.35}>
                <Button asChild variant="outline" size="lg" className="w-full h-12 sm:w-auto">
                  <Link to="/signup">
                    Join JAZBAA Today <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
            <div className="w-full sm:w-auto">
              <Magnetic strength={0.35}>
                <Button asChild variant="outline" size="lg" className="w-full h-12 sm:w-auto bg-white/50 backdrop-blur-sm">
                  <Link to="/events">View Events</Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}