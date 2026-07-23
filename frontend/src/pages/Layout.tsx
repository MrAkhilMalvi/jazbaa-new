import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Instagram,
  Youtube,
  MailCheck,
  FacebookIcon,
  Phone,
} from "lucide-react";

// Context & UI Imports
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/sections/WhatsAppButton";

const baseLinks = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events & Experiences" },
  { to: "/#about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export default function SiteLayout() {
  // Navigation & Location
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, hash } = location;

  // Header State
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Auth Context
  const { user, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Dynamically prepare navbar links
  const links = [...baseLinks];
  if (user?.is_admin) {
    links.push({ to: "/admin/dashboard", label: "Admin" });
  }

  // Handle Navbar scroll styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle Profile Dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Page Scroll & Hash Scroll
  useEffect(() => {
    if (!hash) {
      const frame = requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      });
      return () => cancelAnimationFrame(frame);
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const frame = requestAnimationFrame(scrollToHash);
    const shortRetry = window.setTimeout(scrollToHash, 50);
    const transitionRetry = window.setTimeout(scrollToHash, 300);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(shortRetry);
      window.clearTimeout(transitionRetry);
    };
  }, [pathname, hash]);

  // Dynamic Navigation Click Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setOpen(false);

    if (target === "/#about") {
      e.preventDefault();
      if (location.pathname === "/") {
        navigate({ hash: "#about" });
      } else {
        navigate("/#about");
      }
    } else if (target === "/") {
      e.preventDefault();
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate({ hash: "" });
      } else {
        navigate("/");
      }
    }
  };

  const isLinkActive = (to: string) => {
    if (to === "/#about") return location.pathname === "/" && location.hash === "#about";
    if (to === "/") return location.pathname === "/" && location.hash === "";
    return location.pathname.startsWith(to);
  };

  const isLoginActive = location.pathname === "/login";
  const isSignupActive = location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* =========================================
          SITE HEADER
          ========================================= */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 shadow-sm py-2"
            : "bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-transparent py-4"
        )}
      >
        <div className="flex items-center justify-between gap-4 md:gap-6 w-full max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center group relative shrink-0 w-[110px] sm:w-[130px] md:w-[150px] h-10 md:h-12"
            aria-label="JAZBAA home"
          >
            <img
              src="/jazbaalogo.png"
              alt="Jazbaa Logo"
              className="absolute top-1/2 left-0 -translate-y-1/2 h-[90px] sm:h-[110px] md:h-[120px] w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {links.map((l) => {
              const isActive = isLinkActive(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={(e) => handleNavClick(e, l.to)}
                  className={cn(
                    "relative px-4 py-2 text-base font-semibold transition-all duration-300 rounded-full",
                    isActive
                      ? "bg-[#ff6a3d] text-white shadow-lg shadow-orange-500/25"
                      : "text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Profile */}
          <div className="flex items-center gap-3 lg:gap-4">
            <ThemeToggle />

            {!user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "hidden sm:inline-flex rounded-full text-base font-semibold transition-all duration-300 ease-in-out h-10 px-6 border",
                    isLoginActive
                      ? "bg-orange-50 dark:bg-[#ff6a3d]/10 text-[#ff6a3d] border-[#ff6a3d]/30"
                      : "bg-slate-100/80 hover:bg-[#ff6a3d]/10 dark:bg-white/5 dark:hover:bg-[#ff6a3d]/15 text-slate-800 dark:text-slate-200 hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] border-slate-200/40 dark:border-white/5 hover:border-[#ff6a3d]/20 dark:hover:border-[#ff6a3d]/20"
                  )}
                >
                  <Link to="/login">Login</Link>
                </Button>

                <Button
                  asChild
                  className={cn(
                    "hidden sm:inline-flex rounded-full text-base font-bold transition-all h-10 px-6 border",
                    isSignupActive
                      ? "bg-[#ff6a3d] text-white border-[#ff6a3d] shadow-lg shadow-orange-500/30 ring-2 ring-[#ff6a3d]/20"
                      : "bg-[#ff6a3d] hover:bg-[#e05b3e] text-white border-transparent hover:shadow-orange-500/30 shadow-lg"
                  )}
                >
                  <Link to="/signup">Join / Sign up</Link>
                </Button>
              </>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center rounded-full ring-2 ring-transparent hover:ring-[#ff6a3d] transition-all focus:outline-none overflow-hidden hover:opacity-90 shadow-sm"
                >
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#ff6a3d] text-white flex items-center justify-center text-lg font-bold">
                      {user?.first_name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {user?.is_admin && (
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-base font-semibold transition-colors h-10 px-4 mb-1 gap-2"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Link to="/admin/dashboard">
                          <LayoutDashboard className="w-4 h-4 text-[#ff6a3d]" />
                          Dashboard
                        </Link>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-base font-semibold transition-colors h-10 px-4"
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-700 dark:text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col p-4 gap-2">
              {links.map((l) => {
                const isActive = isLinkActive(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={(e) => handleNavClick(e, l.to)}
                    className={cn(
                      "px-4 py-3 text-lg font-semibold transition-all duration-200 rounded-xl",
                      isActive
                        ? "bg-orange-50 dark:bg-[#ff6a3d]/10 text-[#ff6a3d]"
                        : "text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/5"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}

              {!user && (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                  <Button
                    asChild
                    variant="ghost"
                    className={cn(
                      "w-full justify-center rounded-xl transition-all duration-300 h-12 text-base font-semibold border",
                      isLoginActive
                        ? "bg-orange-50 dark:bg-[#ff6a3d]/10 text-[#ff6a3d] border-[#ff6a3d]/20"
                        : "bg-slate-100/80 hover:bg-[#ff6a3d]/10 dark:bg-white/5 text-slate-800 dark:text-slate-200 border-slate-200/40 dark:border-white/5"
                    )}
                  >
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className={cn(
                      "w-full rounded-xl h-12 text-base font-bold transition-all border",
                      isSignupActive
                        ? "bg-[#ff6a3d] text-white border-[#ff6a3d] shadow-lg shadow-orange-500/25"
                        : "bg-[#ff6a3d] hover:bg-[#e05b3e] text-white border-transparent shadow-md"
                    )}
                  >
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      Join the Community
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* =========================================
          MAIN WRAPPER FOR PAGE OUTLET
          ========================================= */}
      <main className="flex-1 relative bg-background text-foreground overflow-hidden">
        <Outlet />
      </main>

      <WhatsAppButton phoneNumber="" />

      {/* =========================================
          SITE FOOTER
          ========================================= */}
      <footer className="bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 py-10 md:py-5">
          <div className="grid gap-10 md:gap-5 sm:grid-cols-2 md:grid-cols-4">
            {/* Brand Column */}
            <div className="sm:col-span-2 md:pr-10">
              <Link
                to="/"
                className="relative block w-[130px] sm:w-[150px] h-12 mb-6 md:mb-8 shrink-0 group"
                aria-label="JAZBAA home"
              >
                <img
                  src="/jazbaalogo.png"
                  alt="Jazbaa Logo"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[100px] sm:h-[120px] w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <p className="mt-4 max-w-md text-base md:text-lg text-slate-600 dark:text-white/70 leading-relaxed font-medium">
                A thriving community where learning, creativity, wellness, and meaningful connections inspire personal growth and collective impact.
              </p>
              <p className="mt-4 text-sm md:text-base text-slate-400 dark:text-white/40 font-semibold tracking-wide">
                By Navira Life Essentials Pvt. Ltd.
              </p>
            </div>

            {/* Explore Links */}
            <div className="mt-4 sm:mt-0">
              <h4 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white mb-5 md:mb-6">
                Explore
              </h4>
              <ul className="space-y-3 md:space-y-4 text-base md:text-lg font-medium text-slate-600 dark:text-white/70">
                <li>
                  <Link
                    to="/#about"
                    className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                  >
                    Events & Experiences
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Links */}
            <div>
              <h4 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white mb-5 md:mb-6">
                Connect
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:support@jazbaa.co.in"
                  className="flex items-center gap-3 text-base md:text-lg font-medium text-slate-600 dark:text-white/70 hover:text-[#ea4335] dark:hover:text-[#ea4335] hover:translate-x-1 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 group-hover:border-[#ea4335] group-hover:bg-[#ea4335]/10 transition-colors duration-300 flex items-center justify-center shrink-0">
                    <MailCheck className="h-5 w-5 text-slate-400 group-hover:text-[#ea4335] transition-colors" />
                  </div>
                  <span className="truncate">support@jazbaa.co.in</span>
                </a>

                <a
                  href="tel:+919892394310"
                  className="flex items-center gap-3 text-base md:text-lg font-medium text-slate-600 dark:text-white/70 hover:text-[#10b981] dark:hover:text-[#10b981] hover:translate-x-1 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 group-hover:border-[#10b981] group-hover:bg-[#10b981]/10 transition-colors duration-300 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-slate-400 group-hover:text-[#10b981] transition-colors" />
                  </div>
                  <span className="truncate">+91 989 239 4310</span>
                </a>

                {/* Social Media Links */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <a
                    href="https://www.instagram.com/jazbaa.experiences/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram"
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-pink-600 hover:text-white hover:border-pink-500"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>

                  <a
                    href="https://www.youtube.com/@JazbaaVibes"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our YouTube"
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-red-600 hover:text-white hover:border-red-500"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61591240624769"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Facebook"
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white hover:border-blue-500"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <p className="text-sm md:text-base text-slate-500 dark:text-white/50 font-medium">
                © {new Date().getFullYear()} JAZBAA. Live Your Passion. | Navira Life Essentials Pvt. Ltd.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm md:text-base font-medium text-slate-400 dark:text-white/40">
                <Link to="/privacy-policy" className="hover:text-[#ff6a3d] transition-colors duration-300">
                  Privacy Policy
                </Link>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                <Link to="/terms-conditions" className="hover:text-[#ff6a3d] transition-colors duration-300">
                  Terms & Conditions
                </Link>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                <Link to="/cookie-policy" className="hover:text-[#ff6a3d] transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white cursor-default">
              Don't just live.{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a3d] to-[#ff9e80] relative inline-block group">
                Feel alive.
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[#ff6a3d]/40 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}