import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Sonner position="top-right" richColors />
          <BrowserRouter>
            <SmoothScroll />
            <SiteLayout />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);

export default App;