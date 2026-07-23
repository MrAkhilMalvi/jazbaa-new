import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
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
import { countryCodes, DEFAULT_COUNTRIES, INTERESTS_OPTIONS } from "@/constants/SingupConstants";
import { completeProfileApi } from "@/services/auth.service";





export const CompleteGoogleProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, setIsAuthenticated } = useAuth();

  // Extract initial google payload passed from Login.tsx
  const googleUser = location.state?.googleUser;

  // Form State initialized with passed state or AuthContext fallback
  const [firstName, setFirstName] = useState<string>(
    googleUser?.firstName || user?.first_name || user?.name?.split(" ")[0] || ""
  );
  const [lastName, setLastName] = useState<string>(
    googleUser?.lastName || user?.last_name || user?.name?.split(" ").slice(1).join(" ") || ""
  );
  const [email, setEmail] = useState<string>(
    googleUser?.email || user?.email || ""
  );

  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [category, setCategory] = useState<"Member" | "Volunteer" | "Lead">("Member");
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [consent, setConsent] = useState<boolean>(false);

  // UI / Logic States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Dynamic Geography API Lists & Loading States
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [statesList, setStatesList] = useState<string[]>([]);
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [countriesLoading, setCountriesLoading] = useState<boolean>(false);
  const [statesLoading, setStatesLoading] = useState<boolean>(false);
  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);

  // Redirect if accessed directly without any valid Google session info
  useEffect(() => {
    if (!email && !googleUser?.email && !user?.email) {
      toast.error("Session expired or invalid navigation. Please log in with Google first.");
      navigate("/login", { replace: true });
    }
  }, [email, googleUser, user, navigate]);

  // Fetch Countries on Mount
  useEffect(() => {
    const controller = new AbortController();
    const fetchCountries = async () => {
      setCountriesLoading(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/iso", {
          signal: controller.signal,
        });
        const json = await res.json();
        if (!json.error && Array.isArray(json.data)) {
          const names: string[] = json.data.map((c: { name: string }) => c.name);
          setCountriesList(names.sort());
        } else {
          setCountriesList(DEFAULT_COUNTRIES);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setCountriesList(DEFAULT_COUNTRIES);
        }
      } finally {
        setCountriesLoading(false);
      }
    };

    fetchCountries();
    return () => controller.abort();
  }, []);

  // Fetch States when Country changes
  useEffect(() => {
    setState("");
    setCity("");
    setStatesList([]);
    setCitiesList([]);

    if (!country) return;

    const controller = new AbortController();
    const fetchStates = async () => {
      setStatesLoading(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
          signal: controller.signal,
        });
        const json = await res.json();
        if (!json.error && json.data?.states) {
          const uniqueStates = [
            ...new Set(json.data.states.map((s: { name: string }) => s.name.trim())),
          ].sort() as string[];
          setStatesList(uniqueStates);
        } else {
          setStatesList(["Other"]);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setStatesList(["Other"]);
        }
      } finally {
        setStatesLoading(false);
      }
    };

    fetchStates();
    return () => controller.abort();
  }, [country]);

  // Fetch Cities when State changes
  useEffect(() => {
    setCity("");
    setCitiesList([]);

    if (!country || !state) return;

    const controller = new AbortController();
    const fetchCities = async () => {
      setCitiesLoading(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, state }),
          signal: controller.signal,
        });
        const json = await res.json();
        if (!json.error && Array.isArray(json.data)) {
          const uniqueCities = [
            ...new Set(json.data.map((c: string) => c.trim())),
          ].sort() as string[];
          setCitiesList(uniqueCities);
        } else {
          setCitiesList(["Other"]);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setCitiesList(["Other"]);
        }
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
    return () => controller.abort();
  }, [country, state]);

  // Handlers
  const toggleInterest = useCallback((interest: string) => {
    setInterests((curr) => {
      if (curr.includes(interest)) {
        return curr.filter((x) => x !== interest);
      }
      if (curr.length >= 3) {
        toast.warning("You can only pick up to 3 interests.");
        return curr;
      }
      return [...curr, interest];
    });
  }, []);

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setErrors({});

  const rawData = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    countryCode,
    mobile: mobile.trim(),
    city,
    state,
    country,
    ageGroup,
    category,
    interests,
    password,
    confirmPassword,
    consent,
  };

  // Zod Validation
  const parsed = signupSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((err) => {
      const key = String(err.path[0] ?? "");
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = err.message;
      }
    });

    setErrors(fieldErrors);
    const firstErrorMessage = Object.values(fieldErrors)[0];
    toast.error(
      firstErrorMessage || "Please complete all required fields properly."
    );
    return;
  }

  try {
    setSubmitting(true);
    const res = await completeProfileApi({
      ...parsed.data,
      is_profile_completed: true,
    });

    const updatedUser = res?.data?.user || res?.data;
        localStorage.setItem(
          "jazbaa-auth",
          JSON.stringify({ isAuthenticated: true, user: updatedUser }),
        );

    // 3. Update Auth Context State
    setUser(updatedUser);
    setIsAuthenticated(true);

    toast.success("Profile created & account setup complete! Welcome to JAZBAA 🎉");

    // 4. Redirect home
    navigate("/", { replace: true });
  } catch (err: any) {
    toast.error(
      err?.response?.data?.message ||
        "Failed to finalize account. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <section className="relative min-h-screen pt-20 pb-12 bg-[#fbfaf8] dark:bg-black transition-colors duration-500 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white dark:bg-zinc-900/90 p-6 sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-slate-200/60 dark:border-white/10 space-y-6 md:space-y-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff6a3d]">
            Google Account Connected
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Complete Your Profile
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/60">
            Please complete the remaining details below to finish setting up your account.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 md:space-y-8 relative z-10">
          
          {/* --- PERSONAL DETAILS --- */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* First Name */}
              <Field label="First Name" focusState={focused === "fn"}>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  onFocus={() => setFocused("fn")}
                  onBlur={() => setFocused(null)}
                  className="form-input-premium h-10 md:h-11"
                  placeholder="John"
                />
                {errors.firstName && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>
                )}
              </Field>

              {/* Last Name */}
              <Field label="Last Name" focusState={focused === "ln"}>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  onFocus={() => setFocused("ln")}
                  onBlur={() => setFocused(null)}
                  className="form-input-premium h-10 md:h-11"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.lastName}</span>
                )}
              </Field>

              {/* Email (Locked for Google Auth) */}
              <Field label="Email Address (Locked)" focusState={false}>
                <Input
                  value={email}
                  disabled
                  readOnly
                  className="form-input-premium h-10 md:h-11 bg-slate-100 dark:bg-white/5 cursor-not-allowed opacity-75"
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                )}
              </Field>

              {/* Mobile Number */}
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">
                  Mobile Number
                </Label>
                <div className="flex gap-2">
                  <div className="w-1/3 min-w-[90px]">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-xs md:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((cc) => (
                          <SelectItem key={`${cc.code}-${cc.country}`} value={cc.code}>
                            {cc.code} ({cc.country})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      pattern="\d*"
                      maxLength={10}
                      inputMode="numeric"
                      placeholder="10 digit number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      required
                      className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-xs md:text-sm px-3"
                    />
                  </div>
                </div>
                {errors.mobile && (
                  <span className="text-xs text-red-500 block mt-1">{errors.mobile}</span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col space-y-1">
                <Field label="Password" focusState={focused === "pw"}>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      onFocus={() => setFocused("pw")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium h-10 md:h-11 pr-10 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </Field>
                {errors.password && (
                  <span className="text-xs text-red-500 block mt-1">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col space-y-1">
                <Field label="Confirm Password" focusState={focused === "cpw"}>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      onFocus={() => setFocused("cpw")}
                      onBlur={() => setFocused(null)}
                      className="form-input-premium h-10 md:h-11 pr-10 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </Field>
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500 block mt-1">{errors.confirmPassword}</span>
                )}
              </div>

            </div>
          </div>

          {/* --- DEMOGRAPHICS --- */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
              Demographics & Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Country */}
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">
                  Country
                </Label>
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
                {errors.country && <span className="text-xs text-red-500 block mt-1">{errors.country}</span>}
              </div>

              {/* State */}
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">
                  State
                </Label>
                <Select value={state} onValueChange={setState} disabled={statesLoading || !country}>
                  <SelectTrigger className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-xs md:text-sm">
                    <SelectValue placeholder={statesLoading ? "Loading..." : "Select State"} />
                  </SelectTrigger>
                  <SelectContent>
                    {statesList.map((st, idx) => (
                      <SelectItem key={`${st}-${idx}`} value={st}>{st}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <span className="text-xs text-red-500 block mt-1">{errors.state}</span>}
              </div>

              {/* City */}
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 dark:text-white/40 ml-1">
                  City
                </Label>
                <Select value={city} onValueChange={setCity} disabled={citiesLoading || !state}>
                  <SelectTrigger className="h-10 md:h-11 rounded-lg bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-xs md:text-sm">
                    <SelectValue placeholder={citiesLoading ? "Loading..." : "Select City"} />
                  </SelectTrigger>
                  <SelectContent>
                    {citiesList.map((ct, idx) => (
                      <SelectItem key={`${ct}-${idx}`} value={ct}>{ct}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <span className="text-xs text-red-500 block mt-1">{errors.city}</span>}
              </div>

            </div>

            {/* Age Group */}
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
                        : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300"
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
          <div className="space-y-3">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40 mb-1.5 block">
              Do you want to be a?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "Member", label: "A Member", d: "Attend events & connect" },
                { value: "Volunteer", label: "A Volunteer", d: "Help organize & engage" },
                { value: "Lead", label: "A Lead", d: "Lead a city Chapter" },
              ].map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setCategory(o.value as "Member" | "Volunteer" | "Lead")}
                  className={cn(
                    "p-3 md:p-4 rounded-xl border text-left transition-all duration-300 flex flex-col gap-1 md:gap-1.5",
                    category === o.value
                      ? "bg-orange-50 dark:bg-[#ff6a3d]/10 border-[#ff6a3d] ring-1 ring-[#ff6a3d] scale-[1.01]"
                      : "bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 hover:border-slate-300"
                  )}
                >
                  <span
                    className={cn(
                      "font-bold text-sm md:text-base transition-colors",
                      category === o.value ? "text-[#ff6a3d]" : "text-slate-900 dark:text-white"
                    )}
                  >
                    {o.label}
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
          <div className="space-y-3">
            <div className="flex justify-between items-end mb-1">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40">
                Select Your Hobbies and Interests
              </Label>
              <span className="text-[10px] font-bold text-[#ff6a3d] bg-orange-100 dark:bg-[#ff6a3d]/20 px-1.5 py-0.5 rounded">
                {interests.length}/3 selected
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {INTERESTS_OPTIONS.map((i) => {
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
                        ? "bg-[#ff6a3d] border-[#ff6a3d] text-white shadow-sm scale-[1.01]"
                        : "bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-slate-300"
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
          <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded accent-[#ff6a3d]"
              />
              <span className="text-xs md:text-sm text-slate-600 dark:text-white/60 font-medium leading-relaxed">
                I give consent to capture my details for JAZBAA activities. The data will be used securely for notifications and platform updates.
                <span className="text-red-500 ml-1">*</span>
              </span>
            </label>
            {errors.consent && <span className="text-xs text-red-500 mt-2 block">{errors.consent}</span>}
          </div>

          {/* --- SUBMIT BUTTON --- */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white text-sm font-bold shadow hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Sparkles className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                Complete Account Setup <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

        </form>
      </div>
    </section>
  );
};

export default CompleteGoogleProfilePage;