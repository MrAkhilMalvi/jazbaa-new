import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CtaSection } from "@/components/sections/CtaSection";
import { motion } from "framer-motion";
import { Sparkles, Eye, Target, CheckCircle2, ArrowRight } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const TEAM_IMG = "/images/About/about1.jpg";
const images = [
  "/images/About/scrollimage1.jpeg",
  "/images/About/scrollimage2.jpeg",
  "/images/About/scrollimage3.jpeg",
  "/images/About/scrollimage4.jpeg",
  "/images/About/scrollimage5.jpeg",
  "/images/About/scrollimage6.jpeg",  
];

// GSAP-style fade up animation preset
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/* =========================================
   VERTICAL MARQUEE COMPONENT (FIXED)
   ========================================= */
export function VerticalImageMarquee({ images }: { images: string[] }) {
  // Duplicate images so there is enough content to scroll infinitely without snapping
  const scrollingImages = [...images, ...images, ...images];
  const half = Math.ceil(scrollingImages.length / 2);
  const firstCol = scrollingImages.slice(0, half);
  const secondCol = scrollingImages.slice(half);

  return (
    <div className="relative flex h-full w-full flex-row gap-4 overflow-hidden rounded-3xl p-3">
      
      {/* LEFT COLUMN (Scrolls UP) */}
      <div className="flex-1 overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:35s] h-full">
          {firstCol.map((src, i) => (
            <img
              key={`col1-${i}`}
              src={src}
              alt="JAZBAA Community"
              className="mb-4 w-full h-[220px] md:h-[260px] object-cover rounded-2xl shadow-md border border-slate-200 dark:border-white/10 transition-transform duration-300 hover:scale-[1.02]"
            />
          ))}
        </Marquee>
      </div>

      {/* RIGHT COLUMN (Scrolls DOWN / Reverse) */}
      {/* Added 'mt-8' to offset the images so they don't look perfectly symmetrical */}
      <div className="flex-1 overflow-hidden mt-8">
        <Marquee reverse pauseOnHover vertical className="[--duration:35s] h-full">
          {secondCol.map((src, i) => (
            <img
              key={`col2-${i}`}
              src={src}
              alt="JAZBAA Community"
              className="mb-4 w-full h-[220px] md:h-[260px] object-cover rounded-2xl shadow-md border border-slate-200 dark:border-white/10 transition-transform duration-300 hover:scale-[1.02]"
            />
          ))}
        </Marquee>
      </div>

      {/* TOP FADE - Matches the section background (bg-white / dark:bg-zinc-950) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white dark:from-zinc-950 to-transparent z-10" />

      {/* BOTTOM FADE */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent z-10" />
    </div>
  );
}

/* =========================================
   MAIN ABOUT COMPONENT
   ========================================= */
const About = () => {
  return (
    <div className="bg-[#fbfaf8] dark:bg-black transition-colors duration-300">
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section
        className="scroll-mt-28 pt-16 md:pt-20 pb-16 md:pb-24 px-4"
        id="about"
      >
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 mb-6 md:mb-8 border border-orange-200 dark:border-orange-500/20 shadow-sm transition-colors duration-300">
              <Sparkles className="w-4 h-4 text-[#ff6a3d]" />
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-[#c04a18] dark:text-[#ff6a3d] uppercase">
                About JAZBAA
              </span>
            </div>
          </Reveal>
          <RevealText
            as="h1"
            text="A community for the curious, the creative, the alive."
            className="text-[clamp(2.8rem,7vw,6.5rem)] font-bold text-slate-900 dark:text-white leading-[1.05] tracking-tight max-w-[16ch] transition-colors duration-300"
          />
        </div>
      </section>

      {/* =========================================
          HERO IMAGE REVEAL
          ========================================= */}
      <section className="pb-10 md:pb-10 px-4">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              clipPath: "inset(10% 10% 10% 10% round 2rem)",
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 2rem)",
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] aspect-[16/9] md:aspect-[21/9] relative"
          >
            <img
              src={TEAM_IMG}
              alt="JAZBAA community gathered together"
              loading="lazy"
              className="h-full w-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* =========================================
          VISION & MISSION 
          ========================================= */}
      <section className="py-20 md:py-20 px-4 relative bg-[#fbfaf8] dark:bg-black transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-300/10 dark:bg-orange-500/5 blur-[100px] rounded-full pointer-events-none transition-colors duration-300" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent -translate-x-1/2 transition-colors duration-300" />

            {/* VISION UNIT */}
            <motion.div {...fadeUp(0)} className="relative group flex flex-col justify-center lg:pr-12">
              <div className="absolute -inset-8 rounded-[3rem] bg-slate-100/0 group-hover:bg-slate-100/50 dark:group-hover:bg-white/[0.02] transition-colors duration-700 -z-10" />
              <div className="flex items-center gap-5 mb-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm group-hover:scale-110 group-hover:-rotate-3 group-hover:border-orange-200 dark:group-hover:border-orange-500/30 transition-all duration-500 ease-out">
                  <Eye className="w-8 h-8 text-[#ff6a3d]" />
                </div>
                <h3 className="text-sm md:text-2xl font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-white/40 group-hover:text-[#ff6a3d] transition-colors duration-500">
                  Our Vision
                </h3>
              </div>
              <p className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-slate-800 dark:text-white/90 leading-[1.3] tracking-tight transition-colors duration-300">
                To create a Happiness Club where people engage{" "}
                <span className="relative inline-block group/word cursor-default">
                  <span className="relative z-10 italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a3d] to-[#ff9e80] group-hover/word:to-[#ff6a3d] transition-all duration-500">
                    joyfully, creatively,
                  </span>
                  <span className="absolute bottom-1 left-0  w-full h-[3px] bg-[#ff6a3d]/30 origin-left scale-x-0 group-hover/word:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
                </span>{" "}
                and{" "}
                <span className="relative inline-block group/word cursor-default">
                  <span className="relative z-10 italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a3d] to-[#ff9e80] group-hover/word:to-[#ff6a3d] transition-all duration-500">
                    consciously.
                  </span>
                  <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#ff6a3d]/30 origin-left scale-x-0 group-hover/word:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
                </span>
              </p>
            </motion.div>

            {/* MISSION UNIT */}
            <motion.div {...fadeUp(0.2)} className="relative group flex flex-col justify-center lg:pl-12">
              <div className="absolute -inset-8 rounded-[3rem] bg-slate-100/0 group-hover:bg-slate-100/50 dark:group-hover:bg-white/[0.02] transition-colors duration-700 -z-10" />
              <div className="flex items-center gap-5 mb-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:border-orange-200 dark:group-hover:border-orange-500/30 transition-all duration-500 ease-out">
                  <Target className="w-8 h-8 text-[#ff6a3d]" />
                </div>
                <h3 className="text-sm md:text-2xl font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-white/40 group-hover:text-[#ff6a3d] transition-colors duration-500">
                  Our Mission
                </h3>
              </div>
              <ul>
                {[
                  "Encourage people to pursue hobbies consistently.",
                  "Create safe and inclusive social environments.",
                  "Promote holistic well-being.",
                  "Foster meaningful human connections.",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-5 group/item cursor-default py-2"
                  >
                    <div className="relative flex items-center justify-center w-8 h-8 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10 group-hover/item:bg-[#ff6a3d] transition-colors duration-500">
                      <ArrowRight className="w-4 h-4 text-white absolute -translate-x-full opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-500 ease-out" />
                      <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40 group-hover/item:scale-0 transition-transform duration-300" />
                    </div>
                    <span className="text-xl md:text-2xl font-medium text-slate-600 dark:text-white/60 group-hover/item:text-slate-900 dark:group-hover/item:text-white group-hover/item:translate-x-3 transition-all duration-500 ease-out leading-snug">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHO IT'S FOR
          ========================================= */}
      <section className="py-20 md:py-24 px-4 bg-white dark:bg-zinc-950 border-t border-slate-200/60 dark:border-white/10 transition-colors duration-300 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
<div className="lg:col-span-6 relative w-full h-[550px] md:h-[650px] flex justify-center items-center">
  <motion.div
    className="w-full max-w-[450px] lg:max-w-[500px] h-full  relative"
  >
     {/* Height works perfectly because parent is h-[550px] */}
    <VerticalImageMarquee images={images} />
  </motion.div>
</div>

          {/* Right: Content & Checklist */}
          <div className="lg:col-span-6 lg:pl-10">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                Who is it for?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium transition-colors duration-300">
                JAZBAA is for everyone who believes life is more than just
                routine.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4">
              {[
                "Working professionals seeking a creative outlet",
                "Entrepreneurs looking for mindful breaks",
                "Home-makers rediscovering hobbies",
                "Students exploring new passions",
                "Parents craving moments of joy",
                "Anyone who wants to feel alive again",
              ].map((it, i) => (
                <motion.div
                  key={it}
                  {...fadeUp(0.1 + i * 0.05)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg dark:hover:shadow-none hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#ff6a3d] shrink-0" />
                  <span className="text-slate-700 dark:text-white/80 font-medium md:text-lg group-hover:dark:text-white transition-colors duration-300">
                    {it}
                  </span>
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.5}>
              <div className="mt-12">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base bg-[#ff6a3d] hover:bg-[#e05b3e] text-white shadow-xl hover:shadow-orange-500/30 dark:hover:shadow-orange-500/20 hover:-translate-y-1 transition-all rounded-full border-0"
                >
                  <Link to="/signup">
                    Become part of JAZBAA{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
};

export default About;