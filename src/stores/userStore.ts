import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

// 클라이언트 사이드에서만 실행되는 하이드레이션 함수
export const hydrateUserStore = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem("insane-recut-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.state && parsedUser.state.user) {
          useUserStore.getState().setUser(parsedUser.state.user);
        }
      } catch (e) {
        console.error("Failed to hydrate user store:", e);
      }
    }
  }
};
