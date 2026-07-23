import { logoutApi } from "@/services/auth.service";
import { AuthContextType, User } from "@/types/authContext.type";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedAuth = localStorage.getItem("jazbaa-auth");
  const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

  const [user, setUser] = useState<User | null>(parsedAuth?.user || null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!parsedAuth?.isAuthenticated || !!parsedAuth?.user,
  );
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("jazbaa-auth");
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout API failed", error);
    }
  };

  

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
