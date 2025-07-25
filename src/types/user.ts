export interface User {
  user_id: string;
  email: string;
  nickname: string;
  created_at: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}
