import { AnimeService } from '@/services/http'
import type { Anime, AnimeByTitle } from '@/services/http/anime/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Props = {
  byTitle: null | AnimeByTitle
  byId: null | Anime
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

export const animeStore = create(
  persist<Store>(
    (set, get) => ({
      ...initialState,
      getAnimesByTitle: async (title: string) => {
        await AnimeService.getAnimesByTitle(title).then((data) => {
          if (!data) return
          set((state) => ({ ...state, byTitle: data }))
        })
      },
      getAnimeRandom: async () => {
        await AnimeService.getAnimeRandom().then((data) => {
          if (!data) return
          set((state) => ({ ...state, random: data }))
        })
      },
      getAnimeById: async (id: number) => {
        const { byId } = get()
        if (byId?.id === id) return

        await AnimeService.getAnimeById(id).then((data) => {
          if (!data) return

          set((state) => ({ ...state, byId: data }))
        })
      },
      setAnimeById: async (anime: Anime) => {
        set((state) => ({ ...state, byId: anime }))
      },
    }),
    {
      name: '@WhatAnime-store',
    },
  ),
)
