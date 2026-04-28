import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CtaSection } from "@/components/sections/CtaSection";
import { motion } from "framer-motion";
import { Sparkles, Eye, Target, CheckCircle2, ArrowRight } from "lucide-react";

const TEAM_IMG = "/images/About/about1.jpg";
const PORTRAIT_1 = "/images/About/about2.jpg";
const PORTRAIT_2 = "/images/About/about3.jpg";

// GSAP-style fade up animation preset
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const About = () => {
  return (
    // Added dark:bg-black and transition-colors
    <div className="bg-[#fbfaf8] dark:bg-black overflow-hidden transition-colors duration-300">
      
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            {/* Dark mode badge adjustments */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 mb-6 md:mb-8 border border-orange-200 dark:border-orange-500/20 shadow-sm transition-colors duration-300">
              <Sparkles className="w-4 h-4 text-[#ff6a3d]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.15em] text-[#c04a18] dark:text-orange-400 uppercase">
                About JAZBAA
              </span>
            </div>
          </Reveal>
          {/* Ensure RevealText accepts className correctly. Added dark:text-white */}
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
      <section className="pb-20 md:pb-32 px-4">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, clipPath: "inset(10% 10% 10% 10% round 2rem)" }}
            whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            // Added dark:shadow-none and a dark glow for premium feel
            className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] aspect-[16/9] md:aspect-[21/9] relative"
          >
            <img 
              src={TEAM_IMG} 
              alt="JAZBAA community gathered together" 
              loading="lazy" 
              className="h-full w-full object-cover scale-105" 
            />
            {/* Inner shadow for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* =========================================
          OUR STORY (Sticky Scroll Layout)
          ========================================= */}
      <section className="py-20 md:py-32 px-4 bg-white dark:bg-zinc-950 border-y border-slate-200/60 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 md:gap-20">
          
          <div className="md:col-span-5 md:relative">
            <div className="md:sticky md:top-32">
              <Reveal>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                  Our <span className="italic text-[#ff6a3d]">Story.</span>
                </h2>
                <div className="w-20 h-1.5 bg-[#ff6a3d] mt-6 rounded-full" />
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-7 space-y-8 text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium transition-colors duration-300">
            <Reveal delay={0.1}>
              <p>
                In today's fast-paced world, the hobbies and passions we enjoyed
                in our early years often take a backseat. JAZBAA brings them
                back to life.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                We are a vibrant, inclusive community where individuals from all
                walks of life come together to reconnect with what they love
                doing as their hobbies. Whether it's music, singing, dance,
                books, mindfulness or movement — JAZBAA gives you the space,
                experts, people with common interests, and energy to live your
                passion.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-slate-900 dark:text-white font-semibold text-xl md:text-2xl border-l-4 border-[#ff6a3d] pl-6 italic transition-colors duration-300">
                "JAZBAA is more than a community. It is a movement for those who
                refuse to let their hobbies, interests and passions fade away in
                the rush of everyday life."
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================
          VISION & MISSION (Animated Feature Cards)
          ========================================= */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        {/* Background glow adapted for dark mode */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-200/30 dark:bg-orange-500/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-300" />

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
          
          {/* VISION CARD - Light/Glass Design (Adapts to Dark) */}
          <motion.div 
            {...fadeUp(0)}
            className="group relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-10 md:p-14 rounded-[2rem] shadow-xl dark:shadow-none border border-white dark:border-white/10 hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(255,106,61,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Decorative Vector */}
            <Eye className="absolute -right-10 -top-10 w-64 h-64 text-slate-100 dark:text-white/5 rotate-12 group-hover:rotate-0 transition-all duration-700 ease-out" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-8 shadow-inner dark:shadow-none border border-transparent dark:border-orange-500/20 transition-colors duration-300">
                <Eye className="w-7 h-7 text-[#ff6a3d]" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff6a3d] mb-4">Our Vision</p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-[1.2] tracking-tight transition-colors duration-300">
                To create a global community where people live and engage <span className="italic text-[#ff6a3d]">joyfully, creatively,</span> and <span className="italic text-[#ff6a3d]">consciously.</span>
              </h3>
            </div>
          </motion.div>

          {/* MISSION CARD - Dark/Vibrant Design (Kept dark, refined for true dark mode) */}
          <motion.div 
            {...fadeUp(0.2)}
            className="group relative bg-slate-900 dark:bg-zinc-900/90 p-10 md:p-14 rounded-[2rem] shadow-xl dark:shadow-none border border-slate-800 dark:border-white/10 hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-[0_0_30px_rgba(255,106,61,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Decorative Vector */}
            <Target className="absolute -right-10 -top-10 w-64 h-64 text-slate-800/50 dark:text-white/5 -rotate-12 group-hover:rotate-0 transition-all duration-700 ease-out" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
                <Target className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400 mb-6">Our Mission</p>
              
              {/* Staggered List Animation */}
              <ul className="space-y-5 text-xl md:text-2xl font-medium text-slate-300 dark:text-white/80 transition-colors duration-300">
                {[
                  "Encourage people to pursue hobbies consistently.",
                  "Create safe and inclusive social environments.",
                  "Promote holistic well-being.",
                  "Foster meaningful human connections."
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                    className="flex items-start gap-4 group/item"
                  >
                    <ArrowRight className="w-6 h-6 text-[#ff6a3d] shrink-0 mt-1 transition-transform group-hover/item:translate-x-2" />
                    <span className="leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          WHO IT'S FOR (Editorial Overlap Layout)
          ========================================= */}
      <section className="py-20 md:py-32 px-4 bg-white dark:bg-zinc-950 border-t border-slate-200/60 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left: Overlapping Image Collage */}
          <div className="lg:col-span-6 relative w-full max-w-[500px] mx-auto lg:max-w-none h-[500px] md:h-[600px]">
            <motion.div 
              {...fadeUp(0)}
              className="absolute left-0 top-0 w-[65%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10 border-4 border-white dark:border-zinc-900 transition-colors duration-300"
            >
              <img src={PORTRAIT_1} alt="JAZBAA member" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              {...fadeUp(0.2)}
              className="absolute right-0 bottom-0 w-[60%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] z-20 border-4 border-white dark:border-zinc-900 transition-colors duration-300"
            >
              <img src={PORTRAIT_2} alt="JAZBAA member" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Decorative accent behind images */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-orange-100 dark:bg-orange-900/20 rounded-full blur-[60px] -z-10 transition-colors duration-300" />
          </div>

          {/* Right: Content & Checklist */}
          <div className="lg:col-span-6 lg:pl-10">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                Who it's for.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium transition-colors duration-300">
                JAZBAA is for everyone who believes life is more than just routine.
              </p>
            </Reveal>
            
            <div className="mt-10 grid gap-4">
              {[
                "Working professionals seeking a creative outlet",
                "Entrepreneurs looking for mindful breaks",
                "Home-makers rediscovering hobbies",
                "Students exploring new passions",
                "Parents craving moments of joy",
                "Anyone who wants to feel alive again"
              ].map((it, i) => (
                <motion.div 
                  key={it} 
                  {...fadeUp(0.1 + (i * 0.05))}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg dark:hover:shadow-none hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#ff6a3d] shrink-0" />
                  <span className="text-slate-700 dark:text-white/80 font-medium md:text-lg group-hover:dark:text-white transition-colors duration-300">{it}</span>
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.5}>
              <div className="mt-12">
                <Button asChild size="lg" className="h-14 px-8 text-base bg-[#ff6a3d] hover:bg-[#e05b3e] text-white shadow-xl hover:shadow-orange-500/30 dark:hover:shadow-orange-500/20 hover:-translate-y-1 transition-all rounded-full border-0">
                  <Link to="/signup">
                    Become part of JAZBAA <ArrowRight className="ml-2 h-5 w-5" />
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