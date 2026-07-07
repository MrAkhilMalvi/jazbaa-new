import { useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageTransition } from "@/components/animations/PageTransition";
import Index from "@/pages/Index";
import Events from "@/pages/Events";
import Signup from "@/pages/Signup";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import CookiePolicy from "@/pages/CookiePolicy";
import { WhatsAppButton } from "../sections/WhatsAppButton";

export function SiteLayout() {
  const location = useLocation();
  const { pathname, hash } = location;

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
    
    // Reduced delays to match faster route transitions
    const shortRetry = window.setTimeout(scrollToHash, 50);
    const transitionRetry = window.setTimeout(scrollToHash, 300);

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
        <AnimatePresence mode="wait">
          {/* We pass a speed override key or handle it inside the component */}
          <PageTransition key={location.pathname}>
            <Routes location={location} key={location.pathname}>
              {/* HOME */}
              <Route path="/" element={<Index />} />

              {/* ABOUT */}
              <Route
                path="/about"
                element={<Navigate to="/#about" replace />}
              />

              {/* EVENTS */}
              <Route path="/events" element={<Events />} />

              {/* AUTH */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* FORGOT PASSWORD */}
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* RESET PASSWORD */}
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />

              {/* CONTACT */}
              <Route path="/contact" element={<Contact />} />

              {/* POLICIES */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <WhatsAppButton phoneNumber="919892394310" />

      <SiteFooter />
    </div>
  );
}