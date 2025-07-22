import { supabase } from '@/lib/supabase'
import { User } from '@/types/user'

// 사용자 생성
export async function createUser(userData: Omit<User, 'user_id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('TB_USER')
    .insert([userData])
    .select()
    .single()

  if (error) throw error
  return data as User
}

// 사용자 조회 (이메일로)
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('TB_USER')
    .select('*')
    .eq('email', email)
    .single()

  if (error) throw error
  return data as User
}

// 사용자 조회 (ID로)
export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('TB_USER')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data as User
}

// 사용자 정보 업데이트
export async function updateUser(userId: string, updates: Partial<Omit<User, 'user_id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('TB_USER')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data as User
} 