"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";

const passions =[
  { title: "Singing & Karaoke", emoji: "🎤", img: "/images/PassionTracks/explore1.jpg" },
  { title: "Music & Instruments", emoji: "🎸", img: "/images/PassionTracks/explore2.jpg" },
  { title: "Dance & Movement", emoji: "💃", img: "/images/PassionTracks/explore3.jpg" },
  { title: "Book Clubs", emoji: "📚", img: "/images/PassionTracks/explore4.jpg" },
  { title: "Meditation & Wellness", emoji: "🧘", img: "/images/PassionTracks/explore5.jpg" },
  { title: "Open Mics & Socials", emoji: "🎭", img: "/images/PassionTracks/explore6.jpg" }
];

export function PassionTracks() {
  const scrollRef = useRef(null);
  const[isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const[scrollLeft, setScrollLeft] = useState(0);

  // Desktop Mouse Drag Logic
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-16 md:py-24 relative bg-background">
      <div className="container-editorial mb-8 md:mb-12">
        <Reveal>
          <h2 className="display text-[11vw] sm:text-5xl md:text-7xl mb-2 sm:mb-4 text-primary leading-[1.1]">
            Explore your passion
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground font-light text-balance">
            Pick a track. Live it.
          </p>
        </Reveal>
      </div>

      <div
        ref={scrollRef}
        /* 
          ✅ FIX: Mobile horizontal swiping enabled effortlessly.
          ✅ FIX: Added proper snapping properties for phones.
        */
        className={`overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-8 md:pb-12 [scrollbar-width:none][&::-webkit-scrollbar]:hidden w-full touch-pan-x overscroll-x-contain select-none ${
          isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-4 sm:gap-6 px-4 md:px-10 w-max">
          {passions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article 
                className="snap-center sm:snap-start group relative w-[80vw] sm:w-[320px] md:w-[440px] aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden clay hover-lift-3d flex-shrink-0"
              >
                <div className="hover-img-cinematic absolute inset-0 w-full h-full">
                  <img
                    src={p.img}
                    alt={p.title}
                    draggable={false} 
                    loading="lazy"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-primary-foreground z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-[0.8s] ease-cinematic">
                  <span className="text-3xl md:text-4xl block mb-3 md:mb-4 filter drop-shadow-md">{p.emoji}</span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
                    {p.title}
                  </h3>
                </div>

                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] md:text-xs font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-full glass text-foreground z-10 shadow-soft backdrop-blur-md">
                  0{i + 1}
                </div>
              </article>
            </Reveal>
          ))}
          {/* ✅ Spacer element to ensure the last card has right margin on mobile */}
          <div className="w-1 sm:w-4 flex-shrink-0" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}