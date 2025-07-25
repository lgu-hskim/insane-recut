import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserState } from "@/types/user";

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user: User | null) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "insane-recut-user", // localStorage key
      partialize: (state) => ({ user: state.user }),
    }
  )
);
