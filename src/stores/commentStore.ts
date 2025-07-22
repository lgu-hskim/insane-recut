import { create } from 'zustand'
import { Comment, CommentState } from '@/types/photo'

export const useCommentStore = create<CommentState>()((set, get) => ({
  comments: [],
  setComments: (comments: Comment[]) => set({ comments }),
  addComment: (comment: Comment) => {
    const { comments } = get()
    set({ comments: [...comments, comment] })
  },
  removeComment: (commentId: string) => {
    const { comments } = get()
    set({ comments: comments.filter(c => c.comment_id !== commentId) })
  },
  clearComments: () => set({ comments: [] }),
})) 