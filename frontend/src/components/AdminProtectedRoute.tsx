import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { user, loading } = useAuth(); // Assuming your AuthContext has a loading state

  // 1. Wait for auth state to load from cookies/localStorage
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#ff6a3d]"></div>
      </div>
    );
  }

  // 2. If not logged in OR not an admin, block access and show custom message
  if (!user || user.is_admin !== true) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-xl text-center flex flex-col items-center">
          
          <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
            <ShieldAlert className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Access Denied
          </h1>
          
          <p className="text-slate-600 dark:text-white/60 mb-6 text-sm sm:text-base">
            You do not have access to this page. This dashboard is restricted to administrators only.
          </p>

          <Button asChild className="w-full bg-[#ff6a3d] hover:bg-[#e05b3e] text-white rounded-xl h-11 font-semibold shadow-md">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // 3. If they are an admin, let them see the page!
  return <>{children}</>;
}