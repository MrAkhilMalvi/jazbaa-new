import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-editorial">
        <div
          className={cn(
            "flex items-center justify-between gap-6 rounded-full px-4 md:px-6 py-2.5 transition-all duration-500",
            scrolled ? "glass shadow-soft" : "bg-transparent"
          )}
        >
          <Link to="/" className="flex items-center gap-2 group" aria-label="JAZBAA home">
            <span className="relative h-8 w-8 rounded-full bg-gradient-ember shadow-glow grid place-items-center">
              <span className="font-display text-accent-foreground text-sm font-bold">J</span>
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              JAZBAA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    "hover:text-accent",
                    isActive ? "text-accent" : "text-foreground/80"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ember" size="sm" className="hidden sm:inline-flex">
              <Link to="/signup">Sign up</Link>
            </Button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-accent/10"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                      isActive ? "bg-accent/10 text-accent" : "hover:bg-foreground/5"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button asChild variant="ember" className="mt-2">
                <Link to="/signup">Join the Community</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
