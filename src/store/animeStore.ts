import { AnimeService } from '@/services/http'
import type { Anime, AnimeByTitle } from '@/services/http/anime/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { processAndConvertToLowerCase } from '@/lib/utils'

import { ByTitleSchema } from './schema'

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
        title = processAndConvertToLowerCase(title)

        const { byTitle } = get()
        if (byTitle?.anime) {
          const titles: string[] = [byTitle.anime.title]

          byTitle.othersAnimes.forEach((others, index) => {
            if (others.animes[index]) {
              titles.push(others.animes[index].title)
            }
          })

          const exists = titles.find((value) => {
            const storedTitle = processAndConvertToLowerCase(value)
            return storedTitle.includes(title)
          })

          if (exists) return
        }

        const result = await fetch(`/api/anime?title=${title}`)
        if (!result.ok) return

        const { data } = await result.json()
        const parsedData = await ByTitleSchema.safeParseAsync(data)

        if (!parsedData.success) return

        set((state) => ({ ...state, byTitle: parsedData.data }))
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
    }),
    {
      name: '@WhatAnime-store',
    },
  ),
)
