import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CtaSection } from "@/components/sections/CtaSection";

const TEAM_IMG = "/images/About/about1.jpg";
const PORTRAIT_1 = "/images/About/about2.jpg";
const PORTRAIT_2 = "/images/About/about3.jpg";

const About = () => {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container-editorial">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">About JAZBAA</p>
          </Reveal>
          <RevealText
            as="h1"
            text="A community for the curious, the creative, the alive."
            className="display text-5xl md:text-7xl lg:text-[6rem] font-light mt-6 max-w-[18ch]"
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-editorial">
          <div className="rounded-3xl overflow-hidden shadow-clay aspect-[16/8]">
            <img src={TEAM_IMG} alt="JAZBAA community gathered together" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-editorial grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl">Our story</h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                In today's fast-paced world, the hobbies and passions we enjoyed
                in our early years often take a backseat. JAZBAA brings them
                back to life.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                We are a vibrant, inclusive community where individuals from all
                walks of life come together to reconnect with what they love
                doing as their hobbies. Whether it's music, singing, dance,
                books, mindfulness or movement — JAZBAA gives you the space,
                experts, people with common interests, and energy to live your
                passion.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                JAZBAA is more than a community. It is a movement for those who
                refuse to let their hobbies, interests and passions fade away in
                the rush of everyday life.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container-editorial grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="clay p-10 h-full">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Our Vision</p>
              <p className="mt-6 font-display text-3xl md:text-4xl leading-snug">
                A global community where people live and engage joyfully,
                creatively, and consciously.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="clay p-10 h-full bg-foreground text-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Our Mission</p>
              <ul className="mt-6 space-y-4 font-display text-2xl leading-snug">
                <li>— Encourage people to pursue hobbies consistently.</li>
                <li>— Create safe and inclusive social environments.</li>
                <li>— Promote holistic well-being.</li>
                <li>— Foster meaningful human connections.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-editorial grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <img src={PORTRAIT_1} alt="JAZBAA member portrait" loading="lazy" className="rounded-3xl aspect-[3/4] object-cover shadow-clay" />
            <img src={PORTRAIT_2} alt="JAZBAA member portrait" loading="lazy" className="rounded-3xl aspect-[3/4] object-cover shadow-clay mt-10" />
          </div>
          <div className="md:col-span-6">
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl">Who it's for</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                JAZBAA is for everyone who believes life is more than just routine.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3 text-lg">
              {["Working professionals seeking a creative outlet","Entrepreneurs looking for mindful breaks","Home-makers rediscovering hobbies","Students exploring new passions","Parents craving moments of joy","Anyone who wants to feel alive again"].map((it, i) => (
                <Reveal key={it} delay={0.05 * i}>
                  <li className="flex gap-4 items-start">
                    <span className="mt-3 h-1 w-6 rounded-full bg-accent shrink-0" />
                    <span>{it}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.4}>
              <Button asChild variant="ember" size="lg" className="mt-10">
                <Link to="/join">Become part of JAZBAA</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
};

export default About;
