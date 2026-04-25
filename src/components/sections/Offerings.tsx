import { Reveal } from "@/components/animations/Reveal";

const offers = [
  {
    label: "Creative Expression",
    items: ["Singing & Karaoke", "Music & Instrument Circles", "Dance & Movement"],
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Intellectual Engagement",
    items: ["Book Clubs & Discussions", "Storytelling", "Open Mic Evenings"],
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Wellness & Mindfulness",
    items: ["Meditation & Breathwork", "Mind-Body Sessions", "Wellness Walks"],
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Social Connection",
    items: ["Community Meetups", "Themed Events & Concerts", "Friendship Circles"],
    img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1100&q=85",
  },
];

export function Offerings() {
  return (
    <section className="py-24 md:py-36 bg-secondary/40">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              What we offer
            </p>
            <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[18ch]">
              Spaces for every <em className="italic font-medium text-accent">passion</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground max-w-md">
              Four pillars. Endless ways to express, connect, and grow — online
              and in person.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08}>
              <article className="group h-full clay overflow-hidden hover-lift">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={o.img}
                    alt={o.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{o.label}</h3>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {o.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-1 w-3 rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
