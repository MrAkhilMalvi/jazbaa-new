import { motion } from "framer-motion";

const items = [
  "Music", "Art", "Singing", "Dance", "Social Connect",
  "Hobbies", "Concerts", "Classic Movies"
];

export function Marquee() {
  const row = [...items, ...items, ...items];

  return (
    <section className="relative overflow-hidden border-y py-6 bg-white dark:bg-black border-black/10 dark:border-white/10">
      
      {/* Gradient edges (fixed for dark mode) */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0px", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {row.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 text-3xl text-black dark:text-white"
          >
            <span>{item}</span>

            {/* Dot separator (fixed) */}
            <span className="h-2 w-2 rounded-full bg-black dark:bg-white opacity-70" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}