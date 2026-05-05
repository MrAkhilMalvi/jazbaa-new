import { createContext, useContext, useEffect, useState } from "react";
import { getMeApi, logoutApi } from "@/api/Auth.api";

type User = {
  id: string;
  email: string;
  avatar?: string;
  first_name?:string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 CHECK SESSION
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMeApi();
        console.log(res.data.user);
        
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔴 Logout
  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};