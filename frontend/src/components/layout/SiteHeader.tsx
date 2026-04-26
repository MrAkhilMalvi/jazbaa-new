import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const links =[
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/join", label: "Join" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const[open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false),[pathname]);

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
              LOGO SECTION - FIXED RESPONSIVE SIZE
              ========================================= */}
          <Link
            to="/"
            /* FIXED: Changed w-[1200px] to w-[110px] so it fits perfectly on mobile */
            className="flex items-center group relative shrink-0 w-[110px] sm:w-[130px] md:w-[160px] h-10 md:h-12"
            aria-label="JAZBAA home"
          >
            <img
              src="/jazbaalogo.png"
              alt="Jazbaa Logo"
              /* Adjusted height classes to smoothly scale from mobile to desktop */
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
        className="hidden sm:inline-flex bg-gradient-ember text-white"
      >
        <Link to="/signup">Sign up</Link>
      </Button>
    </>
  ) : (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      <img
        src={user?.avatar || "https://i.pravatar.cc/40"}
        alt="user"
        className="w-9 h-9 rounded-full border"
      />

      {/* Logout */}
      <Button size="sm" variant="outline" onClick={logout}>
        Logout
      </Button>
    </div>
  )}
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
              <Button asChild className="mt-2 w-full bg-gradient-ember text-white h-12">
                <Link to="/signup">Join the Community</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}