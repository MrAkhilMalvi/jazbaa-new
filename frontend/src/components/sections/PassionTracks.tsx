"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import {
  Sparkles,
  Mic2,
  Music,
  Activity,
  BookOpen,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";

// 1. Added specific Lucide icons to each track
const passions = [
  {
    title: "Singing & Karaoke",
    icon: Mic2,
    img: "/images/PassionTracks/passion9.jpg",
  },
  {
    title: "Music & Instruments",
    icon: Music,
    img: "/images/PassionTracks/explore1.jpg",
  },
  {
    title: "Dance & Movement",
    icon: Activity,
    img: "/images/PassionTracks/dance.jpeg",
  },
  {
    title: "Reader's Club",
    icon: BookOpen,
    img: "/images/PassionTracks/explore4.jpg",
  },
  {
    title: "Meditation & Wellness",
    icon: Heart,
    img: "/images/PassionTracks/explore5.jpg",
  },
  {
    title: "Open Mics & Socials",
    icon: Users,
    img: "/images/PassionTracks/explore6.jpg",
  },
];

const marqueeItems = [...passions, ...passions];

export function PassionTracks() {
  return (
    <section className="py-20 md:py-20 relative bg-[#fbfaf8] dark:bg-black overflow-hidden transition-colors duration-500">
      {/* =========================================
          HEADER SECTION
          ========================================= */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-12 md:mb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 shadow-sm mb-6 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6a3d]" />

            <span className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-[#c04a18] dark:text-[#ff6a3d] uppercase">
              Explore
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-4 transition-colors duration-300">
            Find your <span className="italic text-[#ff6a3d]">passion.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 font-medium max-w-2xl transition-colors duration-300">
            Pick a track. Immerse yourself. Connect with others who share your
            energy.
          </p>
        </Reveal>
      </div>

      {/* =========================================
          INFINITE AUTO-SCROLLING CAROUSEL
          ========================================= */}
      <div
        className="relative w-full overflow-hidden mt-8"
        // PRO FIX: CSS Mask perfectly fades the left and right edges smoothly into the background
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-5 sm:gap-6 w-max px-4 py-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 35, // Adjust speed here
          }}
          style={{ willChange: "transform" }}
        >
          {marqueeItems.map((p, i) => {
            const originalIndex = i % passions.length;
            const Icon = p.icon;

            return (
              <article
                key={i}
                className="group relative w-[280px] md:w-[340px] aspect-[4/5] rounded-[2.5rem] overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-zinc-900 cursor-pointer border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(255,106,61,0.15)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* 1. Image Background (with slow zoom micro-interaction) */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    draggable={false}
                    loading="lazy"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* 2. Number Badge (Top Right) */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center z-10 transition-colors duration-300 group-hover:bg-[#ff6a3d] group-hover:border-[#ff6a3d]">
                  <span className="text-white text-sm font-bold tracking-wider">
                    0{originalIndex + 1}
                  </span>
                </div>

                {/* 3. Bottom Glass Panel (Ensures perfect text visibility and alignment) */}
                <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                  <div className="relative overflow-hidden rounded-[1.5rem] bg-black/40 backdrop-blur-xl border border-white/10 p-4 flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {/* STRICT ROW ALIGNMENT: Icon + Text */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff6a3d] transition-colors duration-500">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight tracking-wide">
                        {p.title}
                      </h3>
                    </div>

                    {/* Micro-interaction: Arrow slides in on hover */}
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
