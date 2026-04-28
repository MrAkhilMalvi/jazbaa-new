"use client";

import { motion } from "framer-motion";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Sparkles, Mic2, BookOpen, Heart, Users } from "lucide-react";

// Using Lucide icons instead of raw SVGs for cleaner code and better alignment
const offers = [
  {
    label: "Creative Expression",
    items: ["Singing & Karaoke", "Music & Instrument Circles", "Dance & Movement"],
    img: "/images/Offerings/passion1.jpg",
    icon: Mic2,
  },
  {
    label: "Intellectual Engagement",
    items: ["Book Clubs & Discussions", "Storytelling", "Open Mic Evenings"],
    img: "/images/Offerings/passion2.jpg",
    icon: BookOpen,
  },
  {
    label: "Wellness & Mindfulness",
    items: ["Meditation & Breathwork", "Mind-Body Sessions", "Wellness Walks"],
    img: "/images/Offerings/passion3.jpg",
    icon: Heart,
  },
  {
    label: "Social Connection",
    items: ["Community Meetups", "Themed Events & Concerts", "Friendship Circles"],
    img: "/images/other/image7.jpg",
    icon: Users,
  },
];

export function Offerings() {
  return (
    <section className="py-24 md:py-32 bg-[#fbfaf8] dark:bg-black transition-colors duration-500 relative overflow-hidden">
      
      {/* Ambient Glows for Dark Mode */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6a3d]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff6a3d]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* =========================================
            HEADER SECTION
            ========================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-[#ff6a3d]/10 border border-orange-200 dark:border-[#ff6a3d]/20 shadow-sm mb-6 transition-colors duration-300">
                <Sparkles className="w-3.5 h-3.5 text-[#ff6a3d]" />
                <span className="text-xs font-bold tracking-widest text-[#c04a18] dark:text-[#ff6a3d] uppercase">
                  What we offer
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight transition-colors duration-300">
                Spaces for every <span className="italic text-[#ff6a3d]">passion.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 font-medium max-w-md md:text-right transition-colors duration-300">
              Four pillars. Endless ways to express, connect, and grow — online
              and in person.
            </p>
          </Reveal>
        </div>

        {/* =========================================
            OFFERING CARDS GRID
            ========================================= */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => {
            const Icon = o.icon;

            return (
              <motion.article 
                key={o.label}
                // Framer Motion entrance animation replaces GSAP for better React consistency
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-lg hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_0_40px_rgba(255,106,61,0.15)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* 1. Image Header */}
                <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden m-2 rounded-[1.5rem] md:rounded-[2rem]">
                  <img
                    src={o.img}
                    alt={o.label}
                    loading="lazy"
                    className="h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1200ms] ease-out"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* 2. Card Content Area */}
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  
                  {/* Header: Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[1rem] bg-orange-50 dark:bg-black border border-orange-100 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff6a3d] group-hover:border-[#ff6a3d] transition-colors duration-500">
                      <Icon className="w-5 h-5 text-[#ff6a3d] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white leading-tight transition-colors duration-300">
                      {o.label}
                    </h3>
                  </div>

                  {/* Bulleted List */}
                  <ul className="space-y-4 mt-auto">
                    {o.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        {/* Custom Orange Bullet Point */}
                        <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#ff6a3d] mt-2.5 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                        <span className="text-base text-slate-600 dark:text-white/70 font-medium leading-relaxed transition-colors duration-300">
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}