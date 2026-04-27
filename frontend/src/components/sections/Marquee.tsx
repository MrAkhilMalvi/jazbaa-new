import { Reveal } from "@/components/animations/Reveal";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const items =[
  "Music", "Art", "Singing", "Dance", "Social Connect",
  "Hobbies", "Concerts", "Classic Movies"
];

export function Marquee() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset:["start end", "end start"] });
  
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-30%"]);

  const row = [...items, ...items, ...items];
  
  return (
    <section
      ref={ref}
      aria-hidden
      className="relative py-8 sm:py-12 md:py-16 border-y border-border/60 bg-background overflow-hidden"
    >
      <Reveal>
        <motion.div style={{ x }} className="flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap will-change-transform">
          {row.map((t, i) => (
            <span
              key={i}
              className="font-display italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-foreground/80 flex items-center gap-6 sm:gap-8 md:gap-12"
            >
              {t}
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-accent shrink-0" />
            </span>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}