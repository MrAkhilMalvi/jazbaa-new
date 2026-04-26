"use client";

import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const reasons =[
  { n: "01", t: "Reignite Your Passion", d: "Rediscover what brings you joy and make space for it again." },
  { n: "02", t: "Meaningful Relationships", d: "Meet like-minded people who genuinely show up for you." },
  { n: "03", t: "Holistic Well-being", d: "Balance for mind, body and spirit — gently, consistently." },
  { n: "04", t: "Safe & Inclusive Space", d: "No judgment, only encouragement. Come as you are." },
  { n: "05", t: "Flexible Participation", d: "Join online or attend in-person events on your schedule." },
  { n: "06", t: "Express, Learn, Grow", d: "Workshops, circles, performances and friendships." },
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
    filter: "blur(6px)" 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8, 
      ease:[0.22, 1, 0.36, 1], 
    },
  },
} as const;

export function WhyJazbaa() {
  return (
    <section className="py-16 md:py-24 lg:py-36 bg-background relative overflow-hidden">
      <div className="container-editorial relative z-10">
        
        <Reveal>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent font-semibold">
            Why JAZBAA
          </p>
          <h2 className="display text-[10vw] sm:text-4xl md:text-6xl font-light mt-3 sm:mt-4 max-w-[20ch] leading-tight">
            Because life needs more than <em className="italic font-medium text-accent">routine</em>.
          </h2>
        </Reveal>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          /* ✅ FIX: Reduced viewport margin from -100px to -50px so it triggers earlier on small mobile screens */
          viewport={{ once: true, margin: "-50px" }} 
          className="mt-10 md:mt-16 grid gap-[1px] bg-border/50 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl md:rounded-3xl overflow-hidden shadow-soft"
        >
          {reasons.map((r) => (
            
            <motion.div 
              key={r.n}
              variants={cardVariants}
              className="group relative bg-background p-6 sm:p-8 md:p-12 h-full min-h-[220px] md:min-h-[280px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-[0.15] transition-opacity duration-[0.8s] ease-cinematic" />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-baseline justify-between w-full">
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className="font-display text-muted-foreground group-hover:text-accent transition-colors duration-500 text-xl sm:text-2xl md:text-3xl group-hover:scale-110 transform origin-left">
                        {r.n}
                      </span>
                      
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl transition-transform duration-[0.6s] ease-cinematic group-hover:translate-x-2">
                        {r.t}
                      </h3>
                    </div>

                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-accent opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-[0.6s] ease-cinematic shrink-0 ml-2" />
                  </div>

                  <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed transition-transform duration-[0.6s] ease-cinematic group-hover:translate-x-2">
                    {r.d}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-accent group-hover:w-full transition-all duration-[0.8s] ease-cinematic" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}