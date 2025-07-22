import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserState } from '@/types/user'

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'insane-recut-user', // localStorage key
      partialize: (state) => ({ user: state.user }),
    }
  )
) 