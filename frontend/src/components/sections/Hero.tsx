import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
  const [offsets, setOffsets] = useState({ y1: -120, y2: -60, y3: -180, y4: -90 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile offsets (much smaller movements)
        setOffsets({ y1: -30, y2: -15, y3: -45, y4: -20 });
      } else {
        // Desktop offsets
        setOffsets({ y1: -120, y2: -60, y3: -180, y4: -90 });
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : offsets.y1]);
  const y2 = useTransform(scrollYProgress, [0, 1],[0, reduce ? 0 : offsets.y2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : offsets.y3]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : offsets.y4]);
  const rot1 = useTransform(scrollYProgress, [0, 1],[-4, reduce ? -4 : 4]);
  const rot3 = useTransform(scrollYProgress, [0, 1],[5, reduce ? 5 : -6]);

  return (
    <section
      ref={ref}
      // Removed "bg-gradient-warm noise" for a clean, solid background
      className="relative min-h-[100svh] pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-background"
    >
      {/* Clean, sharp grid overlay (No messy blurs) */}
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
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-semibold">
            JAZBAA · Live Your Passion · Celebrate YOU
          </span>
          <Sparkles className="h-3.5 w-3.5 text-palette-orange" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* LEFT — copy */}
          <div className="md:col-span-7">
            {/* Cleaned up typography using Display font and sharp tracking */}
            <h1 className="display text-[13vw] sm:text-[10vw] md:text-[7vw] lg:text-[6.2vw] font-bold max-w-[14ch] leading-[1.05] md:leading-[0.95] tracking-tight">
              <RevealText as="span" text="Keep your" className="block" />
              <RevealText
                as="span"
                text="passion alive."
                className="block text-palette-pink"
                delay={0.15}
              />
              <RevealText 
                as="span" 
                text="Live your JAZBAA." 
                className="block text-gradient-jazbaa pb-2" 
                delay={0.15} 
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-xl font-medium"
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
                  {/* Replaced blurry ember button with sharp gradient button */}
                  <Button asChild size="lg" className="w-full sm:w-auto h-12 bg-gradient-jazbaa text-white shadow-clean hover:shadow-hover border-0 hover:-translate-y-0.5 transition-all">
                    <Link to="/signup">
                      Join the Community <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
              <div className="w-full sm:w-auto">
                <Magnetic strength={0.2}>
                  {/* Replaced messy blur outline with a crisp, solid outline button */}
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 bg-card border border-border text-foreground hover:bg-secondary shadow-sm hover:shadow-clean transition-all">
                    <Link to="/events">
                      <Play className="h-4 w-4 mr-2" /> Explore Events
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </motion.div>

          </div>

          {/* RIGHT — image collage */}
          <div className="md:col-span-5 relative h-[380px] sm:h-[500px] md:h-[600px] mt-10 md:mt-0 w-full max-w-md mx-auto md:max-w-none">
            {/* Replaced shadow-clay and muddy rings with clean borders and sharp shadows */}
            <motion.div
              style={{ y: y1, rotate: rot1 }}
              className="absolute left-0 top-0 w-[55%] md:w-[58%] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card z-20"
            >
              <img
                src={HERO_IMG_1}
                alt="Friends laughing together at a community gathering"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="absolute right-0 top-6 sm:top-12 w-[50%] md:w-[52%] aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card z-10"
            >
              <img
                src={HERO_IMG_2}
                alt="Performer singing under warm stage light"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              style={{ y: y3, rotate: rot3 }}
              className="absolute left-4 sm:left-6 bottom-0 w-[45%] md:w-[48%] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card z-30"
            >
              <img
                src={HERO_IMG_3}
                alt="Dancer moving freely in golden light"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              style={{ y: y4 }}
              className="absolute right-2 bottom-8 sm:bottom-10 w-[38%] md:w-[40%] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-clean hover:shadow-hover border border-border/40 transition-shadow duration-500 bg-card hidden sm:block z-20"
            >
              <img
                src={HERO_IMG_4}
                alt="Crowd raising hands in joy"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span>Scroll</span>
        <motion.span
          animate={reduce ? undefined : { scaleY:[0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="h-10 w-[2px] rounded-full bg-palette-purple/40"
        />
      </motion.div>
    </section>
  );
}