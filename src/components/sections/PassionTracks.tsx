import { Reveal } from "@/components/animations/Reveal";

const passions = [
  { title: "Singing & Karaoke", emoji: "🎤", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80" },
  { title: "Music & Instruments", emoji: "🎸", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=80" },
  { title: "Dance & Movement", emoji: "💃", img: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=80" },
  { title: "Book Clubs", emoji: "📚", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80" },
  { title: "Meditation & Wellness", emoji: "🧘", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80" },
  { title: "Open Mics & Socials", emoji: "🎭", img: "https://images.unsplash.com/photo-1499415479124-43c32433a620?auto=format&fit=crop&w=900&q=80" },
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
              Pick a track. <em className="italic font-medium">Live it.</em>
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

      {/* Horizontal scroll strip */}
      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-6 px-6 md:px-10 min-w-max">
          {passions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="snap-start group relative w-[78vw] sm:w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-clay">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="text-3xl">{p.emoji}</span>
                  <h3 className="font-display text-3xl mt-2">{p.title}</h3>
                </div>
                <div className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full glass text-foreground">
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
