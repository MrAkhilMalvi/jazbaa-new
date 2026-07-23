import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/animations/PageTransition";
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
import AdminDashboard from "@/pages/admin/UserPage";

import CompleteGoogleProfilePage from "./components/CompleteGoogleProfilePage";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import SiteLayout from "./pages/Layout";
import Home from "./pages/Home";
import { RedirectIfAuth, RequireAuth } from "./providers/authGuard";

export function AppRoutes() {
  const location = useLocation();

  return (
<Routes location={location} key={location.pathname}>
      <Route element={<SiteLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        {/* Profile Completion (Accessible right after Google OAuth) */}
        <Route
          path="/complete-profile"
          element={<CompleteGoogleProfilePage />}
        />

        {/* Guest Only Routes */}
        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>

        {/* Authenticated Routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
