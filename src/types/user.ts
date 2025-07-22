export interface User {
  user_id: string
  email: string
  nickname: string
  created_at: string
}

export interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
} 