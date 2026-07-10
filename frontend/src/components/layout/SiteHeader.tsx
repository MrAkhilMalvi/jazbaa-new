import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react"; // Imported LayoutDashboard icon
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const baseLinks = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events & Experiences" },
  { to: "/#about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const profileMenuRef = useRef<HTMLDivElement>(null);

  // 🛠️ DYNAMICALLY ADD ADMIN LINK IF THE USER IS AN ADMIN
  const links = [...baseLinks];
  if (user?.is_admin) {
    links.push({ to: "/admin/dashboard", label: "Admin" });
  }

  // Handle scroll styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle click outside to close the avatar profile menu
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

  // Monitor location changes to handle smooth scrolling to hash IDs
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, location.hash]);

  // Custom Navigation Handler for Smooth Hash Scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setOpen(false); // Close mobile menu if open

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

  // Helper to determine if a link is "active"
  const isLinkActive = (to: string) => {
    if (to === "/#about") return location.pathname === "/" && location.hash === "#about";
    if (to === "/") return location.pathname === "/" && location.hash === "";
    return location.pathname.startsWith(to);
  };

  const isLoginActive = location.pathname === "/login";
  const isSignupActive = location.pathname === "/signup";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 shadow-sm py-2"
          : "bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-transparent py-4"
      )}
    >
      <div className="flex items-center justify-between gap-4 md:gap-6 w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* =========================================
            LOGO SECTION
            ========================================= */}
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

        {/* =========================================
            DESKTOP NAV (Includes dynamic Dashboard link)
            ========================================= */}
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

        {/* =========================================
            ACTIONS
            ========================================= */}
        <div className="flex items-center gap-3 lg:gap-4">
          <ThemeToggle />

          {!user ? (
            <>
              {/* Login Button */}
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

              {/* Sign Up Button */}
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
              {/* Avatar Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center rounded-full ring-2 ring-transparent hover:ring-[#ff6a3d] transition-all focus:outline-none overflow-hidden hover:opacity-90 shadow-sm"
              >
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt="avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#ff6a3d] text-white flex items-center justify-center text-lg font-bold">
                    {user?.first_name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Avatar Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* ⭐ ADMIN SHORTCUT INSIDE AVATAR MENU */}
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

          {/* MOBILE MENU TOGGLE */}
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

      {/* =========================================
          MOBILE MENU DROPDOWN
          ========================================= */}
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

            {/* Auth buttons in mobile view if logged out */}
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
                  <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
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
                  <Link to="/signup" onClick={() => setOpen(false)}>Join the Community</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}