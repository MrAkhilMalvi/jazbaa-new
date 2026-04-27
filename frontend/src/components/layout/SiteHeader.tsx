import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/join", label: "Join" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // <-- New state for Avatar Dropdown
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-editorial">
        <div
          className={cn(
            "flex items-center justify-between gap-4 md:gap-6 rounded-full px-4 md:px-6 py-2.5 transition-all duration-500",
            scrolled
              ? "bg-background/85 border border-border shadow-soft backdrop-blur-md"
              : "bg-transparent",
          )}
        >
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
              className="absolute top-1/2 left-0 -translate-y-1/2 h-[90px] sm:h-[110px] md:h-[120px] lg:h-[110px] w-auto max-w-none object-contain transition-all duration-500 group-hover:scale-105 logo-premium"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    "hover:text-accent",
                    isActive ? "text-accent" : "text-foreground/80",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {!user ? (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Sign in</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="hidden sm:inline-flex"
                >
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center rounded-full ring-2 ring-transparent hover:ring-accent transition-all focus:outline-none overflow-hidden"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                      {user?.first_name?.toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Avatar Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
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

            {/* MOBILE MENU TOGGLE (Using the Menu/X icons you imported) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl border border-border">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "hover:bg-foreground/5",
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button
                asChild
                className="mt-2 w-full bg-gradient-ember text-white h-12"
              >
                <Link to="/signup">Join the Community</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
