import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface LikeState {
  likes: number[]
  addLike: (movieId: number) => void
  removeLike: (movieId: number) => void
  isLiked: (movieId: number) => boolean
  clearLikes: () => void
  setLikes: (likes: number[]) => void
}

export const useLikeStore = create<LikeState>()(
  persist(
    (set, get) => ({
      likes: [],
      addLike: (movieId: number) => set((state) => ({ 
        likes: state.likes.includes(movieId) ? state.likes : [...state.likes, movieId] 
      })),
      removeLike: (movieId: number) => set((state) => ({ 
        likes: state.likes.filter(id => id !== movieId) 
      })),
      isLiked: (movieId: number) => get().likes.includes(movieId),
      clearLikes: () => set({ likes: [] }),
      setLikes: (likes: number[]) => set({ likes }),
    }),
    {
      name: 'like-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

