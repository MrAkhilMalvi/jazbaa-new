import { Reveal } from "@/components/animations/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  "Sing.", "Dance.", "Read.", "Breathe.", "Connect.",
  "Create.", "Play.", "Belong.", "Live your JAZBAA.",
];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const row = [...items, ...items, ...items];
  return (
    <section
      ref={ref}
      aria-hidden
      className="relative py-12 md:py-16 border-y border-border/60 bg-background overflow-hidden"
    >
      <Reveal>
        <motion.div style={{ x }} className="flex gap-12 whitespace-nowrap will-change-transform">
          {row.map((t, i) => (
            <span
              key={i}
              className="font-display italic text-5xl md:text-7xl lg:text-8xl font-light text-foreground/80 flex items-center gap-12"
            >
              {t}
              <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
            </span>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}
