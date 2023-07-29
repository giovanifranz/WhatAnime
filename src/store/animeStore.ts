import { AnimeService } from '@/services/http'
import type { Anime, AnimeByTitle } from '@/services/http/anime/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { processAndConvertToLowerCase } from '@/lib/utils'

import { fetchData, type DataResponse } from '@/lib/fetchData'

import { ByTitleSchema } from './schema'

type State = {
  byTitle: DataResponse<AnimeByTitle> | null
  byId: DataResponse<Anime> | null
  random: DataResponse<Anime> | null
  byPopularity: DataResponse<Anime[]> | null
  byAiring: DataResponse<Anime[]> | null
  animeQuote: DataResponse<Anime> | null
}

type Actions = {
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
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      getAnimesByTitle: async (title: string) => {
        title = processAndConvertToLowerCase(title)

        const { byTitle } = get()

        if (byTitle?.data?.anime) {
          const titles: string[] = [byTitle.data.anime.title]

          byTitle.data.othersAnimes.forEach((others, index) => {
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

        const { data: response } = await fetchData<DataResponse<Anime>>(
          `/api/anime?title=${title}`,
        )

        if (response?.error) {
          set((state) => ({
            ...state,
            byTitle: {
              data: null,
              error: response.error,
              isLoading: response.isLoading,
            },
          }))
          return
        }

        const parsedData = await ByTitleSchema.safeParseAsync(response?.data)

        if (!parsedData.success) return

        set((state) => ({
          ...state,
          byTitle: {
            data: parsedData.data,
            error: null,
            isLoading: false,
          },
        }))
      },
      getAnimeRandom: async () => {
        const response = await AnimeService.getAnimeRandom()
        set((state) => ({ ...state, random: response }))
      },
      getAnimeById: async (id: number) => {
        const { byId } = get()
        if (byId?.data?.id === id) return

        const response = await AnimeService.getAnimeById(id)
        set((state) => ({ ...state, byId: response }))
      },
    }),
    {
      name: '@WhatAnime-store',
    },
  ),
)
