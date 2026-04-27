import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupApi } from "@/api/Auth.api";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SIDE_IMG =
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80";

const interestsList = [
  "Reading Books","Story Telling","Karaoke / Singing","Music","Concert",
  "Drawing","Art","Photography","Dance","Meditation","Open Mic","Book Club",
];

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(60),
  lastName: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Invalid email").max(255),
  mobile: z.string().trim().min(7, "Invalid mobile").max(20),
  city: z.string().trim().min(1, "Required").max(80),
  state: z.string().trim().min(1, "Required").max(80),
  country: z.string().trim().min(1, "Required").max(80),

  ageGroup: z.enum(["upto25", "25to50", "over50"], {
    required_error: "Pick one",
  }),

  category: z.enum(["Member", "Volunteer", "Lead"], {
    required_error: "Pick one",
  }),

  interests: z.array(z.string()).min(1, "Pick at least 1").max(3),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: z.string(),

  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const toggleInterest = (i: string) => {
    setInterests((curr) => {
      if (curr.includes(i)) return curr.filter((x) => x !== i);
      if (curr.length >= 3) {
        toast.warning("Pick your top 3 interests.");
        return curr;
      }
      return [...curr, i];
    });
  };

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const fd = new FormData(e.currentTarget);

const data = {
  firstName: String(fd.get("firstName") ?? ""),
  lastName: String(fd.get("lastName") ?? ""),
  email: String(fd.get("email") ?? ""),
  mobile: String(fd.get("mobile") ?? ""),
  city: String(fd.get("city") ?? ""),
  state: String(fd.get("state") ?? ""),
  country: String(fd.get("country") ?? ""),
  ageGroup: fd.get("ageGroup") as string,
  category: fd.get("category") as string,
  interests,

  password: String(fd.get("password") ?? ""),
  confirmPassword: String(fd.get("confirmPassword") ?? ""),

  consent: fd.get("consent") === "on",
};

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
    return;
  }

  try {
    setSubmitting(true);

    await signupApi(data); // 🔥 REAL BACKEND CALL

    toast.success("Welcome to JAZBAA 🎉");

    (e.target as HTMLFormElement).reset();
    setInterests([]);

    navigate("/login"); // better UX

  } catch (err: any) {
    // error already handled by axios interceptor
  } finally {
    setSubmitting(false);
  }
};

  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      <Aurora className="opacity-50" />
      <div className="container-editorial relative grid lg:grid-cols-12 gap-10 items-stretch">
        {/* Left visual panel */}
        <Reveal className="hidden lg:block lg:col-span-5">
          <div className="relative h-full min-h-[640px] rounded-3xl overflow-hidden shadow-clay sticky top-28">
            <img
              src={SIDE_IMG}
              alt="Friends celebrating together"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 20%, hsl(var(--accent) / 0.35), transparent 50%)",
                  "radial-gradient(circle at 70% 70%, hsl(var(--accent) / 0.35), transparent 50%)",
                  "radial-gradient(circle at 30% 20%, hsl(var(--accent) / 0.35), transparent 50%)",
                ],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between p-10 text-background">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
                <Sparkles className="h-3 w-3" /> Sign up
              </div>
              <div>
                <h2 className="font-display italic text-5xl xl:text-6xl leading-[0.95]">
                  Find your<br/>tribe.<br/>Fuel your<br/>passion.
                </h2>
                <p className="mt-6 max-w-xs text-sm opacity-80">
                  Join a vibrant community where music, movement, mindfulness
                  and meaningful connections come together.
                </p>
                <ul className="mt-8 space-y-2 text-sm">
                  {["Free to join","Online + offline events","No judgment, only encouragement"].map(b => (
                    <li key={b} className="flex items-center gap-2"><span className="text-accent">✦</span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Become a member</p>
            <RevealText
              as="h1"
              text="Create your JAZBAA account."
              className="display text-4xl md:text-5xl lg:text-6xl font-light mt-4 max-w-[18ch]"
            />
            <p className="text-muted-foreground mt-4">
              Member · Volunteer · Chapter Lead — pick what fits you.
            </p>
          </div>

          <form onSubmit={onSubmit} className="clay p-6 md:p-10 space-y-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="First name"><Input name="firstName" required maxLength={60} /></Field>
              <Field label="Last name"><Input name="lastName" required maxLength={60} /></Field>
              <Field label="Email"><Input name="email" type="email" required maxLength={255} /></Field>
              <Field label="Mobile number"><Input name="mobile" type="tel" required maxLength={20} /></Field>
              <Field label="City"><Input name="city" required maxLength={80} /></Field>
              <Field label="State"><Input name="state" required maxLength={80} /></Field>
              <Field label="Password"><Input name="password" type="password" required minLength={6} /></Field>
              <Field label="Confirm Password"><Input name="confirmPassword" type="password" required minLength={6} /></Field>
              <Field label="Country">
                <Select name="country" defaultValue="India">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["India","United States","United Kingdom","UAE","Singapore","Canada","Australia","Other"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Age group">
                <RadioGroup name="ageGroup" className="flex flex-wrap gap-2 pt-2">
                  {[
                    { v: "upto25", l: "Up to 25" },
                    { v: "25to50", l: "25 – 50" },
                    { v: "over50", l: "50+" },
                  ].map((o) => (
                    <Label key={o.v} className="flex items-center gap-2 px-3 py-2 rounded-full border border-border hover:border-foreground/40 cursor-pointer transition-colors [&:has([data-state=checked])]:border-accent [&:has([data-state=checked])]:bg-accent/5">
                      <RadioGroupItem value={o.v} /> {o.l}
                    </Label>
                  ))}
                </RadioGroup>
              </Field>
            </div>

            <div>
              <Label className="text-sm font-medium">Sign-up category</Label>
              <RadioGroup name="category" defaultValue="Member" className="grid sm:grid-cols-3 gap-3 mt-3">
                {[
                  { v: "Member", d: "Attend events & connect" },
                  { v: "Volunteer", d: "Help organize & engage" },
                  { v: "Lead", d: "Lead a city chapter" },
                ].map((o) => (
                  <Label key={o.v} className="flex items-start gap-3 p-4 rounded-2xl border border-border cursor-pointer hover:border-accent transition-colors [&:has([data-state=checked])]:border-accent [&:has([data-state=checked])]:bg-accent/5">
                    <RadioGroupItem value={o.v} className="mt-1" />
                    <span>
                      <span className="block font-medium">{o.v}</span>
                      <span className="block text-sm text-muted-foreground">{o.d}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">Interests & hobbies <span className="text-muted-foreground font-normal">(pick top 3)</span></Label>
              <div className="flex flex-wrap gap-2 mt-3">
                {interestsList.map((i) => {
                  const active = interests.includes(i);
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => toggleInterest(i)}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ y: -2 }}
                      className={
                        "px-4 py-2 rounded-full text-sm border transition-all " +
                        (active
                          ? "bg-accent text-accent-foreground border-accent shadow-glow"
                          : "border-border hover:border-foreground/40")
                      }
                    >
                      {i}
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2">{interests.length}/3 selected</p>
            </div>

            <Label className="flex items-start gap-3 cursor-pointer">
              <Checkbox name="consent" className="mt-1" />
              <span className="text-sm text-muted-foreground">
                I give consent to capture my details for JAZBAA activities.
              </span>
            </Label>

            <div className="flex flex-wrap gap-3 items-center justify-between pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Already a member?{" "}
                <Link to="/login" className="text-accent hover:underline">Sign in</Link>
              </p>
              <Button type="submit" variant="glass" size="lg" disabled={submitting}>
                {submitting ? "Joining..." : "Create account"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-sm font-medium mb-2 block">{label}</Label>
    {children}
  </div>
);

export default Signup;
