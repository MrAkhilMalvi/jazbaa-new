import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, Heart, Sparkles, Globe } from "lucide-react";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Users, t: "Hobby Communities", d: "Access curated tribes around what you love." },
  { icon: Calendar, t: "Exclusive Events", d: "Karaoke nights, jam sessions, book clubs & more." },
  { icon: Heart, t: "Real Connection", d: "Meet people who actually show up." },
  { icon: Sparkles, t: "Express Yourself", d: "Perform, share, learn — your way." },
  { icon: Globe, t: "Online & Offline", d: "Engage from anywhere or meet in your city." },
];

const steps = [
  { n: "01", t: "Register", d: "Sign up as Member, Volunteer or Chapter Lead." },
  { n: "02", t: "Pick interests", d: "Choose your top three hobbies and tracks." },
  { n: "03", t: "Show up", d: "Attend events online or in your city." },
  { n: "04", t: "Grow together", d: "Connect, perform, and build friendships." },
];

const Join = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-mesh noise">
        {/* <Aurora className="opacity-70" /> */}
        <div className="container-editorial relative">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Join JAZBAA</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Find your tribe."
            className="display text-6xl md:text-8xl lg:text-[8rem] font-light mt-6"
          />
          <RevealText
            as="h1"
            text="Fuel your passion."
            className="display text-6xl md:text-8xl lg:text-[8rem] font-light  text-accent"
            delay={0.15}
          />
          <Reveal delay={0.4}>
            <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
              <p className="md:col-span-6 text-lg text-muted-foreground leading-relaxed text-balance">
                JAZBAA is more than a community — it's a movement for those who
                refuse to let their hobbies and passions fade into the rush of
                everyday life. Sign up free and start showing up for yourself.
              </p>
              <div className="md:col-span-6 md:text-right flex md:justify-end flex-wrap gap-3">
                <Button asChild variant="link" size="lg">
                  <Link to="/signup">
                    Become a Member <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">I already have an account</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 md:py-32">
        <div className="container-editorial">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Membership benefits</p>
            <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[18ch]">
              What you get when you <em className="italic font-medium text-accent">show up</em>.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group h-full clay p-8 relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-2xl transition-colors duration-700" />
                  <b.icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
                  <h3 className="font-display text-2xl mt-5">{b.t}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{b.d}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
        <div className="container-editorial relative">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">How it works</p>
            <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[20ch]">
              Four steps. <em className="italic font-medium text-accent">Endless</em> joy.
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-4 gap-px bg-background/10 rounded-3xl overflow-hidden">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="bg-foreground p-8 md:p-10 h-full hover:bg-accent/5 transition-colors duration-500">
                  <span className="font-display text-accent text-3xl">{s.n}</span>
                  <h3 className="font-display text-2xl mt-4">{s.t}</h3>
                  <p className="mt-3 text-sm opacity-75 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section className="py-24 md:py-32 bg-secondary/40">
        <div className="container-editorial grid md:grid-cols-2 gap-10">
          <Reveal>
            <div className="clay p-8 md:p-10 h-full">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Volunteer</p>
              <h3 className="font-display text-3xl md:text-4xl mt-4">Co-create the experience.</h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Help organize events, engage with members, and bring your ideas
                to life alongside a friendly team.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/signup">Apply as Volunteer</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="clay p-8 md:p-10 h-full bg-foreground text-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Chapter Lead</p>
              <h3 className="font-display text-3xl md:text-4xl mt-4">Build your city's community.</h3>
              <p className="mt-5 opacity-80 leading-relaxed">
                Host sessions, lead local events and create real impact for
                people in your city. We'll back you with the platform.
              </p>
              <Button asChild variant="ember" className="mt-7">
                <Link to="/signup">Apply as Chapter Lead</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Join;
