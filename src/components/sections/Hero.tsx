import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Music, Users, Heart } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { Magnetic } from "@/components/animations/MagneticButton";

// Warm, joyful, human-focused photography (Unsplash). All q=85 for sharpness.
const HERO_IMG_1 =
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1100&q=85"; // friends laughing, warm
const HERO_IMG_2 =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=85"; // singer on stage, warm
const HERO_IMG_3 =
  "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1100&q=85"; // dancer in golden light
const HERO_IMG_4 =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=85"; // crowd hands up, joy

const floats = [
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -180]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [-4, reduce ? -4 : 4]);
  const rot3 = useTransform(scrollYProgress, [0, 1], [5, reduce ? 5 : -6]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pt-32 pb-20 overflow-hidden bg-gradient-warm noise"
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
        animate={reduce ? undefined : { scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
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
                y: [0, -14, 0, -10, 0],
                rotate: [0, 8, -6, 4, 0],
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

      <div className="container-editorial relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            JAZBAA · Live Your Passion · Celebrate YOU
          </span>
          <Sparkles className="h-3.5 w-3.5 text-accent" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* LEFT — copy */}
          <div className="md:col-span-7">
            <h1 className="display text-[14vw] sm:text-[10vw] md:text-[7vw] lg:text-[6.2vw] font-light max-w-[14ch]">
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
              className="mt-10 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-xl"
            >
              A vibrant community where music, movement, mindfulness, and
              meaningful connections come together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Magnetic strength={0.3}>
                <Button asChild variant="ember" size="lg">
                  <Link to="/signup">
                    Join the Community <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Button asChild variant="outline" size="lg">
                  <Link to="/events">
                    <Play className="h-4 w-4" /> Explore Events
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="ghost" size="lg">
                <Link to="/login">Login</Link>
              </Button>
            </motion.div>

            {/* Happiness stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-xl"
            >
              {[
                { icon: Users, n: "100+", l: "Happy members" },
                { icon: Music, n: "12+", l: "Passion tracks" },
                { icon: Heart, n: "∞", l: "Good vibes" },
              ].map((s) => (
                <div key={s.l} className="clay p-4 md:p-5">
                  <s.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <p className="font-display text-2xl md:text-3xl mt-2">{s.n}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — image collage */}
          <div className="md:col-span-5 relative h-[460px] md:h-[600px]">
            <motion.div
              style={{ y: y1, rotate: rot1 }}
              className="absolute left-0 top-0 w-[58%] aspect-[3/4] rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5"
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
              className="absolute right-0 top-12 w-[52%] aspect-[4/5] rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5"
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
              className="absolute left-6 bottom-0 w-[48%] aspect-[3/4] rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5"
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
              className="absolute right-2 bottom-10 w-[40%] aspect-square rounded-3xl overflow-hidden shadow-clay ring-1 ring-foreground/5 hidden sm:block"
            >
              <img
                src={HERO_IMG_4}
                alt="Crowd raising hands in joy"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Floating "live" badge — solid bg, no backdrop-blur */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-foreground text-background rounded-full px-4 py-2.5 flex items-center gap-2 shadow-clay z-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em]">Live now</span>
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
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="h-10 w-px bg-foreground/40"
        />
      </motion.div>
    </section>
  );
}
