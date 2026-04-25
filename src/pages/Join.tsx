import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";

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
  ageGroup: z.enum(["upto25", "25to50", "over50"], { required_error: "Pick one" }),
  category: z.enum(["Member", "Volunteer", "Lead"], { required_error: "Pick one" }),
  interests: z.array(z.string()).min(1, "Pick at least 1").max(3, "Pick up to 3"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
});

const Join = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      consent: fd.get("consent") === "on",
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Welcome to JAZBAA! We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
      setInterests([]);
    }, 800);
  };

  return (
    <>
      <section className="pt-40 pb-12">
        <div className="container-editorial">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Join JAZBAA</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Find your tribe. Fuel your passion."
            className="display text-5xl md:text-7xl lg:text-[6rem] font-light mt-6 max-w-[16ch]"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-editorial grid lg:grid-cols-12 gap-10 items-start">
          {/* Benefits */}
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="clay p-8 bg-foreground text-background">
                <h3 className="font-display text-2xl mb-5">Membership Benefits</h3>
                <ul className="space-y-3 text-sm opacity-90">
                  {[
                    "Access to hobby-based communities",
                    "Invitations to exclusive events",
                    "Opportunity to perform, share & learn",
                    "Networking with like-minded people",
                    "Both online & offline sessions",
                  ].map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-accent">✦</span>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="clay p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Already a member?</p>
                <p className="text-muted-foreground mb-4">Sign in to RSVP for upcoming sessions.</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login">Login to your account</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <form onSubmit={onSubmit} className="clay p-6 md:p-10 space-y-8">
              <div>
                <h2 className="font-display text-3xl">Sign up</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Member · Volunteer · Chapter Lead — pick what fits you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="First name"><Input name="firstName" required maxLength={60} /></Field>
                <Field label="Last name"><Input name="lastName" required maxLength={60} /></Field>
                <Field label="Email"><Input name="email" type="email" required maxLength={255} /></Field>
                <Field label="Mobile number"><Input name="mobile" type="tel" required maxLength={20} /></Field>
                <Field label="City"><Input name="city" required maxLength={80} /></Field>
                <Field label="State"><Input name="state" required maxLength={80} /></Field>
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
                  <RadioGroup name="ageGroup" className="flex flex-wrap gap-3 pt-2">
                    {[
                      { v: "upto25", l: "Up to 25" },
                      { v: "25to50", l: "25 – 50" },
                      { v: "over50", l: "50+" },
                    ].map((o) => (
                      <Label key={o.v} className="flex items-center gap-2 px-3 py-2 rounded-full border border-border hover:border-foreground/40 cursor-pointer">
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
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        className={
                          "px-4 py-2 rounded-full text-sm border transition-all " +
                          (active
                            ? "bg-accent text-accent-foreground border-accent shadow-glow"
                            : "border-border hover:border-foreground/40")
                        }
                      >
                        {i}
                      </button>
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
                <p className="text-xs text-muted-foreground">By joining, you agree to our friendly community guidelines.</p>
                <Button type="submit" variant="ember" size="lg" disabled={submitting}>
                  {submitting ? "Joining..." : "Join JAZBAA"}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-sm font-medium mb-2 block">{label}</Label>
    {children}
  </div>
);

export default Join;
