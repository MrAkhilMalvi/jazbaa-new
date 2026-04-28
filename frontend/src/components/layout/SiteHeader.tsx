import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events & Experiences" },
  // { to: "/join", label: "Explore" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const profileMenuRef = useRef(null);

  // Handle scroll styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Handle click outside to close the avatar profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        // Modern glassmorphism background that looks great in both light and dark modes
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm py-2.5"
          : "bg-background/95 backdrop-blur-sm border-b border-transparent py-4"
      )}
    >
      <div className="flex items-center justify-between gap-4 md:gap-6 w-full max-w-[1600px] mx-auto px-4 md:px-8">
        {/* =========================================
            LOGO SECTION
            ========================================= */}
        <Link
          to="/"
          className="flex items-center group relative shrink-0 w-[110px] sm:w-[130px] md:w-[160px] h-10 md:h-12"
          aria-label="JAZBAA home"
        >
          <img
            src="/jazbaalogo.png"
            alt="Jazbaa Logo"
            className="absolute top-1/2 left-0 -translate-y-1/2 h-[90px] sm:h-[110px] md:h-[120px] lg:h-[130px] w-auto max-w-none object-contain transition-all duration-500 group-hover:scale-105"
          />
        </Link>

        {/* =========================================
            DESKTOP NAV
            ========================================= */}
        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  // Increased font size to text-base and adjusted weight to font-medium for a cleaner look
                  "px-4 py-2.5 text-base font-medium transition-all duration-200 rounded-md tracking-wide", 
                  "hover:bg-accent/10", 
                  isActive 
                    ? "bg-accent/10 text-accent font-semibold shadow-sm" 
                    : "text-foreground/70 hover:text-foreground" // Muted when inactive, solid when hovered
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* =========================================
            ACTIONS
            ========================================= */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!user ? (
            <>
              <Button 
                asChild 
                variant="ghost" 
                size="sm" 
                className="hidden sm:inline-flex hover:bg-accent/10 hover:text-accent rounded-md text-base font-medium"
              >
                <Link to="/login">Login</Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex rounded-md text-base font-medium shadow-sm transition-transform active:scale-95"
              >
                <Link to="/signup">Join / Sign up</Link>
              </Button>
            </>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              {/* Avatar Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center rounded-full ring-2 ring-transparent hover:ring-accent transition-all focus:outline-none overflow-hidden hover:opacity-80"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent text-primary-foreground flex items-center justify-center text-base font-bold shadow-sm">
                    {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </button>

              {/* Avatar Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg text-sm font-medium"
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
            className="md:hidden hover:bg-accent/10 hover:text-accent rounded-md"
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
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl animate-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col p-4 gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3.5 text-lg font-medium transition-all duration-200 rounded-lg",
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-foreground/80 hover:bg-accent/10 hover:text-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            
            {/* Show auth buttons in mobile view if logged out */}
            {!user && (
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Button asChild variant="ghost" className="w-full justify-center hover:bg-accent/10 rounded-lg h-12 text-base font-medium">
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-lg h-12 text-base font-medium shadow-sm"
                >
                  <Link to="/signup">Join the Community</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}