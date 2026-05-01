import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, CheckCircle2 } from "lucide-react";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupApi } from "@/api/Auth.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/Field";

// Replace with your actual illustration path
const SIGNUP_ILLUSTRATION = "/images/singupimg.webp";

const interestsList = [
  "Music",
  "Art",
  "Karaoke / Singing",
  "Dance",
  "Meditation",
  "Open Mic",
  "Drawing",
  "Reader's Club",
  "Story Telling",
  "Concert / Classic Movies",
  "Photography",
];

const schema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(60),
    lastName: z.string().trim().min(1, "Last name is required").max(60),
    email: z.string().trim().email("Please enter a valid email").max(255),
    mobile: z.string().trim().min(7, "Invalid mobile number").max(20),
    city: z.string().trim().min(1, "City is required").max(80),
    state: z.string().trim().min(1, "State is required").max(80),
    country: z.string().trim().min(1, "Country is required").max(80),
    ageGroup: z.enum(["upto25", "25to50", "over50"], { required_error: "Please select an age group" }),
    category: z.enum(["Member", "Volunteer", "Lead"], { required_error: "Please select a sign-up category" }),
    interests: z.array(z.string()).min(1, "Pick at least 1 interest").max(3, "You can only pick up to 3 interests"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    consent: z.boolean().refine((val) => val === true, { message: "You must agree to the terms to sign up." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // Controlled UI States
  const [interests, setInterests] = useState<string[]>([]);
  const [category, setCategory] = useState<"Member" | "Volunteer" | "Lead">("Member");
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [consent, setConsent] = useState(false);

  const toggleInterest = (i: string) => {
    setInterests((curr) => {
      if (curr.includes(i)) return curr.filter((x) => x !== i);
      if (curr.length >= 3) {
        toast.warning("You can only pick your top 3 interests.");
        return curr;
      }
      return [...curr, i];
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      toast.error("Please agree to the consent terms to continue.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      mobile: String(fd.get("mobile") ?? ""),
      city: String(fd.get("city") ?? ""),
      state: String(fd.get("state") ?? ""),
      country,
      ageGroup,
      category,
      interests,
      password: String(fd.get("password") ?? ""),
      confirmPassword: String(fd.get("confirmPassword") ?? ""),
      consent,
    };

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }

    try {
      setSubmitting(true);
      await signupApi(data);
      toast.success("Welcome to JAZBAA 🎉");
      (e.target as HTMLFormElement).reset();
      setInterests([]);
      navigate("/login");
    } catch (err: any) {
      // Handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-[#fbfaf8] dark:bg-black transition-colors duration-500 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-400/10 dark:bg-[#ff6a3d]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
        
        {/* =========================================
            LEFT PANEL (Marketing & Illustration)
            ========================================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <Reveal delay={0.1} className="w-full flex flex-col items-center lg:items-start">
            {/* Animated "Free" Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-100 dark:bg-[#ff6a3d]/10 border border-orange-200 dark:border-[#ff6a3d]/20 shadow-sm mb-6 cursor-default transition-colors duration-300"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6a3d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6a3d]"></span>
              </span>
              <span className="text-sm md:text-base font-bold text-[#c04a18] dark:text-[#ff6a3d] uppercase tracking-wider">
                100% Free to Join
              </span>
            </motion.div>

            <RevealText
              as="h1"
              text="Claim your space."
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] text-center lg:text-left w-full"
            />
            
            <p className="text-slate-600 dark:text-white/70 text-lg md:text-xl mt-6 font-medium leading-relaxed max-w-md">
              Takes less than 2 minutes to join the movement and start reconnecting with what you love.
            </p>
          </Reveal>

          {/* Value Propositions / Checklist */}
          <div className="pt-2 lg:pt-6 space-y-4 lg:space-y-5 w-full max-w-md">
            {[
              "Connect with like-minded peers",
              "Access exclusive local events",
              "Showcase your talents and hobbies",
              "Zero membership fees, forever",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 group justify-center lg:justify-start"
              >
                <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-slate-100 dark:bg-white/5 group-hover:bg-[#ff6a3d] transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-slate-400 dark:text-white/40 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-base md:text-lg text-slate-700 dark:text-white/80 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Beautiful Floating Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[600px] mt-8 lg:mt-12 relative hidden sm:block"
          >
            {/* Soft backdrop glow for the illustration in dark mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ff6a3d]/20 blur-[60px] rounded-full -z-10 hidden dark:block" />
            
            <motion.img
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={SIGNUP_ILLUSTRATION}
              alt="Join our community"
              className="w-full h-full object-contain drop-shadow-2xl dark:drop-shadow-[0_10px_30px_rgba(255,106,61,0.15)] rounded-lg"
            />
          </motion.div>
        </div>

        {/* =========================================
            RIGHT PANEL (The Form)
            ========================================= */}
        <div className="lg:col-span-7 w-full">
          <Reveal delay={0.2}>
            <form
              onSubmit={onSubmit}
              className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl dark:shadow-none border border-slate-200/60 dark:border-white/10 space-y-10 md:space-y-12 transition-colors duration-500 relative overflow-hidden"
            >
              {/* Subtle glass reflection effect inside form */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent pointer-events-none" />

              {/* --- PERSONAL INFO --- */}
              <div className="space-y-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-4">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <Field label="First name" focusState={focused === "fn"}>
                    <Input name="firstName" required onFocus={() => setFocused("fn")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                  <Field label="Last name" focusState={focused === "ln"}>
                    <Input name="lastName" required onFocus={() => setFocused("ln")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                  <Field label="Email Address" focusState={focused === "em"}>
                    <Input name="email" type="email" required onFocus={() => setFocused("em")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                  <Field label="Mobile Number" focusState={focused === "mo"}>
                    <Input name="mobile" type="tel" required onFocus={() => setFocused("mo")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                  <Field label="Password" focusState={focused === "pw"}>
                    <Input name="password" type="password" required minLength={6} onFocus={() => setFocused("pw")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                  <Field label="Confirm Password" focusState={focused === "cpw"}>
                    <Input name="confirmPassword" type="password" required minLength={6} onFocus={() => setFocused("cpw")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                </div>
              </div>

              {/* --- LOCATION & AGE --- */}
              <div className="space-y-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-4">
                  Demographics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                  <Field label="City" focusState={focused === "ct"}>
                    <Input name="city" required onFocus={() => setFocused("ct")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                  <Field label="State" focusState={focused === "st"}>
                    <Input name="state" required onFocus={() => setFocused("st")} onBlur={() => setFocused(null)} className="form-input-premium" />
                  </Field>
                  <Field label="Country" focusState={false}>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white transition-all text-sm md:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["India", "United States", "United Kingdom", "UAE", "Singapore", "Canada", "Australia", "Other"].map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <div>
                  <Label className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 mb-3 block">
                    Age Group
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { v: "upto25", l: "Up to 25" },
                      { v: "25to50", l: "25 – 50" },
                      { v: "over50", l: "50+" },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => setAgeGroup(o.v)}
                        className={cn(
                          "px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold border transition-all duration-300",
                          ageGroup === o.v
                            ? "bg-[#ff6a3d] border-[#ff6a3d] text-white shadow-md shadow-[#ff6a3d]/20 scale-[1.02]"
                            : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300 dark:hover:border-white/30 hover:scale-[1.02]"
                        )}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- ROLE CATEGORY --- */}
              <div className="space-y-4 relative z-10">
                <Label className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 mb-2 block">
                  How do you want to join?
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { v: "Member", d: "Attend events & connect" },
                    { v: "Volunteer", d: "Help organize & engage" },
                    { v: "Lead", d: "Lead a city Chapter" },
                  ].map((o) => (
                     <button
                      key={o.v}
                      type="button"
                      onClick={() => setCategory(o.v as any)}
                      className={cn(
                        "p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-1.5 md:gap-2",
                        category === o.v
                          ? "bg-orange-50 dark:bg-[#ff6a3d]/10 border-[#ff6a3d] ring-1 ring-[#ff6a3d] scale-[1.02]"
                          : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:scale-[1.02]"
                      )}
                    >
                      <span className={cn("font-bold text-base md:text-lg transition-colors", category === o.v ? "text-[#ff6a3d]" : "text-slate-900 dark:text-white")}>
                        {o.v}
                      </span>
                      <span className="text-xs md:text-sm text-slate-500 dark:text-white/50 leading-snug">
                        {o.d}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* --- INTERESTS --- */}
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <Label className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40">
                    Select Interests
                  </Label>
                  <span className="text-xs font-bold text-[#ff6a3d] bg-orange-100 dark:bg-[#ff6a3d]/20 px-2 py-1 rounded-md">
                    {interests.length}/3 selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {interestsList.map((i) => {
                    const active = interests.includes(i);
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all duration-300",
                          active
                            ? "bg-slate-900 dark:bg-white text-white dark:text-black border-transparent shadow-md"
                            : "bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300 dark:hover:border-white/30"
                        )}
                      >
                        {i}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* --- CONSENT --- */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-white/10 relative z-10">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                    <input type="checkbox" className="peer sr-only" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <div className="w-6 h-6 rounded-md border-2 border-slate-300 dark:border-white/20 flex items-center justify-center transition-all peer-checked:border-[#ff6a3d] peer-checked:bg-[#ff6a3d]/10">
                      <Check className={cn("w-4 h-4 text-[#ff6a3d] transition-all duration-200", consent ? "opacity-100 scale-100" : "opacity-0 scale-75")} />
                    </div>
                  </div>
                  <span className="text-sm md:text-base text-slate-600 dark:text-white/60 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white/90 transition-colors">
                    I give consent to capture my details for JAZBAA activities. The data will be used securely for notifications and platform updates.
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
              </div>

              {/* --- SUBMIT --- */}
              <div className="flex flex-col-reverse sm:flex-row gap-6 items-center justify-between pt-4 relative z-10">
                <p className="text-sm md:text-base font-medium text-slate-500 dark:text-white/50 text-center sm:text-left">
                  Already have an account? <br className="sm:hidden" />
                  <Link to="/login" className="text-[#ff6a3d] hover:underline font-bold sm:ml-1">
                    Sign in here
                  </Link>
                </p>
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white text-base font-bold shadow-lg hover:shadow-orange-500/30 transition-all duration-300 group"
                >
                  {submitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Create Account <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Signup;