import {
  getAnimeById,
  getAnimesByTitle,
  getAnimeRandom,
  getAnimesByAiring,
  getAnimesByPopularity,
} from '@/services/jikan'
import type { Anime } from '@/services/jikan/type'
import { create } from 'zustand'

type Store = {
  byTitle: null | Anime
  byId: null | Anime
  othersTitles: null | Anime[]
  random: null | Anime
  byPopularity: null | Anime[]
  byAiring: null | Anime[]
  getAnimesByTitle: (title: string) => Promise<void>
  getAnimeRandom: () => Promise<void>
  getAnimeById: (id: number) => Promise<void>
  getAnimesByAiring: () => Promise<void>
  getAnimesByPopularity: () => Promise<void>
}

export const animeStore = create<Store>((set) => ({
  byTitle: null,
  byId: null,
  othersTitles: null,
  random: null,
  byPopularity: null,
  byAiring: null,
  getAnimesByTitle: async (title: string) => {
    await getAnimesByTitle(title).then((res) => {
      if (!res.data) return
      set((state) => ({
        ...state,
        byTitle: res.data[0],
        othersTitles: res.data.slice(1, 5),
      }))
    })
  },
  getAnimeRandom: async () => {
    await getAnimeRandom().then((res) => {
      if (!res.data) return
      set((state) => ({ ...state, random: res.data }))
    })
  },
  getAnimeById: async (id: number) => {
    await getAnimeById(id).then((res) => {
      if (!res.data) return
      set((state) => ({ ...state, byId: res.data }))
    })
  },
  getAnimesByAiring: async () => {
    await getAnimesByAiring().then((res) => {
      if (!res.data) return
      set((state) => ({ ...state, byAiring: res.data.slice(0, 5) }))
    })
  },
  getAnimesByPopularity: async () => {
    await getAnimesByPopularity().then((res) => {
      if (!res.data) return
      set((state) => ({ ...state, byPopularity: res.data.slice(0, 10) }))
    })
  },
}))
