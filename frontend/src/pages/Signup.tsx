import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
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

// A much more suitable, artistic, and moody image for JAZBAA
const SIDE_IMG =
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80";

const interestsList = [
  "Music",
  "Art",
  "Karaoke / Singing",
  "Dance",
  "Meditation",
  "Open Mic",
  "Drawing",
  "Book Club",
  "Story Telling",
  "Concert / Classic Movies",
  "Photography",
];

const schema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(60),
    lastName: z.string().trim().min(1, "Last name is required").max(60),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(255),
    mobile: z.string().trim().min(7, "Invalid mobile number").max(20),
    city: z.string().trim().min(1, "City is required").max(80),
    state: z.string().trim().min(1, "State is required").max(80),
    country: z.string().trim().min(1, "Country is required").max(80),

    ageGroup: z.enum(["upto25", "25to50", "over50"], {
      required_error: "Please select an age group",
    }),

    category: z.enum(["Member", "Volunteer", "Lead"], {
      required_error: "Please select a sign-up category",
    }),

    interests: z
      .array(z.string())
      .min(1, "Pick at least 1 interest")
      .max(3, "You can only pick up to 3 interests"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),

    // Strictly enforcing consent
    consent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms to sign up.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // Controlled UI States for complex inputs
  const [interests, setInterests] = useState<string[]>([]);
  const [category, setCategory] = useState<"Member" | "Volunteer" | "Lead">(
    "Member",
  );
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

    // Manual consent check for better UX before schema parsing
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
      country: country,
      ageGroup: ageGroup,
      category: category,
      interests: interests,
      password: String(fd.get("password") ?? ""),
      confirmPassword: String(fd.get("confirmPassword") ?? ""),
      consent: consent,
    };

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }

    try {
      setSubmitting(true);
      await signupApi(data); // REAL BACKEND CALL
      toast.success("Welcome to JAZBAA 🎉");
      (e.target as HTMLFormElement).reset();
      setInterests([]);
      navigate("/login");
    } catch (err: any) {
      // Error handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-[#fbfaf8] dark:bg-black transition-colors duration-500 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-400/5 dark:bg-[#ff6a3d]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
        {/* =========================================
            LEFT PANEL (Image & Brand)
            ========================================= */}
        <Reveal className="hidden lg:block lg:col-span-5 h-[calc(100vh-10rem)] sticky top-32">
          <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-slate-200/50 dark:border-white/10">
            <img
              src={SIDE_IMG}
              alt="Microphone on stage, representing passion and art"
              className="absolute inset-0 h-full w-full object-cover scale-105"
            />
            {/* Elegant dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit mb-6">
                <Sparkles className="h-3.5 w-3.5 text-[#ff6a3d]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  Join the Tribe
                </span>
              </div>
              <h2 className="text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Find your <span className="italic text-[#ff6a3d]">tribe.</span>
                <br />
                Fuel your{" "}
                <span className="italic text-[#ff6a3d]">passion.</span>
              </h2>
              <p className="text-lg text-white/80 font-medium mb-8 max-w-sm">
                Join a vibrant community where music, movement, mindfulness, and
                meaningful connections come to life.
              </p>
              <ul className="space-y-3">
                {[
                  "Free to join the community",
                  "Curated online & offline events",
                  "No judgment, only encouragement",
                ].map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="flex items-center gap-3 text-white/90 font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#ff6a3d]/20 border border-[#ff6a3d]/50 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#ff6a3d]" />
                    </div>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* =========================================
            RIGHT PANEL (Form)
            ========================================= */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest font-bold text-[#ff6a3d] mb-3">
                Become a member
              </p>
              <RevealText
                as="h1"
                text="Create your account."
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight"
              />
              <p className="text-slate-600 dark:text-white/60 text-lg mt-4 font-medium">
                Takes less than 2 minutes to join the movement.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="bg-white dark:bg-zinc-900/60 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-xl dark:shadow-none border border-slate-100 dark:border-white/10 space-y-10 transition-colors duration-500"
            >
              {/* --- PERSONAL INFO --- */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-4">
                  Personal Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="First name" focusState={focused === "fn"}>
                    <Input
                      name="firstName"
                      required
                      onFocus={() => setFocused("fn")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                  <Field label="Last name" focusState={focused === "ln"}>
                    <Input
                      name="lastName"
                      required
                      onFocus={() => setFocused("ln")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                  <Field label="Email Address" focusState={focused === "em"}>
                    <Input
                      name="email"
                      type="email"
                      required
                      onFocus={() => setFocused("em")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                  <Field label="Mobile Number" focusState={focused === "mo"}>
                    <Input
                      name="mobile"
                      type="tel"
                      required
                      onFocus={() => setFocused("mo")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                  <Field label="Password" focusState={focused === "pw"}>
                    <Input
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      onFocus={() => setFocused("pw")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                  <Field
                    label="Confirm Password"
                    focusState={focused === "cpw"}
                  >
                    <Input
                      name="confirmPassword"
                      type="password"
                      required
                      minLength={6}
                      onFocus={() => setFocused("cpw")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                </div>
              </div>

              {/* --- LOCATION & AGE --- */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-4">
                  Demographics
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <Field label="City" focusState={focused === "ct"}>
                    <Input
                      name="city"
                      required
                      onFocus={() => setFocused("ct")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                  <Field label="State" focusState={focused === "st"}>
                    <Input
                      name="state"
                      required
                      onFocus={() => setFocused("st")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium"
                    />
                  </Field>
                  <Field label="Country" focusState={false}>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-black/40 border-transparent dark:border-white/5 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white transition-all text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "India",
                          "United States",
                          "United Kingdom",
                          "UAE",
                          "Singapore",
                          "Canada",
                          "Australia",
                          "Other",
                        ].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
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
                          "px-6 py-3 rounded-full text-sm font-bold border transition-all duration-300",
                          ageGroup === o.v
                            ? "bg-[#ff6a3d] border-[#ff6a3d] text-white shadow-md shadow-[#ff6a3d]/20"
                            : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300 dark:hover:border-white/30",
                        )}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- ROLE CATEGORY --- */}
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 mb-2 block">
                  How do you want to join?
                </Label>
                <div className="grid sm:grid-cols-3 gap-4">
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
                        "p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-2",
                        category === o.v
                          ? "bg-orange-50 dark:bg-[#ff6a3d]/10 border-[#ff6a3d] ring-1 ring-[#ff6a3d]"
                          : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30",
                      )}
                    >
                      <span
                        className={cn(
                          "font-bold text-lg",
                          category === o.v
                            ? "text-[#ff6a3d]"
                            : "text-slate-900 dark:text-white",
                        )}
                      >
                        {o.v}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-white/50">
                        {o.d}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* --- INTERESTS --- */}
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <Label className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40">
                    Select Interests
                  </Label>
                  <span className="text-xs font-bold text-[#ff6a3d]">
                    {interests.length}/3 selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {interestsList.map((i) => {
                    const active = interests.includes(i);
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-300",
                          active
                            ? "bg-slate-900 dark:bg-white text-white dark:text-black border-transparent shadow-md"
                            : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300 dark:hover:border-white/30",
                        )}
                      >
                        {i}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* --- CONSENT (MANDATORY) --- */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    {/* hidden checkbox */}
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />

                    {/* box */}
                    <div
                      className="
        w-6 h-6 rounded-md border-2 
        border-slate-300 dark:border-white/20
        flex items-center justify-center
        transition-all
        peer-checked:border-[#ff6a3d]
        peer-checked:bg-[#ff6a3d]/10
      "
                    >
                      {/* ICON */}
                      <Check
                        className={cn(
                          "w-6 h-6 text-[#ff6a3d] transition-all duration-200",
                          consent
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75",
                        )}
                      />
                    </div>
                  </div>

                  <span className="text-sm md:text-base text-slate-600 dark:text-white/60 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
                    I give consent to capture my details for JAZBAA activities.
                    The data will be used securely for notifications and
                    platform updates.
                    <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* --- SUBMIT --- */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-between pt-6">
                <p className="text-sm font-medium text-slate-500 dark:text-white/50">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#ff6a3d] hover:underline font-bold"
                  >
                    Sign in
                  </Link>
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white text-base font-bold shadow-lg hover:shadow-orange-500/20 transition-all group"
                >
                  {submitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Create Account{" "}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
