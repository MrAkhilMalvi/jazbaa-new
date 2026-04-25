import { Link } from "react-router-dom";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/animations/Aurora";
import { Magnetic } from "@/components/animations/MagneticButton";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-background noise">
      <Aurora className="opacity-90" intensity={1.2} />
      <div className="container-editorial relative text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Don't just scroll through life
          </p>
        </Reveal>
        <RevealText
          as="h2"
          text="Sing. Dance. Play."
          className="display text-5xl md:text-7xl lg:text-[8rem] font-light mt-6"
        />
        <RevealText
          as="h2"
          text="Read it. Live it."
          className="display text-5xl md:text-7xl lg:text-[8rem] font-light italic text-accent"
          delay={0.15}
        />

        <Reveal delay={0.3}>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Be a part of a community that celebrates YOU.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Magnetic strength={0.35}>
              <Button asChild variant="ember" size="lg">
                <Link to="/signup">
                  Join JAZBAA Today <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <Button asChild variant="outline" size="lg">
                <Link to="/events">View Events</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
