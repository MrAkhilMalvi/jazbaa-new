import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageTransition } from "@/components/animations/PageTransition";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Events from "@/pages/Events";
import Join from "@/pages/Join";
import Signup from "@/pages/Signup";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

export function SiteLayout() {
  const location = useLocation();

  // ✅ FIX: Wait for Framer Motion to paint the new DOM before scrolling to top.
  // This prevents the page/Lenis from getting stuck on route changes.
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* AnimatePresence handles the unmount/mount of pages */}
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/join" element={<Join />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
}