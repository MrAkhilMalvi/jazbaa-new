import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupApi } from "@/api/Auth.api";
import { signupSchema } from "@/lib/auth.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/Field";
import { countryCodes, interestsList } from "@/constants/SingupConstants";

const SIGNUP_ILLUSTRATION = "/images/singupimg.webp";



const Signup = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dynamic Geography API Lists & Loaders
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [statesList, setStatesList] = useState<string[]>([]);
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);

  // Controlled UI States
  const [interests, setInterests] = useState<string[]>([]);
  const [category, setCategory] = useState<"Member" | "Volunteer" | "Lead">("Member");
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [consent, setConsent] = useState(false);

  // Fetch Countries on Component Mount
  useEffect(() => {
    const fetchCountries = async () => {
      setCountriesLoading(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/iso");
        const json = await res.json();
        if (!json.error) {
          const names: string[] = json.data.map((c: any) => c.name);
          setCountriesList(names.sort());
        } else {
          setCountriesList(["India", "United States", "United Kingdom", "Canada", "Singapore", "Australia", "UAE"]);
        }
      } catch (err) {
        setCountriesList(["India", "United States", "United Kingdom", "Canada", "Singapore", "Australia", "UAE"]);
      } finally {
        setCountriesLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Fetch States when Country changes
  useEffect(() => {
    setState("");
    setCity("");
    setStatesList([]);
    setCitiesList([]);
    if (!country) return;

    const fetchStates = async () => {
      setStatesLoading(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
        });
        const json = await res.json();
        if (!json.error && json.data?.states) {
          const names: string[] = json.data.states.map((s: any) => s.name);
          setStatesList(names.sort());
        } else {
          setStatesList(["Other"]);
        }
      } catch (err) {
        setStatesList(["Other"]);
      } finally {
        setStatesLoading(false);
      }
    };
    fetchStates();
  }, [country]);

  // Fetch Cities when State changes
  useEffect(() => {
    setCity("");
    setCitiesList([]);
    if (!country || !state) return;

    const fetchCities = async () => {
      setCitiesLoading(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, state }),
        });
        const json = await res.json();
        if (!json.error && json.data) {
          const sortedCities: string[] = [...json.data].sort();
          setCitiesList(sortedCities);
        } else {
          setCitiesList(["Other"]);
        }
      } catch (err) {
        setCitiesList(["Other"]);
      } finally {
        setCitiesLoading(false);
      }
    };
    fetchCities();
  }, [country, state]);

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
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const rawData = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      countryCode,
      mobile: String(fd.get("mobile") ?? "").trim(),
      city,
      state,
      country,
      ageGroup,
      category,
      interests,
      password: String(fd.get("password") ?? ""),
      confirmPassword: String(fd.get("confirmPassword") ?? ""),
      consent,
    };

    const parsed = signupSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please resolve validation errors to proceed.");
      return;
    }

    try {
      setSubmitting(true);
      await signupApi(parsed.data);
      toast.success("Welcome to JAZBAA 🎉");
      (e.target as HTMLFormElement).reset();
      setInterests([]);
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-20 mt-5 pb-12 bg-[#fbfaf8] dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/10 dark:bg-[#ff6a3d]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        
        {/* =========================================
            LEFT PANEL (Info Panel & Aligned List)
            ========================================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-5 lg:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Reveal delay={0.1} className="w-full flex flex-col items-center lg:items-start">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-[#ff6a3d]/10 border border-orange-200 dark:border-[#ff6a3d]/20 shadow-sm mb-4 cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6a3d] opacity-75 animate-duration-1000"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6a3d]"></span>
              </span>
              <span className="text-xs md:text-sm font-bold text-[#c04a18] dark:text-[#ff6a3d] uppercase tracking-wider">
                100% Free to Join
              </span>
            </motion.div>


            
            <p className="text-slate-600 dark:text-white/70 text-base md:text-lg mt-3 font-medium leading-relaxed max-w-md">
              Takes less than 2 minutes to join the movement and start reconnecting with what you love.
            </p>
          </Reveal>

          {/* Checklist Layout Optimized for Mobile Alignment */}
          <div className="pt-2 lg:pt-3 space-y-3.5 w-full max-w-md mx-auto lg:mx-0 flex flex-col items-start text-left">
            {[
              "Connect with like-minded peers",
              "Access exclusive local events",
              "Showcase your talents and hobbies",
              "Zero membership fees, forever",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="flex items-start gap-3 w-full"
              >
                <div className="flex items-center justify-center w-6 h-6 shrink-0 mt-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6a3d]" />
                </div>
                <span className="text-sm md:text-base text-slate-700 dark:text-white/80 font-medium">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[400px] mt-4 lg:mt-6 relative hidden sm:block"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ff6a3d]/15 blur-[40px] rounded-full -z-10 hidden dark:block" />
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={SIGNUP_ILLUSTRATION}
              alt="Join our community"
              className="w-full h-auto object-contain drop-shadow-xl dark:drop-shadow-[0_10px_20px_rgba(255,106,61,0.1)] rounded-lg"
            />
          </motion.div>
        </div>

        {/* =========================================
            RIGHT PANEL (Form Entry Panel)
            ========================================= */}
        <div className="lg:col-span-7 w-full">
          <Reveal delay={0.2}>
            <form
              onSubmit={onSubmit}
              className="bg-white dark:bg-zinc-900/80 p-5 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-lg border border-slate-200/60 dark:border-white/10 space-y-6 md:space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent pointer-events-none" />

              {/* --- PERSONAL INFO --- */}
              <div className="space-y-4 relative z-10">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First name" focusState={focused === "fn"}>
                    <Input name="firstName" required onFocus={() => setFocused("fn")} onBlur={() => setFocused(null)} className="form-input-premium h-10 md:h-11" />
                    {errors.firstName && <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>}
                  </Field>

                  <Field label="Last name" focusState={focused === "ln"}>
                    <Input name="lastName" required onFocus={() => setFocused("ln")} onBlur={() => setFocused(null)} className="form-input-premium h-10 md:h-11" />
                    {errors.lastName && <span className="text-xs text-red-500 mt-1 block">{errors.lastName}</span>}
                  </Field>

                  <Field label="Email Address" focusState={focused === "em"}>
                    <Input name="email" type="email" required onFocus={() => setFocused("em")} onBlur={() => setFocused(null)} className="form-input-premium h-10 md:h-11" />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                  </Field>

                  {/* Phone Input with 10 digit enforcement */}
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">Mobile Number</Label>
                    <div className="flex gap-2">
                      <div className="w-1/3 min-w-[90px]">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white text-xs md:text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((cc) => (
                              <SelectItem key={cc.code} value={cc.code}>
                                {cc.code} ({cc.country})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Input
                          name="mobile"
                          type="text"
                          pattern="\d*"
                          maxLength={10}
                          inputMode="numeric"
                          placeholder="10 digit number"
                          required
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-[#ff6a3d]/10 focus:border-[#ff6a3d] dark:text-white text-xs md:text-sm px-3"
                        />
                      </div>
                    </div>
                    {errors.mobile && <span className="text-xs text-red-500 block">{errors.mobile}</span>}
                  </div>

                  {/* Password with Eye icon toggle */}
                  <div className="flex flex-col space-y-1">
                    <Field label="Password" focusState={focused === "pw"}>
                      <div className="relative">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 8 chars, 1 uppercase, 1 symbol"
                          required
                          onFocus={() => setFocused("pw")}
                          onBlur={() => setFocused(null)}
                          className="form-input-premium h-10 md:h-11 pr-10 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </Field>
                    {errors.password && <span className="text-xs text-red-500 block mt-1">{errors.password}</span>}
                  </div>

                  {/* Confirm Password with Eye icon toggle */}
                  <div className="flex flex-col space-y-1">
                    <Field label="Confirm Password" focusState={focused === "cpw"}>
                      <div className="relative">
                        <Input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          onFocus={() => setFocused("cpw")}
                          onBlur={() => setFocused(null)}
                          className="form-input-premium h-10 md:h-11 pr-10 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </Field>
                    {errors.confirmPassword && <span className="text-xs text-red-500 block mt-1">{errors.confirmPassword}</span>}
                  </div>
                </div>
              </div>

              {/* --- DEMOGRAPHICS (DYNAMIC LOCATION API INTERACTION) --- */}
              <div className="space-y-4 relative z-10">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
                  Demographics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Country Dropdown */}
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">Country</Label>
                    <Select value={country} onValueChange={setCountry} disabled={countriesLoading}>
                      <SelectTrigger className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-xs md:text-sm">
                        <SelectValue placeholder={countriesLoading ? "Loading..." : "Select Country"} />
                      </SelectTrigger>
                      <SelectContent>
                        {countriesList.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && <span className="text-xs text-red-500 block">{errors.country}</span>}
                  </div>

                  {/* State Dropdown */}
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">State</Label>
                    <Select value={state} onValueChange={setState} disabled={statesLoading || !country}>
                      <SelectTrigger className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-xs md:text-sm">
                        <SelectValue placeholder={statesLoading ? "Loading..." : "Select State"} />
                      </SelectTrigger>
                      <SelectContent>
                        {statesList.map((st) => (
                          <SelectItem key={st} value={st}>{st}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <span className="text-xs text-red-500 block">{errors.state}</span>}
                  </div>

                  {/* City Dropdown */}
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">City</Label>
                    <Select value={city} onValueChange={setCity} disabled={citiesLoading || !state}>
                      <SelectTrigger className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-xs md:text-sm">
                        <SelectValue placeholder={citiesLoading ? "Loading..." : "Select City"} />
                      </SelectTrigger>
                      <SelectContent>
                        {citiesList.map((ct) => (
                          <SelectItem key={ct} value={ct}>{ct}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.city && <span className="text-xs text-red-500 block">{errors.city}</span>}
                  </div>
                </div>

                <div>
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 mb-2 block">
                    Age Group
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { v: "upto25", l: "upto 25" },
                      { v: "25to50", l: "25 – 50" },
                      { v: "over50", l: "50+" },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => setAgeGroup(o.v)}
                        className={cn(
                          "px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border transition-all duration-300",
                          ageGroup === o.v
                            ? "bg-[#ff6a3d] border-[#ff6a3d] text-white shadow-sm scale-[1.01]"
                            : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300 hover:scale-[1.01]"
                        )}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                  {errors.ageGroup && <span className="text-xs text-red-500 mt-1 block">{errors.ageGroup}</span>}
                </div>
              </div>

              {/* --- ROLE CATEGORY --- */}
              <div className="space-y-3 relative z-10">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 mb-1.5 block">
                  Do you want to be a?
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { v: "A Member", d: "Attend events & connect" },
                    { v: "A Volunteer", d: "Help organize & engage" },
                    { v: "A Lead", d: "Lead a city Chapter" },
                  ].map((o) => (
                     <button
                      key={o.v}
                      type="button"
                      onClick={() => setCategory(o.v as any)}
                      className={cn(
                        "p-3 md:p-4 rounded-xl border text-left transition-all duration-300 flex flex-col gap-1 md:gap-1.5",
                        category === o.v
                          ? "bg-orange-50 dark:bg-[#ff6a3d]/10 border-[#ff6a3d] ring-1 ring-[#ff6a3d] scale-[1.01]"
                          : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 hover:border-slate-300 hover:scale-[1.01]"
                      )}
                    >
                      <span className={cn("font-bold text-sm md:text-base transition-colors", category === o.v ? "text-[#ff6a3d]" : "text-slate-900 dark:text-white")}>
                        {o.v}
                      </span>
                      <span className="text-[11px] md:text-xs text-slate-500 dark:text-white/50 leading-snug">
                        {o.d}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.category && <span className="text-xs text-red-500 mt-1 block">{errors.category}</span>}
              </div>

              {/* --- INTERESTS --- */}
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-end mb-1">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40">
                    Select Your Hobbies and Interests
                  </Label>
                  <span className="text-[10px] font-bold text-[#ff6a3d] bg-orange-100 dark:bg-[#ff6a3d]/20 px-1.5 py-0.5 rounded">
                    {interests.length}/3 selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {interestsList.map((i) => {
                    const active = interests.includes(i);
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-bold border transition-all duration-300",
                          active
                            ? "bg-slate-900 dark:bg-white text-white dark:text-black border-transparent shadow-sm"
                            : "bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300 hover:scale-[1.01]"
                        )}
                      >
                        {i}
                      </motion.button>
                    );
                  })}
                </div>
                {errors.interests && <span className="text-xs text-red-500 mt-1 block">{errors.interests}</span>}
              </div>

              {/* --- CONSENT --- */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 relative z-10">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                    <input type="checkbox" className="peer sr-only" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-white/20 flex items-center justify-center transition-all peer-checked:border-[#ff6a3d] peer-checked:bg-[#ff6a3d]/10">
                      <Check className={cn("w-3.5 h-3.5 text-[#ff6a3d] transition-all duration-200", consent ? "opacity-100 scale-100" : "opacity-0 scale-75")} />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm text-slate-600 dark:text-white/60 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white/90 transition-colors">
                    I give consent to capture my details for JAZBAA activities. The data will be used securely for notifications and platform updates.
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
                {errors.consent && <span className="text-xs text-red-500 mt-2 block">{errors.consent}</span>}
              </div>

              {/* --- SUBMIT --- */}
              <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-between pt-2 relative z-10">
                <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-white/50 text-center sm:text-left">
                  Already have an account? <br className="sm:hidden" />
                  <Link to="/login" className="text-[#ff6a3d] hover:underline font-bold sm:ml-1">
                    Sign in here
                  </Link>
                </p>
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white text-sm font-bold shadow hover:shadow-orange-500/20 transition-all duration-300 group"
                >
                  {submitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      Create Account <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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