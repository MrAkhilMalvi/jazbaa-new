import { Reveal, RevealText } from "@/components/animations/Reveal";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BlobBackdrop } from "@/components/animations/BlobBackdrop";

const IMG = "/images/AboutSplit/aboutimage.jpg";

export function AboutSplit() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Responsive Parallax: Prevent image from flying out of container on mobile
  const [offsets, setOffsets] = useState([-60, 80]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOffsets([-20, 30]); // Smaller movement on mobile
      } else {
        setOffsets([-60, 80]); // Large movement on desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[]);

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : offsets);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1],[1.05, 1, 1.05]);

  return (
    <section ref={ref} className="relative py-16 md:py-24 lg:py-36 overflow-hidden">
      <BlobBackdrop className="-top-20 -left-10 md:-left-32 w-[300px] md:w-[640px] h-[300px] md:h-[640px]" />
      
      <div className="container-editorial relative grid gap-10 md:gap-20 md:grid-cols-12 items-start">
        
        {/* Left Content */}
        <div className="md:col-span-6 md:sticky md:top-32">
          <Reveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent mb-4 sm:mb-6">
              About JAZBAA
            </p>
          </Reveal>
          <RevealText
            as="h2"
            text="A movement for those who refuse to let their passion fade."
            className="display text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] md:leading-[1]"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              In today's fast-paced world, the hobbies we loved often take a
              backseat. JAZBAA brings them back to life — a vibrant, inclusive
              community where individuals from all walks of life come together to
              reconnect with what they love.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Music, singing, dance, books, mindfulness or movement — JAZBAA
              gives you the space, experts, people, and energy to live your
              passion.
            </p>
          </Reveal>
        </div>

        {/* Right Content */}
        <div className="md:col-span-6 mt-6 md:mt-0">
          <motion.div
            style={{ y }}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-clay aspect-[4/5] w-full max-w-md mx-auto md:max-w-none"
          >
            <motion.img
              style={{ scale }}
              src={IMG}
              alt="A community circle of friends laughing together"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 md:from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end sm:items-center justify-between text-background gap-4">
              <p className="font-display italic text-base sm:text-lg">— A second home.</p>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] opacity-80 text-right">JAZBAA · 2025</span>
            </div>
          </motion.div>

          <Reveal delay={0.2}>
            {/* Switched to grid-cols-1 on small screens so text doesn't squish */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mx-auto md:max-w-none">
              <div className="clay p-5 sm:p-6 text-center sm:text-left">
                <p className="font-display text-lg italic">Our Vision</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A global community where people live joyfully, creatively, and
                  consciously.
                </p>
              </div>
              <div className="clay p-5 sm:p-6 bg-foreground text-background text-center sm:text-left">
                <p className="font-display text-lg italic">Our Mission</p>
                <p className="mt-2 text-sm opacity-80 leading-relaxed">
                  Pursue hobbies, foster connections, promote holistic well-being.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}