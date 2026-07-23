export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;

  setIsAuthenticated: (val: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

export type User = {
  id: string;
  email: string;
  avatar?: string;
  first_name?:string;
  is_admin:boolean;
  last_name:string;
  name:string;
  is_profile_completed:boolean;

};
