import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PhotoFeed, FeedState } from '@/types/photo'

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      feeds: [],
      setFeeds: (feeds: PhotoFeed[]) => set({ feeds }),
      addFeed: (feed: PhotoFeed) => {
        const { feeds } = get()
        set({ feeds: [feed, ...feeds] })
      },
      removeFeed: (feedId: string) => {
        const { feeds } = get()
        set({ feeds: feeds.filter(f => f.feed_id !== feedId) })
      },
      clearFeeds: () => set({ feeds: [] }),
    }),
    {
      name: 'insane-recut-feeds', // localStorage key
      partialize: (state) => ({ feeds: state.feeds }),
    }
  )
) 