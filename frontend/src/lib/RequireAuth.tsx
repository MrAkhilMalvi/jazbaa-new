import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const RequireAuth = ({ children }: any) => {
  const { user, loading } = useAuth();

  // ⏳ show loader while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  // ❌ not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ logged in
  return children;
};