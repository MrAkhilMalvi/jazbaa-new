import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/animations/Reveal";

const SIDE_IMG =
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80";

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
    <section className="min-h-screen pt-28 pb-16">
      <div className="container-editorial grid lg:grid-cols-2 gap-10 items-stretch">
        <Reveal className="hidden lg:block">
          <div className="relative h-full rounded-3xl overflow-hidden shadow-clay">
            <img src={SIDE_IMG} alt="JAZBAA community" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-10 text-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Welcome back</p>
              <h2 className="font-display italic text-5xl xl:text-6xl mt-4 leading-[0.95]">
                Your tribe<br/>is waiting.
              </h2>
            </div>
          </div>
        </Reveal>

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
              <Label className="mb-2 block text-sm">Password</Label>
              <Input type="password" name="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" variant="ember" size="lg" className="w-full" disabled={busy}>
              {busy ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              New here?{" "}
              <Link to="/join" className="text-accent hover:underline">
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
