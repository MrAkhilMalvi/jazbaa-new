import { useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageTransition } from "@/components/animations/PageTransition";
import Index from "@/pages/Index";
import Events from "@/pages/Events";
import Join from "@/pages/Join";
import Signup from "@/pages/Signup";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { RequireAuth } from "@/lib/RequireAuth";

export function SiteLayout() {
  const location = useLocation();
  const { pathname, hash } = location;

  useEffect(() => {
    if (!hash) {
      const frame = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });

      return () => cancelAnimationFrame(frame);
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const frame = requestAnimationFrame(scrollToHash);
    const shortRetry = window.setTimeout(scrollToHash, 100);
    const transitionRetry = window.setTimeout(scrollToHash, 750);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(shortRetry);
      window.clearTimeout(transitionRetry);
    };
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* AnimatePresence handles the unmount/mount of pages */}
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Index />} />
              <Route
                path="/about"
                element={<Navigate to="/#about" replace />}
              />
              {/* <Route
                path="/events"
                element={
                  <RequireAuth>
                    <Events />
                  </RequireAuth>
                }
              /> */}
              <Route path="/events" element={<Events />} />
              {/* <Route path="/join" element={<Join />} /> */}
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
