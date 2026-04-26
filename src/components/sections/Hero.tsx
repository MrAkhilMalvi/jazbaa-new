import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Music, Users, Heart } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { Magnetic } from "@/components/animations/MagneticButton";

// Warm, joyful, human-focused photography (Unsplash). All q=85 for sharpness.
const HERO_IMG_1 = "/images/Hero/image1.jpg"; // friends laughing, warm
const HERO_IMG_2 = "/images/Hero/image2.jpg"; // singer on stage, warm
const HERO_IMG_3 = "/images/Hero/image5.jpg"; // dancer in golden light
const HERO_IMG_4 = "/images/Hero/image11.jpg"; // crowd hands up, joy

const floats =[
  { e: "🎤", x: "8%", y: "18%", d: 0 },
  { e: "🎸", x: "92%", y: "12%", d: 0.6 },
  { e: "💃", x: "94%", y: "78%", d: 1.2 },
  { e: "📚", x: "5%", y: "82%", d: 1.8 },
  { e: "🧘", x: "50%", y: "5%", d: 2.4 },
  { e: "✨", x: "20%", y: "55%", d: 3.0 },
];

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
      className="relative min-h-[100svh] pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-gradient-warm noise"
    >
      {/* Animated aurora glow */}
      <Aurora className="opacity-90" intensity={1.15} />

      {/* Warm sunlit gradient ribbon */}
      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[140%] h-[600px] rounded-[100%] opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--accent) / 0.55), hsl(var(--accent-glow) / 0.3) 40%, transparent 70%)",
        }}
        animate={reduce ? undefined : { scale:[1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating emoji confetti */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 pointer-events-none hidden md:block">
          {floats.map((f, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl select-none drop-shadow-md"
              style={{ left: f.x, top: f.y }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 1, 1, 0.85],
                scale: [0.6, 1, 1, 1],
                y:[0, -14, 0, -10, 0],
                rotate:[0, 8, -6, 4, 0],
              }}
              transition={{
                duration: 7 + (i % 3),
                delay: f.d,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {f.e}
            </motion.span>
          ))}
        </div>
      )}

      <div className="container-editorial relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          <span className="hidden sm:block h-px w-6 sm:w-10 bg-accent" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-muted-foreground font-medium">
            JAZBAA · Live Your Passion · Celebrate YOU
          </span>
          <Sparkles className="h-3.5 w-3.5 text-accent" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* LEFT — copy */}
          <div className="md:col-span-7">
            <h1 className="display text-[13vw] sm:text-[10vw] md:text-[7vw] lg:text-[6.2vw] font-light max-w-[14ch] leading-[1.1] md:leading-[0.95]">
              <RevealText as="span" text="Keep your" className="block" />
              <RevealText
                as="span"
                text="passion alive."
                className="block italic font-medium text-accent"
                delay={0.15}
              />
              <RevealText as="span" text="Live your JAZBAA." className="block" delay={0.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-6 md:mt-10 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-xl"
            >
              A vibrant community where music, movement, mindfulness, and
              meaningful connections come together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <div className="w-full sm:w-auto">
                <Magnetic strength={0.2}>
                  <Button asChild variant="ember" size="lg" className="w-full sm:w-auto h-12">
                    <Link to="/signup">
                      Join the Community <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
              <div className="w-full sm:w-auto">
                <Magnetic strength={0.2}>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 bg-white/50 backdrop-blur-sm">
                    <Link to="/events">
                      <Play className="h-4 w-4 mr-1" /> Explore Events
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </motion.div>

            {/* Happiness stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-10 md:mt-12 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl"
            >
              {[
                { icon: Users, n: "100+", l: "Happy members" },
                { icon: Music, n: "12+", l: "Passion tracks" },
                { icon: Heart, n: "∞", l: "Good vibes" },
              ].map((s) => (
                <div key={s.l} className="clay p-3 sm:p-4 md:p-5 flex flex-col items-center md:items-start text-center md:text-left">
                  <s.icon className="h-4 w-4 md:h-5 md:w-5 text-accent mb-1 md:mb-0" strokeWidth={1.5} />
                  <p className="font-display text-xl sm:text-2xl md:text-3xl mt-1 md:mt-2">{s.n}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — image collage */}
          <div className="md:col-span-5 relative h-[380px] sm:h-[500px] md:h-[600px] mt-10 md:mt-0 w-full max-w-md mx-auto md:max-w-none">
            <motion.div
              style={{ y: y1, rotate: rot1 }}
              className="absolute left-0 top-0 w-[55%] md:w-[58%] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5 z-20"
            >
              <img
                src={HERO_IMG_1}
                alt="Friends laughing together at a community gathering"
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent mix-blend-multiply" />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="absolute right-0 top-6 sm:top-12 w-[50%] md:w-[52%] aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5 z-10"
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
              className="absolute left-4 sm:left-6 bottom-0 w-[45%] md:w-[48%] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5 z-30"
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
              className="absolute right-2 bottom-8 sm:bottom-10 w-[38%] md:w-[40%] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5 hidden sm:block z-20"
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
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span>Scroll</span>
        <motion.span
          animate={reduce ? undefined : { scaleY:[0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="h-10 w-px bg-foreground/40"
        />
      </motion.div>
    </section>
  );
}