import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/animations/Reveal";
import { Magnetic } from "@/components/animations/MagneticButton";

// Warm, joyful, human-focused photography (Unsplash). All q=85 for sharpness.
const HERO_IMG_1 = "/images/Hero/image1.jpg"; // friends laughing, warm
const HERO_IMG_2 = "/images/Hero/image2.jpg"; // singer on stage, warm
const HERO_IMG_3 = "/images/Hero/image5.jpg"; // dancer in golden light
const HERO_IMG_4 = "/images/Hero/hero1.jpg"; // crowd hands up, joy

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Responsive parallax offsets so images don't fly out of bounds on mobile
  const [offsets, setOffsets] = useState({
    y1: -120,
    y2: -60,
    y3: -180,
    y4: -120,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile offsets (smaller movements to keep 4 images in frame)
        setOffsets({ y1: -25, y2: -15, y3: -40, y4: -20 });
      } else if (window.innerWidth < 1024) {
        // Tablet offsets
        setOffsets({ y1: -60, y2: -30, y3: -90, y4: -50 });
      } else {
        // Desktop offsets
        setOffsets({ y1: -120, y2: -60, y3: -180, y4: -100 });
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : offsets.y1]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : offsets.y2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : offsets.y3]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : offsets.y4]);
  
  const rot1 = useTransform(scrollYProgress, [0, 1], [-4, reduce ? -4 : 4]);
  const rot3 = useTransform(scrollYProgress, [0, 1], [5, reduce ? 5 : -6]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-background"
    >
      {/* Clean, sharp grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-editorial relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          <span className="hidden sm:block h-px w-6 sm:w-10 bg-palette-purple" />
          <span className="text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-[0.12em] text-muted-foreground font-semibold">
            JAZBAA · Live Your Passion · Celebrate YOU
          </span>
          <Sparkles className="h-3.5 w-3.5 text-palette-orange shrink-0" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center lg:items-start">
          
          {/* =========================================
              LEFT — COPY SECTION
              ========================================= */}
          <div className="lg:col-span-7">
            <h1 className="display text-[14vw] sm:text-[9vw] lg:text-[5.5vw] xl:text-[6.2vw] font-bold max-w-[14ch] leading-[1.05] md:leading-[0.95] tracking-tight">
              <RevealText as="span" text="Keep your" className="block" />
              <RevealText
                as="span"
                text="passion alive."
                className="block text-palette-pink"
                delay={0.2}
              />
              <RevealText
                as="span"
                text="Live your JAZBAA."
                className="block text-gradient-jazbaa pb-2"
                delay={0.2}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-foreground/70 dark:text-foreground/80 leading-relaxed text-balance max-w-xl font-medium"
            >
              A vibrant community where music, movement, mindfulness, and
              meaningful connections come together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto"
            >
              <div className="w-full sm:w-auto">
                <Magnetic strength={0.2}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base bg-gradient-jazbaa text-white shadow-clean hover:shadow-hover border-0 hover:-translate-y-0.5 transition-all"
                  >
                    <Link to="/signup">
                      Join the Community <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
              <div className="w-full sm:w-auto">
                <Magnetic strength={0.2}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base bg-card border border-border text-foreground hover:bg-secondary shadow-sm hover:shadow-clean transition-all"
                  >
                    <Link to="/events">
                      <Play className="h-4 w-4 md:h-5 md:w-5 mr-2" /> Explore Events
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          {/* =========================================
              RIGHT — RESPONSIVE 4-IMAGE COLLAGE
              ========================================= */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[550px] md:h-[650px] lg:h-[600px] xl:h-[700px] mt-12 lg:mt-0 w-full max-w-[450px] sm:max-w-[600px] lg:max-w-none mx-auto">
            
            {/* Image 1: Top Left */}
            <motion.div
              style={{ y: y1, rotate: rot1 }}
              className="absolute left-0 top-0 w-[52%] sm:w-[50%] lg:w-[58%] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card z-20"
            >
              <img src={HERO_IMG_1} alt="Community gathering" loading="eager" className="h-full w-full object-cover" />
            </motion.div>

            {/* Image 2: Top Right */}
            <motion.div
              style={{ y: y2 }}
              className="absolute right-0 top-[8%] sm:top-[10%] w-[48%] sm:w-[45%] lg:w-[52%] aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card z-10"
            >
              <img src={HERO_IMG_2} alt="Singer performing" loading="eager" className="h-full w-full object-cover" />
            </motion.div>

            {/* Image 3: Bottom Left */}
            <motion.div
              style={{ y: y3, rotate: rot3 }}
              className="absolute left-[4%] sm:left-[8%] lg:left-[6%] bottom-0 w-[45%] sm:w-[42%] lg:w-[48%] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card z-30"
            >
              <img src={HERO_IMG_3} alt="Dancer" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>

            {/* Image 4: Bottom Right (NOW VISIBLE ON MOBILE) */}
            <motion.div
              style={{ y: y4 }}
              className="absolute right-[2%] sm:right-[5%] lg:right-2 bottom-[10%] sm:bottom-[15%] lg:bottom-10 w-[48%] sm:w-[46%] lg:w-[45%] aspect-[4/5] lg:aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card z-20"
            >
              <img src={HERO_IMG_4} alt="Crowd cheering" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}