import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Photo, PhotoState } from '@/types/photo'

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set, get) => ({
      photos: [],
      setPhotos: (photos: Photo[]) => set({ photos }),
      addPhoto: (photo: Photo) => {
        const { photos } = get()
        set({ photos: [photo, ...photos] })
      },
      removePhoto: (photoId: string) => {
        const { photos } = get()
        set({ photos: photos.filter(p => p.photo_id !== photoId) })
      },
      clearPhotos: () => set({ photos: [] }),
    }),
    {
      name: 'insane-recut-photos', // localStorage key
      partialize: (state) => ({ photos: state.photos }),
    }
  )
) 