import { supabase } from '@/lib/supabase'
import { Comment } from '@/types/photo'

// 댓글 생성
export async function createComment(commentData: Omit<Comment, 'comment_id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('TB_COMMENT')
    .insert([commentData])
    .select()
    .single()

  if (error) throw error
  return data as Comment
}

// 특정 피드의 댓글들 조회
export async function getCommentsByFeedId(feedId: string) {
  const { data, error } = await supabase
    .from('TB_COMMENT')
    .select(`
      *,
      TB_USER (nickname)
    `)
    .eq('feed_id', feedId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

// 댓글 수정
export async function updateComment(commentId: string, newComment: string) {
  const { data, error } = await supabase
    .from('TB_COMMENT')
    .update({ comment: newComment })
    .eq('comment_id', commentId)
    .select()
    .single()

  if (error) throw error
  return data as Comment
}

// 댓글 삭제
export async function deleteComment(commentId: string) {
  const { error } = await supabase
    .from('TB_COMMENT')
    .delete()
    .eq('comment_id', commentId)

  if (error) throw error
} 