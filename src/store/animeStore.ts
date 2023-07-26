import {
  getAnimeById,
  getAnimesByTitle,
  getAnimeRandom,
} from '@/services/jikan'
import type { Anime } from '@/services/jikan/type'
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

const initialState = {
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
  setAnimeById: async (anime: Anime) => {
    set((state) => ({ ...state, byId: anime }))
  },
}))
