"use client";

import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const reasons = [
  {
    n: "01",
    t: "Reignite Your Passion",
    d: "Rediscover what brings you joy and make space for it again.",
  },
  {
    n: "02",
    t: "Meaningful Relationships",
    d: "Meet like-minded people who genuinely show up for you.",
  },
  {
    n: "03",
    t: "Holistic Well-being",
    d: "Balance for mind, body and spirit — gently, consistently.",
  },
  {
    n: "04",
    t: "Safe & Inclusive Space",
    d: "No judgment, only encouragement. Come as you are.",
  },
  {
    n: "05",
    t: "Flexible Participation",
    d: "Join online or attend in-person events on your schedule.",
  },
  {
    n: "06",
    t: "Express, Learn, Grow",
    d: "Workshops, circles, performances and friendships.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ FIX TS error
    },
  },
};

export function WhyJazbaa() {
  return (
    <section className="py-16 md:py-24 lg:py-36 bg-background relative overflow-visible">
      <div className="container-editorial relative z-10">
        {/* HEADER */}
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-[#ff6a3d]/10 border border-orange-200 dark:border-[#ff6a3d]/20 shadow-sm mb-6 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6a3d]" />
            <span className="text-xs font-bold tracking-widest text-[#c04a18] dark:text-[#ff6a3d] uppercase">
              Why Jazbaa
            </span>
          </div>

          <h2 className="display text-[10vw] sm:text-4xl md:text-6xl font-light mt-3 sm:mt-4 max-w-[20ch] leading-tight">
            Because life needs more than{" "}
            <em className="italic font-medium text-accent">routine</em>.
          </h2>
        </Reveal>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 md:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div key={r.n} variants={cardVariants}>
              <CardSpotlight
  className="
    h-full rounded-3xl p-6 sm:p-8 md:p-10
    border border-border/40
    bg-white dark:bg-zinc-900
    shadow-md dark:shadow-none
    transition-colors duration-300
  "
>
                <div className="flex flex-col h-full justify-between">
                  {/* TOP */}
                  <div>
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-3 md:gap-4">
                        <span className="font-display text-slate-500 dark:text-white/50 text-xl sm:text-2xl md:text-3xl">
                          {r.n}
                        </span>

                        <h3 className="font-display text-xl sm:text-2xl md:text-3xl">
                          {r.t}
                        </h3>
                      </div>

                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>

                    <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-white/60 leading-relaxed">
                      {r.d}
                    </p>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
