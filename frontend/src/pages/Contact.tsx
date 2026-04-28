import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, MessageSquare, Send, Sparkles } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(140),
  message: z.string().trim().min(5, "A little more, please").max(1000),
});

const Contact = () => {
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      toast.success("Message sent. We'll write back soon!");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <div className="bg-[#fbfaf8] dark:bg-black min-h-screen selection:bg-[#ff6a3d]/30 transition-colors duration-500 relative overflow-hidden">
      
      {/* Ambient Dark Mode Glows */}
      <div className="absolute top-0 left-0 -z-10 w-[600px] h-[600px] bg-orange-400/10 dark:bg-[#ff6a3d]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="pt-32 md:pt-48 pb-16 px-4 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-[#ff6a3d]/10 border border-orange-200 dark:border-[#ff6a3d]/20 shadow-sm transition-colors duration-300 mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-[#ff6a3d]" />
              <span className="text-xs font-bold tracking-widest text-[#c04a18] dark:text-[#ff6a3d] uppercase">
                Get in touch
              </span>
            </div>
          </Reveal>
          
          <RevealText
            as="h1"
            text="Let's build something"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight transition-colors duration-300"
          />
          <RevealText
            as="h1"
            text="beautiful together."
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#ff6a3d] italic leading-tight tracking-tight mt-1"
            delay={0.1}
          />
        </div>
      </section>

      {/* =========================================
          CONTACT CONTENT GRID
          ========================================= */}
      <section className="pb-24 md:pb-32 px-4 relative z-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: INFO CARDS */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 font-medium mb-10 max-w-md transition-colors duration-300 leading-relaxed">
                Have a question, an idea, or want to start a JAZBAA chapter in your city? We're all ears.
              </p>
            </Reveal>

            {[
              { icon: Mail, l: "Write to us", v: "hello@jazbaa.life", cLight: "bg-blue-50 text-blue-600", cDark: "dark:bg-blue-500/10 dark:text-blue-400" },
              { icon: Phone, l: "Call us", v: "+91 90000 00000", cLight: "bg-emerald-50 text-emerald-600", cDark: "dark:bg-emerald-500/10 dark:text-emerald-400" },
              { icon: MapPin, l: "Find us", v: "NAVIRA LIFE Essentials, India", cLight: "bg-purple-50 text-purple-600", cDark: "dark:bg-purple-500/10 dark:text-purple-400" },
            ].map(({ icon: Icon, l, v, cLight, cDark }, i) => (
              <motion.div 
                key={l}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 md:p-8 rounded-[2rem] bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-center gap-5 md:gap-6">
                  <div className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${cLight} ${cDark}`}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-white/40 mb-1.5 transition-colors duration-300">{l}</p>
                    <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{v}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social / Extra Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-[2rem] bg-slate-900 dark:bg-zinc-800/80 border border-transparent dark:border-white/10 text-white overflow-hidden relative mt-8 transition-colors duration-300"
            >
              <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-white/5 rotate-12" />
              <h4 className="text-xl font-bold mb-3 relative z-10">Join the Community</h4>
              <p className="text-slate-300 dark:text-white/70 relative z-10 leading-relaxed font-medium">Follow our journey on Facebook for daily doses of passion and creativity.</p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: PROFESSIONAL FORM */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900/80 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/10 transition-colors duration-500 relative overflow-hidden">
              
              <form onSubmit={onSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <Label className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${focused === 'name' ? 'text-[#ff6a3d]' : 'text-slate-400 dark:text-white/40'}`}>
                      Full Name
                    </Label>
                    <Input 
                      name="name" 
                      required 
                      placeholder="John Doe"
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className="h-14 rounded-2xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-base dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${focused === 'email' ? 'text-[#ff6a3d]' : 'text-slate-400 dark:text-white/40'}`}>
                      Email Address
                    </Label>
                    <Input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="john@example.com"
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className="h-14 rounded-2xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-base dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${focused === 'subject' ? 'text-[#ff6a3d]' : 'text-slate-400 dark:text-white/40'}`}>
                    Subject
                  </Label>
                  <Input 
                    name="subject" 
                    required 
                    placeholder="How can we help?"
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    className="h-14 rounded-2xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-base dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-2.5">
                  <Label className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${focused === 'message' ? 'text-[#ff6a3d]' : 'text-slate-400 dark:text-white/40'}`}>
                    Your Message
                  </Label>
                  <Textarea 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="Tell us about your jazbaa..."
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="min-h-[140px] rounded-[1.5rem] bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-base dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 p-5 resize-y"
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={busy}
                    className="w-full h-14 md:h-16 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-[#ff6a3d] dark:hover:bg-[#ff6a3d] dark:hover:text-white text-base md:text-lg font-bold transition-all shadow-xl hover:shadow-[#ff6a3d]/20 active:scale-[0.98] group"
                  >
                    {busy ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                         <Sparkles className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message 
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    )}
                  </Button>
                </div>
                
                <p className="text-center text-slate-500 dark:text-white/40 text-sm font-medium pt-2 transition-colors duration-300">
                  We typically respond within 24-48 business hours.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Contact;