import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/animations/Reveal";

// Real human-focused photography (Unsplash). Warm tones, lifestyle.
const HERO_IMG_1 =
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80"; // people singing/concert
const HERO_IMG_2 =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"; // book club / community
const HERO_IMG_3 =
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80"; // dance / movement

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -200]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pt-32 pb-20 overflow-hidden bg-gradient-mesh noise"
    >
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
            JAZBAA · Live Your Passion
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
            <Button asChild variant="ember" size="lg">
              <Link to="/join">
                Join the Community <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/events">
                <Play className="h-4 w-4" /> Explore Events
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/login">Login</Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating parallax images */}
        <div className="relative mt-20 md:mt-28 h-[420px] md:h-[520px]">
          <motion.div
            style={{ y: y1 }}
            className="absolute left-0 md:left-4 top-0 w-[44%] md:w-[28%] aspect-[3/4] rounded-3xl overflow-hidden shadow-clay"
          >
            <img
              src={HERO_IMG_1}
              alt="People singing together at a community event"
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
              alt="Friends gathered around books and conversation"
              loading="eager"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute right-0 md:right-4 top-20 md:top-12 w-[44%] md:w-[26%] aspect-[3/4] rounded-3xl overflow-hidden shadow-clay"
          >
            <img
              src={HERO_IMG_3}
              alt="People dancing freely with joy"
              loading="lazy"
              className="h-full w-full object-cover"
            />
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
        <span className="h-10 w-px bg-foreground/30 animate-pulse" />
      </motion.div>
    </section>
  );
}
