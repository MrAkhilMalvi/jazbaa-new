import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, Calendar, Heart, Sparkles, 
  Globe, Zap, MapPin, Award 
} from "lucide-react";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Users, t: "Hobby Communities", d: "Access curated tribes around exactly what you love doing.", size: "md:col-span-2" },
  { icon: Calendar, t: "Exclusive Events", d: "Karaoke, jam sessions, book clubs & more.", size: "md:col-span-1" },
  { icon: Sparkles, t: "Express Yourself", d: "Perform, share, and learn — completely your way.", size: "md:col-span-1" },
  { icon: Heart, t: "Real Connection", d: "Meet real people who actually show up.", size: "md:col-span-1" },
  { icon: Globe, t: "Global Access", d: "Engage from anywhere or meet locally.", size: "md:col-span-1" },
];

const steps = [
  { 
    n: "01", t: "Register", d: "Sign up as a Member, Volunteer, or Tribe Leader. It takes exactly 2 minutes.", 
    bg: "bg-slate-900 dark:bg-zinc-900", text: "text-white", num: "text-white/5", icon: <Users className="w-8 h-8 text-[#ff6a3d]" /> 
  },
  { 
    n: "02", t: "Pick Interests", d: "Choose your top three hobbies and get instantly placed into tailored tracks.", 
    bg: "bg-[#ff6a3d]", text: "text-white", num: "text-black/10", icon: <Zap className="w-8 h-8 text-white" /> 
  },
  { 
    n: "03", t: "Show Up", d: "Attend events online or in your city. Real energy, real people, no pretenses.", 
    bg: "bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10", text: "text-slate-900 dark:text-white", num: "text-slate-900/5 dark:text-white/5", icon: <MapPin className="w-8 h-8 text-[#ff6a3d]" /> 
  },
  { 
    n: "04", t: "Grow Together", d: "Connect, perform, and build friendships that actually last beyond the event.", 
    bg: "bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10", text: "text-slate-900 dark:text-white", num: "text-slate-900/5 dark:text-white/5", icon: <Award className="w-8 h-8 text-[#ff6a3d]" /> 
  },
];

const Join = () => {
  return (
    <div className="bg-[#fbfaf8] dark:bg-black selection:bg-[#ff6a3d]/30 overflow-x-hidden transition-colors duration-500">
      
      {/* =========================================
          HERO SECTION (Minimal & Elegant)
          ========================================= */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden z-10">
        {/* Ambient Dark Mode Glow */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-[#ff6a3d]/10 dark:bg-[#ff6a3d]/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-[#ff6a3d]/10 border border-orange-200 dark:border-[#ff6a3d]/20 text-[#c04a18] dark:text-[#ff6a3d] text-xs font-bold tracking-widest uppercase mb-8 shadow-sm transition-colors duration-300">
              <Sparkles className="w-3.5 h-3.5" /> Join the Movement
            </span>
          </Reveal>
          
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <RevealText
                as="h1"
                text="Find your tribe."
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white transition-colors duration-300"
              />
              <RevealText
                as="h1"
                text="Fuel your passion."
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[#ff6a3d]"
                delay={0.1}
              />
            </div>
            
            <div className="lg:pt-4">
              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed transition-colors duration-300">
                  For those who refuse to let their passions fade into routine. Sign up for free and start showing up for yourself.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white h-12 px-8 text-base shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all">
                    <Link to="/signup">Become a Member <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 text-base border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BENEFITS BENTO GRID (Clean UI)
          ========================================= */}
      <section className="py-24 px-4 bg-white dark:bg-zinc-950 border-y border-slate-100 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight max-w-2xl transition-colors duration-300">
                What you get when you <span className="italic text-[#ff6a3d]">show up.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`${b.size} group relative overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-zinc-900/80 p-8 border border-slate-100 dark:border-white/5 hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors duration-300`}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-black shadow-sm border border-slate-100 dark:border-white/10 flex items-center justify-center mb-6 text-[#ff6a3d]">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{b.t}</h3>
                  <p className="text-slate-500 dark:text-white/60 text-base leading-relaxed transition-colors duration-300">{b.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          PINNED STACKING STEPS (Smooth & Subtle)
          ========================================= */}
      <section className="py-24 md:py-32 px-4 bg-[#fbfaf8] dark:bg-black transition-colors duration-500 relative">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-16 text-center">
            <Reveal>
               <p className="inline-block px-4 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/70 font-bold uppercase tracking-widest text-xs mb-6 transition-colors duration-300">
                 The Process
               </p>
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                 Four steps. <span className="italic text-[#ff6a3d]">Endless joy.</span>
               </h2>
            </Reveal>
          </div>

          <div className="relative">
            {steps.map((s, i) => (
              <div 
                key={s.n} 
                className="sticky mb-6"
                style={{ 
                  top: `calc(15vh + ${i * 24}px)`, // Refined stacking distance
                  zIndex: i + 1 
                }}
              >
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className={`${s.bg} ${s.text} rounded-[2rem] p-8 md:p-12 shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-colors duration-300 relative overflow-hidden origin-top`}
                >
                  {/* Subtle Background Number Overlay */}
                  <span className={`absolute -right-4 -bottom-4 text-[8rem] md:text-[12rem] font-black leading-none ${s.num} select-none transition-colors duration-300`}>
                    {s.n}
                  </span>

                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      {s.icon}
                    </div>
                  </div>
                  
                  <div className="w-full relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{s.t}</h3>
                    <p className="text-base md:text-lg opacity-80 leading-relaxed">
                      {s.d}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CO-CREATE SECTION (Professional Cards)
          ========================================= */}
      <section className="py-24 md:py-32 px-4 bg-white dark:bg-zinc-950 border-t border-slate-100 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          <Reveal>
            <div className="bg-slate-50 dark:bg-zinc-900 p-10 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/10 text-[#ff6a3d] flex items-center justify-center mb-8 border border-orange-200 dark:border-orange-500/20">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff6a3d] mb-4">Volunteer</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Co-create the experience.</h3>
              <p className="text-base text-slate-600 dark:text-white/60 mb-10 flex-grow leading-relaxed transition-colors duration-300">
                Help organize events, engage with members, and bring your ideas to life alongside a passionate team.
              </p>
              <Button asChild variant="outline" className="rounded-full h-12 px-8 text-base border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 w-fit transition-all">
                <Link to="/signup">Apply as Volunteer</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-slate-900 dark:bg-black p-10 md:p-12 rounded-[2.5rem] border border-slate-800 dark:border-white/10 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-orange-400 flex items-center justify-center mb-8 border border-white/10 backdrop-blur-md">
                <Globe className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">Chapter Lead</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Build your city's community.</h3>
              <p className="text-base text-slate-300 mb-10 flex-grow leading-relaxed">
                Host sessions, lead local events, and create real impact for people in your city. We'll back you with the platform.
              </p>
              <Button asChild className="rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white h-12 px-8 text-base border-0 w-fit transition-all">
                <Link to="/signup">Apply as Tribe Leader</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Join;