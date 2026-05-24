import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { getMeApi, googleLoginApi } from "@/api/Auth.api";
import { GoogleLogin } from "@react-oauth/google";
import { loginApi } from "@/api/Auth.api";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/lib/auth.schema";

const SIDE_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85";

const Login = () => {
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const formData = Object.fromEntries(fd);

    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please enter correct values.");
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
    <section className="relative min-h-screen py-10 lg:py-16 flex items-center justify-center overflow-hidden bg-[#fbfaf8] dark:bg-black transition-colors duration-500">
      <Aurora className="opacity-40 dark:opacity-20 hidden md:block" />
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-orange-400/20 dark:bg-[#ff6a3d]/20 blur-[100px] rounded-full pointer-events-none md:hidden" />

      <div className="max-w-[1200px] mx-auto px-4 w-full grid lg:grid-cols-2 gap-8 xl:gap-12 items-center relative z-10">
        
        {/* =========================================
            LEFT PANEL (Visual)
            ========================================= */}
        <Reveal className="hidden lg:block h-full w-full">
          <div className="relative h-full min-h-[500px] xl:min-h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl dark:shadow-none border border-slate-200/50 dark:border-white/5">
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              src={SIDE_IMG}
              alt="JAZBAA community gathering"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end p-10 text-white">
              <RevealText
                as="h2"
                text="Your tribe is waiting."
                className="font-bold text-4xl xl:text-5xl tracking-tight leading-[1.1] mb-4"
              />
              <p className="max-w-sm text-sm xl:text-base text-white/80 font-medium leading-relaxed">
                Sign in to RSVP for sessions, manage your interests, and connect
                with members in your city.
              </p>
            </div>
          </div>
        </Reveal>

        {/* =========================================
            RIGHT PANEL (Login Form Panel)
            ========================================= */}
        <Reveal delay={0.1} className="flex justify-center w-full">
          <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-zinc-900/80 p-5 sm:p-6 md:p-8 w-full max-w-[400px] sm:max-w-md mx-auto rounded-[1.5rem] md:rounded-[2rem] shadow-lg border border-slate-200/60 dark:border-white/10 space-y-5 md:space-y-6 relative overflow-hidden transition-colors duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-1 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-widest text-[#ff6a3d] font-bold">
                Welcome Back
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sign in to JAZBAA
              </h1>
            </div>

            <div className="relative z-10 space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 ml-1">
                  Email Address
                </Label>
                <Input
                  className="h-10 md:h-11 rounded-xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white transition-all text-sm px-3.5"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span className="text-xs text-red-500 block mt-1 ml-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password Input with Visibility Switch Toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 ml-1">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#ff6a3d] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    className="h-10 md:h-11 rounded-xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white transition-all text-sm pl-3.5 pr-10"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500 block mt-1 ml-1">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={busy}
              className="relative z-10 w-full h-11 rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white text-sm font-bold shadow hover:shadow-orange-500/20 transition-all duration-300 group"
            >
              {busy ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <span className="flex items-center gap-1.5">
                  Sign in{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </Button>

            {/* Divider */}
            <div className="relative z-10 py-1 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>
              <span className="relative flex justify-center text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-white/40 bg-white dark:bg-zinc-900 px-3 transition-colors duration-500">
                Or continue with
              </span>
            </div>

            {/* Google Authentication */}
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
            <p className="relative z-10 text-xs md:text-sm text-center text-slate-500 dark:text-white/60 pt-1">
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