import { CUSTOM_ERROR } from '@/common/enum'
import { AnimeService } from '@/services/http'
import type { Anime } from '@/services/http/anime/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { processAndConvertToLowerCase } from '@/lib/utils'

import { fetchData, type DataResponse } from '@/lib/fetchData'
import { ListChunk, listChunk } from '@/lib/listChunk'

import { ByTitleSchema, InternalByTitleResponse } from './schema'

export interface StoreAnimeByTitle {
  title: string
  animeList: Anime[]
  chunkedList: ListChunk
  pagination: {
    has_next_page: boolean
    current_page: number
  }
  isLoading: boolean
  error: string | null
}

type State = {
  byTitle: StoreAnimeByTitle | null
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
  updateOthersAnimesByTitle: () => Promise<void>
}

export const initialState = {
  byTitle: null,
  byId: null,
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

        if (byTitle?.title) {
          const titles: string[] = [byTitle.title]

          byTitle.animeList.forEach((animes) => {
            if (!animes.title) return
            titles.push(animes.title)
          })

          const exists = titles.find((value) => {
            const storedTitle = processAndConvertToLowerCase(value)
            return storedTitle.includes(title)
          })

          if (exists) return
        }

        set((state) => ({
          ...state,
          byTitle: {
            title: '',
            animeList: [],
            chunkedList: [],
            pagination: {
              current_page: 0,
              has_next_page: false,
            },
            isLoading: true,
            error: null,
          },
        }))

        const response = await fetchData<InternalByTitleResponse>(
          `/api/anime?title=${title}`,
        )

        if (!response || response?.error) {
          set((state) => ({
            ...state,
            byTitle: {
              title: '',
              animeList: [],
              chunkedList: [],
              pagination: {
                current_page: 0,
                has_next_page: false,
              },
              isLoading: false,
              error: CUSTOM_ERROR.NOT_FOUND,
            },
          }))
          return
        }

        const parsedData = await ByTitleSchema.safeParseAsync(response.data)

        if (!parsedData.success) return

        set((state) => ({
          ...state,
          byTitle: {
            title,
            animeList: parsedData.data.data,
            chunkedList: listChunk(parsedData.data.data.slice(1)),
            pagination: parsedData.data.pagination,
            error: null,
            isLoading: false,
          },
        }))
      },
      updateOthersAnimesByTitle: async () => {
        const { byTitle } = get()

        if (!byTitle?.pagination) return

        const response = await fetchData<InternalByTitleResponse>(
          `/api/anime?title=${byTitle.title}&page=${byTitle.pagination.current_page + 1}`,
        )

        if (response?.error) {
          set((state) => ({
            ...state,
            byTitle: {
              ...byTitle,
              isLoading: true,
              error: response.error,
            },
          }))
          return
        }

        const parsedData = await ByTitleSchema.safeParseAsync(response.data)

        if (!parsedData.success) return
        const animeList = [...new Set([...byTitle.animeList, ...parsedData.data.data])]

        set((state) => ({
          ...state,
          byTitle: {
            ...byTitle,
            animeList,
            chunkedList: listChunk(animeList),
            error: response.error,
            isLoading: response.isLoading,
          },
        }))
      },

      getAnimeRandom: async () => {
        const { random } = get()
        set((state) => ({
          ...state,
          random: {
            data: random?.data || null,
            error: random?.error || null,
            isLoading: true,
          },
        }))
        const response = await AnimeService.getAnimeRandom()
        set((state) => ({ ...state, random: response }))
      },
      getAnimeById: async (id: number) => {
        const { byId } = get()
        set((state) => ({
          ...state,
          byId: {
            data: byId?.data || null,
            error: byId?.error || null,
            isLoading: true,
          },
        }))

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
