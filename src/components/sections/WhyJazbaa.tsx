import { Reveal } from "@/components/animations/Reveal";

const reasons = [
  { n: "01", t: "Reignite Your Passion", d: "Rediscover what brings you joy and make space for it again." },
  { n: "02", t: "Meaningful Relationships", d: "Meet like-minded people who genuinely show up for you." },
  { n: "03", t: "Holistic Well-being", d: "Balance for mind, body and spirit — gently, consistently." },
  { n: "04", t: "Safe & Inclusive Space", d: "No judgment, only encouragement. Come as you are." },
  { n: "05", t: "Flexible Participation", d: "Join online or attend in-person events on your schedule." },
  { n: "06", t: "Express, Learn, Grow", d: "Workshops, circles, performances and friendships." },
];

export function WhyJazbaa() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-editorial">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Why JAZBAA
          </p>
          <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[20ch]">
            Because life needs more than <em className="italic font-medium text-accent">routine</em>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-3 rounded-3xl overflow-hidden">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.06}>
              <div className="bg-background p-8 md:p-10 h-full hover:bg-accent/5 transition-colors duration-500">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-accent text-2xl">{r.n}</span>
                  <h3 className="font-display text-2xl md:text-3xl">{r.t}</h3>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
