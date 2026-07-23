import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";
import { AppRoutes } from "./AppRoutes"; // <-- Import AppRoutes here!

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Sonner position="top-right" richColors />
          <BrowserRouter>
            <SmoothScroll />
            <AppRoutes /> {/* <-- RENDER AppRoutes INSTEAD OF SiteLayout */}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);

export default App;