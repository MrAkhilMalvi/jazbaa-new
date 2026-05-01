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
    t: "Meaningful Meetups",
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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function WhyJazbaa() {
  return (
    <section className="py-20 md:py-20 px-4 bg-white dark:bg-zinc-950 border-y border-slate-200/60 dark:border-white/10 transition-colors duration-300 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/40 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-300" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* =========================================
            TOP: THE NARRATIVE (Story + Hook)
            ========================================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24 md:mb-32">
          
          {/* Left Column: Sticky Hook Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 mb-6 md:mb-8 border border-orange-200 dark:border-orange-500/20 shadow-sm transition-colors duration-300">
                <Sparkles className="w-4 h-4 text-[#ff6a3d]" />
                <span className="text-base sm:text-lg font-bold tracking-wide text-[#c04a18] dark:text-[#ff6a3d] uppercase">
                  Why Jazbaa
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight transition-colors duration-300 max-w-[15ch]">
                Because life needs more than <span className="italic text-[#ff6a3d] font-light">routine.</span>
              </h2>
            </Reveal>
          </div>

          {/* Right Column: The Story Content */}
          <div className="lg:col-span-7 space-y-8 text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium transition-colors duration-300 lg:pt-4">
            <Reveal delay={0.1}>
              <p>
                In today's fast-paced world, the hobbies and passions we enjoyed
                in our early years often take a backseat. JAZBAA brings them
                back to life.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                We are a vibrant, inclusive community where individuals from all
                walks of life come together to reconnect with what they love
                doing as their hobbies. Whether it's music, singing, dance,
                books, mindfulness or movement — JAZBAA gives you the space,
                experts, people with common interests, and energy to live your
                passion.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              {/* Interactive Blockquote with hover micro-interaction */}
              <div className="group relative border-l-4 border-slate-200 dark:border-white/10 hover:border-[#ff6a3d] dark:hover:border-[#ff6a3d] pl-6 py-2 transition-all duration-500 ease-out">
                <div className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-orange-50 dark:from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <p className="text-slate-900 dark:text-white font-semibold text-xl md:text-2xl italic group-hover:translate-x-2 transition-transform duration-500 ease-out">
                  "JAZBAA is more than a community. It is a movement for those who
                  refuse to let their hobbies, interests and passions fade away in
                  the rush of everyday life."
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* =========================================
            BOTTOM: THE 6 REASONS GRID
            ========================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div key={r.n} variants={cardVariants} className="h-full">
              <CardSpotlight
                className="
                  h-full rounded-[2rem] p-8 md:p-10
                  border border-slate-200 dark:border-white/10
                  bg-slate-50 dark:bg-zinc-900/50
                  shadow-lg dark:shadow-none
                  transition-colors duration-300
                  group cursor-default
                "
              >
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      {/* Number Badge */}
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/40 font-bold text-xl group-hover:bg-[#ff6a3d] group-hover:text-white group-hover:border-[#ff6a3d] transition-all duration-500">
                        {r.n}
                      </span>
                      
                      {/* Animated Arrow */}
                      <ArrowUpRight className="w-6 h-6 text-slate-300 dark:text-white/20 group-hover:text-[#ff6a3d] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                      {r.t}
                    </h3>
                    
                    <p className="text-base md:text-lg text-slate-600 dark:text-white/60 leading-relaxed transition-colors duration-300">
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