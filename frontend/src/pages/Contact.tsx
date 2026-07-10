import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  Send,
  Sparkles,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { schema } from "@/lib/contact.schema";

const Contact = () => {
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }

    setBusy(true);

    try {
      await emailjs.send(
        "service_4mkeh9r",
        "template_q2gnm91",
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        "q8qaVW87xEZmdz_Qg",
      );

      toast.success("Message sent successfully 🚀");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message ❌");
    } finally {
      setBusy(false);
    }
  };

  // Social media list configuration
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/jazbaa.events/",
      icon: Instagram,
      hoverClass: "hover:bg-pink-600 hover:text-white hover:border-pink-500",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61591240624769",
      icon: Facebook,
      hoverClass: "hover:bg-blue-600 hover:text-white hover:border-blue-500",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@Jazbaa",
      icon: Youtube,
      hoverClass: "hover:bg-red-600 hover:text-white hover:border-red-500",
    },
  ];

  return (
    <div className="bg-[#fbfaf8] dark:bg-black min-h-screen selection:bg-[#ff6a3d]/30 transition-colors duration-500 relative overflow-hidden">
      {/* Ambient Dark Mode Glows */}
      <div className="absolute top-0 left-0 -z-10 w-[500px] h-[500px] bg-orange-400/10 dark:bg-[#ff6a3d]/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-400/5 dark:bg-blue-500/5 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* =========================================
          HERO SECTION (Optimized Heights)
          ========================================= */}
      <section className="pt-24 md:pt-32 pb-8 px-4 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <RevealText
            as="h1"
            text="Contact Us & Enquiry"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight transition-colors duration-300"
          />
        </div>
      </section>

      {/* =========================================
          CONTACT CONTENT GRID (Aligned & Compact)
          ========================================= */}
      <section className="pb-16 md:pb-20 px-4 relative z-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE: INFO CARDS */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <p className="text-sm md:text-base text-slate-600 dark:text-white/60 font-medium mb-6 max-w-md transition-colors duration-300 leading-relaxed">
                Have a question, an idea, or want to start a JAZBAA chapter in
                your city? We're all ears.
              </p>
            </Reveal>

            {[
              {
                icon: Mail,
                l: "Write to us",
                v: "support.jazbaa@gmail.com",
                cLight: "bg-blue-50 text-blue-600",
                cDark: "dark:bg-blue-500/10 dark:text-blue-400",
              },
              {
                icon: Phone,
                l: "Contact us",
                v: "+91 989 239 4310",
                cLight: "bg-emerald-50 text-emerald-600",
                cDark: "dark:bg-emerald-500/10 dark:text-emerald-400",
              },
            ].map(({ icon: Icon, l, v, cLight, cDark }, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group p-4 md:p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md dark:shadow-none hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 md:h-11 md:w-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0 ${cLight} ${cDark}`}
                  >
                    <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-white/40 mb-0.5 transition-colors duration-300">
                      {l}
                    </p>
                    <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate transition-colors duration-300">
                      {v}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social / Extra Info Card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 md:p-6 rounded-2xl bg-slate-900 dark:bg-zinc-800/80 border border-transparent dark:border-white/10 text-white overflow-hidden relative transition-colors duration-300"
            >
              <Sparkles className="absolute -right-4 -top-4 w-16 h-16 text-white/5 rotate-12 pointer-events-none" />
              
              <h4 className="text-base font-bold mb-1.5 relative z-10">
                Join the Community
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-white/70 relative z-10 leading-relaxed font-medium mb-5">
                Follow our journey across platforms for daily updates on passion, events, and creativity.
              </p>

              {/* Layout Container: Keeps the phrase left-aligned and row handles icons on right */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                {/* The Phrase */}
                <p className="text-xs tracking-widest font-bold text-orange-400 dark:text-orange-400/90 uppercase whitespace-nowrap">
                  Connect, Like, Follow, Share
                </p>

                {/* Social Media Links Icons */}
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map(({ name, href, icon: Icon, hoverClass }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${name}`}
                      className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-slate-200 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${hoverClass}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: COMPACT PROFESSIONAL FORM */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900/80 p-5 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-lg border border-slate-100 dark:border-white/10 transition-colors duration-500 relative overflow-hidden">
              <form
                onSubmit={onSubmit}
                className="space-y-4 md:space-y-5 relative z-10"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <Label
                      className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${focused === "name" ? "text-[#ff6a3d]" : "text-slate-400 dark:text-white/40"}`}
                    >
                      Full Name
                    </Label>
                    <Input
                      name="name"
                      required
                      placeholder="John Doe"
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className="h-10 md:h-11 rounded-xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-sm dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <Label
                      className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${focused === "email" ? "text-[#ff6a3d]" : "text-slate-400 dark:text-white/40"}`}
                    >
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="h-10 md:h-11 rounded-xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-sm dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <Label
                    className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${focused === "subject" ? "text-[#ff6a3d]" : "text-slate-400 dark:text-white/40"}`}
                  >
                    Subject
                  </Label>
                  <Input
                    name="subject"
                    required
                    placeholder="How can we help?"
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    className="h-10 md:h-11 rounded-xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-sm dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                  />
                  {errors.subject && (
                    <span className="text-xs text-red-500 block">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <Label
                    className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${focused === "message" ? "text-[#ff6a3d]" : "text-slate-400 dark:text-white/40"}`}
                  >
                    Your Message
                  </Label>
                  <Textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your jazbaa..."
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className="min-h-[100px] rounded-xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black focus:border-[#ff6a3d] dark:focus:border-[#ff6a3d] focus:ring-4 focus:ring-[#ff6a3d]/10 transition-all text-sm dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 p-4 resize-y"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Button Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={busy}
                    className="w-full h-11 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-[#ff6a3d] dark:hover:bg-[#ff6a3d] dark:hover:text-white text-sm font-bold transition-all shadow hover:shadow-orange-500/10 group"
                  >
                    {busy ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <span className="flex items-center gap-1.5 justify-center">
                        Send Message
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;