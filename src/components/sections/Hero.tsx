import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { Magnetic } from "@/components/animations/MagneticButton";

// High-quality, contextual lifestyle photography (Unsplash).
const HERO_IMG_1 =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1100&q=85"; // friends laughing together
const HERO_IMG_2 =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=85"; // singer at mic, warm light
const HERO_IMG_3 =
  "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1100&q=85"; // dance / movement

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [-3, reduce ? -3 : 4]);
  const rot3 = useTransform(scrollYProgress, [0, 1], [4, reduce ? 4 : -5]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pt-32 pb-20 overflow-hidden bg-gradient-warm noise"
    >
      {/* Animated aurora background */}
      <Aurora className="opacity-80" />

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
        </motion.div>

        <h1 className="display text-[14vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[7.5vw] font-light max-w-[14ch]">
          <RevealText as="span" text="Keep your" className="block" />
          <RevealText
            as="span"
            text="passion alive."
            className="block italic font-medium text-accent"
            delay={0.15}
          />
          <RevealText as="span" text="Live your JAZBAA." className="block" delay={0.3} />
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="md:col-span-5 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance"
          >
            A vibrant community where music, movement, mindfulness, and
            meaningful connections come together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="md:col-span-5 md:col-start-8 flex flex-wrap gap-3"
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
        </div>

        {/* Floating parallax images */}
        <div className="relative mt-20 md:mt-28 h-[420px] md:h-[560px]">
          <motion.div
            style={{ y: y1, rotate: rot1 }}
            className="absolute left-0 md:left-4 top-0 w-[44%] md:w-[28%] aspect-[3/4] rounded-3xl overflow-hidden shadow-clay"
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
            className="absolute left-1/2 -translate-x-1/2 top-10 md:top-4 w-[52%] md:w-[34%] aspect-[4/5] rounded-3xl overflow-hidden shadow-clay"
          >
            <img
              src={HERO_IMG_2}
              alt="Performer singing into a microphone under warm stage light"
              loading="eager"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y3, rotate: rot3 }}
            className="absolute right-0 md:right-4 top-20 md:top-12 w-[44%] md:w-[26%] aspect-[3/4] rounded-3xl overflow-hidden shadow-clay"
          >
            <img
              src={HERO_IMG_3}
              alt="Person dancing freely with joyful movement"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Floating accent badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex absolute right-8 bottom-6 glass rounded-full px-5 py-3 items-center gap-3 shadow-soft"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs uppercase tracking-widest">Live · 100+ members</span>
          </motion.div>
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
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="h-10 w-px bg-foreground/40"
        />
      </motion.div>
    </section>
  );
}
