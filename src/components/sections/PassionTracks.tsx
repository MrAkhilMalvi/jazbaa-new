"use client";

import { useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 relative bg-background">
      <div className="container-editorial mb-12">
        <Reveal>
          <h2 className="display text-5xl md:text-7xl mb-4 text-primary">
            Explore your passion
          </h2>
          <p className="text-xl text-muted-foreground font-light text-balance">
            Pick a track. Live it.
          </p>
        </Reveal>
      </div>

      <div
        ref={scrollRef}
        /* 
          ✅ FIX: Added 'touch-pan-y' so mobile users can scroll down.
          ✅ FIX: Added 'overscroll-x-contain' to prevent bouncy edges.
          ✅ FIX: Removed data-lenis-prevent so vertical mouse wheels work.
        */
        className={`overflow-x-auto scroll-smooth snap-x snap-mandatory pb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full touch-pan-y overscroll-x-contain select-none ${
          isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-6 px-6 md:px-10 w-max">
          {passions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article 
                className="snap-center sm:snap-start group relative w-[85vw] sm:w-[400px] md:w-[440px] aspect-[4/5] rounded-3xl overflow-hidden clay hover-lift-3d flex-shrink-0"
              >
                <div className="hover-img-cinematic absolute inset-0 w-full h-full">
                  <img
                    src={p.img}
                    alt={p.title}
                    draggable={false} // ✅ FIX: Prevents "ghost image" drag glitch
                    loading="lazy"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute inset-x-0 bottom-0 p-8 text-primary-foreground z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-[0.8s] ease-cinematic">
                  <span className="text-4xl block mb-4 filter drop-shadow-md">{p.emoji}</span>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight">
                    {p.title}
                  </h3>
                </div>

                <div className="absolute top-6 right-6 text-xs font-semibold px-4 py-2 rounded-full glass text-foreground z-10 shadow-soft backdrop-blur-md">
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