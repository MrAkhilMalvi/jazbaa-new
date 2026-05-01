import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { getMeApi, googleLoginApi } from "@/api/Auth.api";
import { GoogleLogin } from "@react-oauth/google";
import { loginApi } from "@/api/Auth.api";
import { useAuth } from "@/context/AuthContext";

const SIDE_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(120),
});

const Login = () => {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const formData = Object.fromEntries(fd);

    const parsed = schema.safeParse(formData);

    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Check your details");
      return;
    }

    try {
      setBusy(true);

      const res = await loginApi(parsed.data);
      const me = await getMeApi();

      setUser(me.data.user);
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      setBusy(true);
      const res = await googleLoginApi(credentialResponse.credential);
      setUser(res?.data);
      toast.success("Logged in with Google 🚀");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative min-h-[100dvh] py-20 flex items-center justify-center overflow-hidden bg-[#fbfaf8] dark:bg-black transition-colors duration-500">
      {/* Background Aurora / Glow */}
      <Aurora className="opacity-40 dark:opacity-20 hidden md:block" />
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-orange-400/20 dark:bg-[#ff6a3d]/20 blur-[100px] rounded-full pointer-events-none md:hidden" />

      <div className="max-w-[1200px] mx-auto px-4 w-full grid lg:grid-cols-2 gap-10 xl:gap-16 items-center relative z-10">
        {/* =========================================
            LEFT PANEL (Visual - Hidden on Mobile)
            ========================================= */}
        <Reveal className="hidden lg:block h-full w-full">
          <div className="relative h-full min-h-[600px] xl:min-h-[700px] rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-none border border-slate-200/50 dark:border-white/5">
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              src={SIDE_IMG}
              alt="JAZBAA community gathering"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end p-12 text-white">
              <RevealText
                as="h2"
                text="Your tribe is waiting."
                className="font-bold text-5xl xl:text-6xl tracking-tight leading-[1.05] mb-6"
              />
              <p className="max-w-sm text-lg text-white/80 font-medium leading-relaxed">
                Sign in to RSVP for sessions, manage your interests, and connect
                with members in your city.
              </p>
            </div>
          </div>
        </Reveal>

        {/* =========================================
            RIGHT PANEL (Login Form)
            ========================================= */}
        <Reveal delay={0.1} className="flex justify-center w-full">
          <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-zinc-900/80 p-6 sm:p-10 md:p-12 w-full max-w-[400px] sm:max-w-lg mx-auto rounded-[2rem] md:rounded-[3rem] shadow-xl dark:shadow-none border border-slate-200/60 dark:border-white/10 space-y-8 relative overflow-hidden transition-colors duration-500"
          >
            {/* Subtle glass reflection */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-2 text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest text-[#ff6a3d] font-bold">
                Welcome Back
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sign in to JAZBAA
              </h1>
            </div>

            <div className="relative z-10 space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 ml-1">
                  Email Address
                </Label>
                <Input
                  className="h-12 md:h-14 rounded-2xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white transition-all text-base px-4"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 ml-1">
                  Password
                </Label>
                <Input
                  className="h-12 md:h-14 rounded-2xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white transition-all text-base px-4"
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={busy}
              className="relative z-10 w-full h-12 md:h-14 rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white text-base font-bold shadow-lg hover:shadow-orange-500/30 transition-all duration-300 group"
            >
              {busy ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in{" "}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>

            {/* Divider */}
            <div className="relative z-10 py-2 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>
              <span className="relative flex justify-center text-[10px] sm:text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-white/40 bg-white dark:bg-zinc-900 px-4 transition-colors duration-500">
                Or continue with
              </span>
            </div>

            {/* Removed width={400} to allow it to be fully responsive on mobile */}
            <div className="relative z-10 flex justify-center w-full overflow-hidden">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google login failed")}
                theme="outline"
                shape="pill"
                size="large"
              />
            </div>

            {/* Footer Link */}
            <p className="relative z-10 text-sm md:text-base text-center text-slate-500 dark:text-white/60 pt-2">
              New here?{" "}
              <Link
                to="/signup"
                className="text-[#ff6a3d] hover:underline font-bold transition-colors"
              >
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
