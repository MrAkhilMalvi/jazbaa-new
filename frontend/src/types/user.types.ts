export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  age_group: string;
  category: string;
  interests: string[];
  consent: boolean;
  created_at: string;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  users: User[];
}