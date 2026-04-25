"use client";

import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { n: "01", t: "Reignite Your Passion", d: "Rediscover what brings you joy and make space for it again." },
  { n: "02", t: "Meaningful Relationships", d: "Meet like-minded people who genuinely show up for you." },
  { n: "03", t: "Holistic Well-being", d: "Balance for mind, body and spirit — gently, consistently." },
  { n: "04", t: "Safe & Inclusive Space", d: "No judgment, only encouragement. Come as you are." },
  { n: "05", t: "Flexible Participation", d: "Join online or attend in-person events on your schedule." },
  { n: "06", t: "Express, Learn, Grow", d: "Workshops, circles, performances and friendships." },
];

// --- 1. FRAMER MOTION VARIANTS ---
// This tells the grid container to stagger its children by 0.15 seconds each
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card popping up
      delayChildren: 0.2,    // Wait slightly before starting the sequence
    },
  },
};

// This dictates how EACH individual card animates in
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60, // Start 60px lower
    scale: 0.95, // Start slightly smaller
    filter: "blur(10px)" // Cinematic blur effect
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1, // Long, smooth transition
      ease: [0.22, 1, 0.36, 1], // Custom cinematic easing (Cubic Bezier)
    },
  },
} as const;

export function WhyJazbaa() {
  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="container-editorial relative z-10">
        
        {/* Header Section */}
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Why JAZBAA
          </p>
          <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[20ch] leading-tight">
            Because life needs more than <em className="italic font-medium text-accent">routine</em>.
          </h2>
        </Reveal>

        {/* 
          --- 2. THE STAGGERED GRID ---
          We use motion.div and apply the container variants.
          whileInView="visible" means it waits until you SCROLL down to it to animate.
        */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Triggers when it's 100px inside the screen
          className="mt-16 grid gap-[1px] bg-border/50 sm:grid-cols-2 lg:grid-cols-3 rounded-3xl overflow-hidden shadow-soft"
        >
          {reasons.map((r) => (
            
            // --- 3. THE ANIMATED CARD ---
            <motion.div 
              key={r.n}
              variants={cardVariants}
              className="group relative bg-background p-8 md:p-12 h-full min-h-[280px] overflow-hidden"
            >
              {/* Cinematic Hover Fills */}
              <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-[0.15] transition-opacity duration-[0.8s] ease-cinematic" />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-baseline justify-between w-full">
                    <div className="flex items-baseline gap-4">
                      {/* Number Animation on Hover */}
                      <span className="font-display text-muted-foreground group-hover:text-accent transition-colors duration-500 text-2xl md:text-3xl group-hover:scale-110 transform origin-left">
                        {r.n}
                      </span>
                      
                      {/* Title Kinematic Slide on Hover */}
                      <h3 className="font-display text-2xl md:text-3xl transition-transform duration-[0.6s] ease-cinematic group-hover:translate-x-2">
                        {r.t}
                      </h3>
                    </div>

                    {/* Arrow Slide-in Reveal on Hover */}
                    <ArrowUpRight className="w-6 h-6 text-accent opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-[0.6s] ease-cinematic" />
                  </div>

                  {/* Description Slide on Hover */}
                  <p className="mt-6 text-muted-foreground leading-relaxed text-lg transition-transform duration-[0.6s] ease-cinematic group-hover:translate-x-2">
                    {r.d}
                  </p>
                </div>
              </div>

              {/* Expanding Animated Bottom Border on Hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-accent group-hover:w-full transition-all duration-[0.8s] ease-cinematic" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}