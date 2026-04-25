import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";

const SIDE_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6, "At least 6 characters").max(120),
});

const Login = () => {
  const [busy, setBusy] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Check your details");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      toast.info("Authentication isn't connected yet. Coming soon ✨");
    }, 600);
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      <Aurora className="opacity-50" />
      <div className="container-editorial relative grid lg:grid-cols-2 gap-10 items-stretch">
        {/* Visual side */}
        <Reveal className="hidden lg:block">
          <div className="relative h-full min-h-[600px] rounded-3xl overflow-hidden shadow-clay">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              src={SIDE_IMG}
              alt="JAZBAA community gathering"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.35), transparent 55%)",
                  "radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.35), transparent 55%)",
                  "radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.35), transparent 55%)",
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10 h-full flex flex-col justify-end p-10 text-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Welcome back</p>
              <RevealText
                as="h2"
                text="Your tribe is waiting."
                className="font-display italic text-5xl xl:text-6xl mt-4 leading-[0.95]"
              />
              <p className="mt-6 max-w-xs text-sm opacity-80">
                Sign in to RSVP for sessions, manage your interests and connect
                with members in your city.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} className="flex items-center">
          <form onSubmit={onSubmit} className="clay p-8 md:p-10 w-full max-w-md mx-auto space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Login</p>
              <h1 className="font-display text-4xl mt-2">Sign in to JAZBAA</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Registered users — welcome back.
              </p>
            </div>
            <div>
              <Label className="mb-2 block text-sm">Email</Label>
              <Input type="email" name="email" required placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm">Password</Label>
                <button type="button" className="text-xs text-accent hover:underline">
                  Forgot?
                </button>
              </div>
              <Input type="password" name="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" variant="ember" size="lg" className="w-full" disabled={busy}>
              {busy ? "Signing in..." : "Sign in"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <span className="relative flex justify-center text-xs uppercase tracking-[0.25em] text-muted-foreground bg-card px-3 mx-auto w-fit">
                or
              </span>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              New here?{" "}
              <Link to="/signup" className="text-accent hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Login;
