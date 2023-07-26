import animeService from '@/services/http/anime'
import type { Anime } from '@/services/http/anime/schema'
import { create } from 'zustand'

type Props = {
  byTitle: null | Anime
  byId: null | Anime
  othersTitles: null | Anime[]
  random: null | Anime
  byPopularity: null | Anime[]
  byAiring: null | Anime[]
  animeQuote: null | Anime
}

interface Store extends Props {
  getAnimesByTitle: (title: string) => Promise<void>
  getAnimeRandom: () => Promise<void>
  getAnimeById: (id: number) => Promise<void>
  setAnimeById: (anime: Anime) => Promise<void>
}

export const initialState = {
  byTitle: null,
  byId: null,
  othersTitles: null,
  random: null,
  byPopularity: null,
  byAiring: null,
  animeQuote: null,
}

export type AnimeStore = ReturnType<typeof animeStore>

export const animeStore = create<Store>((set) => ({
  ...initialState,
  getAnimesByTitle: async (title: string) => {
    await animeService.getAnimesByTitle(title).then((data) => {
      if (!data) return
      set((state) => ({
        ...state,
        byTitle: data[0],
        othersTitles: data.slice(1, 5),
      }))
    })
  },
  getAnimeRandom: async () => {
    await animeService.getAnimeRandom().then((data) => {
      if (!data) return
      set((state) => ({ ...state, random: data }))
    })
  },
  getAnimeById: async (id: number) => {
    await animeService.getAnimeById(id).then((data) => {
      if (!data) return
      set((state) => ({ ...state, byId: data }))
    })
  },
  setAnimeById: async (anime: Anime) => {
    set((state) => ({ ...state, byId: anime }))
  },
}))
