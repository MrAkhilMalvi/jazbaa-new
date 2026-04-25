import { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageTransition } from "@/components/animations/PageTransition";

export function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  // Smooth scroll to top on route change — no hard jump.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>{children}</PageTransition>
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
}
