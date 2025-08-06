import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PhotoFeed, PhotoState } from '@/types/photo'

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set, get) => ({
      photos: [],
      setPhotos: (photos: PhotoFeed[]) => set({ photos }),
      addPhoto: (photo: PhotoFeed) => {
        const { photos } = get()
        set({ photos: [photo, ...photos] })
      },
      removePhoto: (photoId: string) => {
        const { photos } = get()
        set({ photos: photos.filter(p => p.feed_id !== photoId) })
      },
      clearPhotos: () => set({ photos: [] }),
    }),
    {
      name: 'insane-recut-photos', // localStorage key
      partialize: (state) => ({ photos: state.photos }),
    }
  )
) 