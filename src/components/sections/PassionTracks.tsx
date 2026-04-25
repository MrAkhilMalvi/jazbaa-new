import { Reveal } from "@/components/animations/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const passions = [
  { title: "Singing & Karaoke", emoji: "🎤", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85" },
  { title: "Music & Instruments", emoji: "🎸", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85" },
  { title: "Dance & Movement", emoji: "💃", img: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=85" },
  { title: "Book Clubs", emoji: "📚", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85" },
  { title: "Meditation & Wellness", emoji: "🧘", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85" },
  { title: "Open Mics & Socials", emoji: "🎭", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85" },
];

export function PassionTracks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Horizontal pin: translate the strip across the viewport while section is sticky.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section
      ref={ref}
      className="relative bg-background"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-editorial">
          <div className="flex items-end justify-between gap-8 mb-10 md:mb-14">
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
                Scroll to drift through every doorway. Each track is a tribe of
                people who love what you love.
              </p>
            </Reveal>
          </div>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-8 px-6 md:px-10 will-change-transform"
        >
          {passions.map((p, i) => (
            <article
              key={p.title}
              className="group relative shrink-0 w-[78vw] sm:w-[420px] md:w-[460px] aspect-[4/5] rounded-3xl overflow-hidden shadow-clay"
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                <span className="text-3xl">{p.emoji}</span>
                <h3 className="font-display text-3xl md:text-4xl mt-2">{p.title}</h3>
              </div>
              <div className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full glass text-foreground">
                0{i + 1}
              </div>
            </article>
          ))}
        </motion.div>

        <div className="container-editorial mt-8 hidden md:flex justify-end">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            ← Scroll →
          </p>
        </div>
      </div>
    </section>
  );
}
