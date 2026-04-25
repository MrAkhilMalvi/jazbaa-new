import { Link } from "react-router-dom";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-mesh noise">
      <div className="container-editorial text-center">
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
            <Button asChild variant="ember" size="lg">
              <Link to="/join">
                Join JAZBAA Today <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/events">View Events</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
