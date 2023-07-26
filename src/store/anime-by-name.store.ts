import { getAnimeByTitle } from '@/services/jikan'
import type { Anime } from '@/services/jikan/type'
import { create } from 'zustand'

type Store = {
  anime: null | Anime
  others: null | Anime[]
  getAnimeByTitle: (title: string) => Promise<void>
}

export const useAnimeByNameStore = create<Store>((set) => ({
  anime: null,
  others: null,
  getAnimeByTitle: async (title: string) => {
    await getAnimeByTitle(title).then((res) => {
      if (!res.data) return
      set({ anime: res.data[0], others: res.data.slice(1) })
    })
  },
}))
