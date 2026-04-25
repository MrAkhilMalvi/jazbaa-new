import { Reveal } from "@/components/animations/Reveal";

const passions = [
  { title: "Singing & Karaoke", emoji: "🎤", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85" },
  { title: "Music & Instruments", emoji: "🎸", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85" },
  { title: "Dance & Movement", emoji: "💃", img: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=85" },
  { title: "Book Clubs", emoji: "📚", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85" },
  { title: "Meditation & Wellness", emoji: "🧘", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85" },
  { title: "Open Mics & Socials", emoji: "🎭", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85" },
];

export function PassionTracks() {
  return (
    <section className="py-24 md:py-36 overflow-hidden">
      <div className="container-editorial">
        <div className="flex items-end justify-between gap-8 mb-12">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Explore your passion
            </p>
            <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[16ch]">
              Pick a track. <em className="italic font-medium text-accent">Live it.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="hidden md:block">
            <p className="text-muted-foreground max-w-sm">
              Drag, scroll, choose. Each track is a doorway to people who love
              what you love.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Native horizontal drag-scroll strip */}
      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-6 px-6 md:px-10 min-w-max">
          {passions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="snap-start group relative w-[78vw] sm:w-[420px] md:w-[460px] aspect-[4/5] rounded-3xl overflow-hidden shadow-clay">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                  <span className="text-3xl">{p.emoji}</span>
                  <h3 className="font-display text-3xl md:text-4xl mt-2">{p.title}</h3>
                </div>
                <div className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full bg-background/70 text-foreground">
                  0{i + 1}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
