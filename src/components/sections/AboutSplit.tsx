import { Reveal, RevealText } from "@/components/animations/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BlobBackdrop } from "@/components/animations/BlobBackdrop";

const IMG =
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=85";

export function AboutSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      <BlobBackdrop className="-top-20 -left-32 w-[640px] h-[640px]" />
      <div className="container-editorial relative grid gap-12 md:gap-20 md:grid-cols-12 items-start">
        <div className="md:col-span-6 md:sticky md:top-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
              About JAZBAA
            </p>
          </Reveal>
          <RevealText
            as="h2"
            text="A movement for those who refuse to let their passion fade."
            className="display text-4xl md:text-6xl lg:text-7xl font-light"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              In today's fast-paced world, the hobbies we loved often take a
              backseat. JAZBAA brings them back to life — a vibrant, inclusive
              community where individuals from all walks of life come together to
              reconnect with what they love.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Music, singing, dance, books, mindfulness or movement — JAZBAA
              gives you the space, experts, people, and energy to live your
              passion.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <motion.div
            style={{ y }}
            className="relative rounded-3xl overflow-hidden shadow-clay aspect-[4/5]"
          >
            <motion.img
              style={{ scale }}
              src={IMG}
              alt="A community circle of friends laughing together"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-background">
              <p className="font-display italic text-lg">— A second home.</p>
              <span className="text-xs uppercase tracking-[0.25em] opacity-80">JAZBAA · 2025</span>
            </div>
          </motion.div>

          <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="clay p-6">
                <p className="font-display text-lg italic">Our Vision</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A global community where people live joyfully, creatively, and
                  consciously.
                </p>
              </div>
              <div className="clay p-6 bg-foreground text-background">
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
