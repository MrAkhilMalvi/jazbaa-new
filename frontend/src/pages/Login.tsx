import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Aurora } from "@/components/animations/Aurora";
import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/lib/auth.schema";
import { googleLoginApi, loginApi } from "@/services/auth.service";
import { log } from "console";

const SIDE_IMG = "/images/loginimage.jpeg";

const Login = () => {
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  // Detect and track system/document dark mode status
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Observe changes to the html class attribute in case dark mode is toggled
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    // 1. Validate form fields using Zod
    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      setBusy(true);
      const res = await loginApi(parsed.data);
      const user = res.data.user;
      localStorage.setItem(
        "jazbaa-auth",
        JSON.stringify({ isAuthenticated: true, user: res.data }),
      );
      setUser(user);
      setIsAuthenticated(true);

      toast.success("Welcome back!");
      navigate("/", { replace: true });
    } catch (err: any) {
      setErrors(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

const handleGoogleLogin = async (credentialResponse: any) => {
  try {
    setBusy(true);

    const res = await googleLoginApi(credentialResponse.credential);
    
    // Extract user safely from res.data.user
    const user = res?.data?.user || res?.data;

    // Check completion status directly
    if (!user?.is_profile_completed) {
      toast.info("Please complete your profile details to finalize signup.");

      // Safely parse name, converting null values to empty strings ("")
      const firstName = user?.first_name || user?.firstName || "";
      const lastName = user?.last_name || user?.lastName || "";
      
      // Fallback logic if full 'name' string exists instead
      const fallbackFirstName = user?.name ? user.name.split(" ")[0] : "";
      const fallbackLastName = user?.name ? user.name.split(" ").slice(1).join(" ") : "";

      navigate("/complete-profile", {
        state: {
          googleUser: {
            email: user?.email || "",
            avatar: user?.avatar || "",
            firstName: firstName || fallbackFirstName,
            lastName: lastName || fallbackLastName,
            googleId: user?.id || user?.googleId || "",
          },
        },
        replace: true,
      });
      return; // Stop execution here
    }

    // Normal Login Success
    localStorage.setItem(
      "jazbaa-auth",
      JSON.stringify({ isAuthenticated: true, user: res.data })
    );

    setUser(user);
    setIsAuthenticated(true);

    toast.success("Logged in successfully! 🚀");
    navigate("/", { replace: true });

  } catch (err: any) {
    console.error("Login Navigation Error:", err);
    toast.error(
      err?.response?.data?.message || "Google login failed. Please try again."
    );
  } finally {
    setBusy(false);
  }
};

  return (
    <section className="relative min-h-screen py-10 lg:py-16 flex items-center mt-5 justify-center overflow-hidden bg-[#fbfaf8] dark:bg-black transition-colors duration-500">
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
                text="Find your people. Follow your passion."
                className="font-bold text-4xl xl:text-5xl tracking-tight leading-[1.1] mb-4"
              />
              <p className="max-w-lg text-sm xl:text-base text-white/80 font-medium leading-relaxed">
                Sign in to explore experiences, connect with inspiring
                individuals, and make every moment meaningful.
              </p>
            </div>
          </div>
        </Reveal>

        {/* =========================================
            RIGHT PANEL (Login Form Panel)
            ========================================= */}
        <Reveal delay={0.1} className="flex justify-center w-full">
          {/* Changed dark:bg-zinc-900/80 to solid dark:bg-zinc-900 to match inner components */}
          <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-zinc-900 p-5 sm:p-6 md:p-8 w-full max-w-[400px] sm:max-w-md mx-auto rounded-[1.5rem] md:rounded-[2rem] shadow-lg border border-slate-200/60 dark:border-white/10 space-y-5 md:space-y-6 relative overflow-hidden transition-colors duration-500"
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
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
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
                theme={isDark ? "filled_black" : "outline"}
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
