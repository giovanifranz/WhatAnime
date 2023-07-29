import { REVALIDATE, ERROR } from '@/common/enum'
import type { ServiceResponse } from '@/services/types/service'

import { logger } from '@/lib/utils'

import { fetchData } from '@/lib/fetchData'

import {
  Anime,
  AnimeSchema,
  SingleResponse,
  MultipleResponse,
  RankingSchema,
  Ranking,
  AnimeByTitle,
  AnimeChunks,
} from './schema'

export const baseUrl = 'https://api.jikan.moe/v4'

class Service {
  private api = baseUrl

  private sortByScoreDescending(animes: Anime[]): AnimeByTitle | null {
    const sortedAnimes = animes.sort((a, b) => {
      if (a.score && b.score) return b.score - a.score
      return 0
    })

    const anime = sortedAnimes.shift()

    if (!anime) {
      logger.error('Anime by title not found')
      return null
    }

    const othersAnimes: AnimeChunks = []
    let count = 0

    for (let i = 0; i < animes.length; i += 4) {
      for (let j = 1; j < 4; j += 4) {
        count += 1
      }

      othersAnimes.push({
        animes: animes.slice(i, i + 4),
        page: count,
      })
    }

    return {
      anime,
      othersAnimes,
    }
  }

  getAnimesByTitle = async (title: string): ServiceResponse<AnimeByTitle | null> => {
    return fetchData<MultipleResponse>(
      `${this.api}/anime?q=${encodeURIComponent(title)}&sfw`,
    ).then((response) => {
      if (!response.data?.data) {
        return {
          error: response.error,
          isLoading: response.isLoading,
          data: null,
        }
      }

      const animes: Anime[] = []

      for (const anime of response.data.data) {
        const validate = AnimeSchema.safeParse(anime)
        if (validate.success) {
          animes.push(validate.data)
        }
      }

      return {
        error: response.error,
        isLoading: response.isLoading,
        data: this.sortByScoreDescending(animes),
      }
    })
  }

  getAnimeById = async (id: number): ServiceResponse<Anime> => {
    return fetchData<SingleResponse>(`${this.api}/anime/${id}`).then((response) => {
      if (response.error) {
        return {
          error: response.error,
          isLoading: response.isLoading,
          data: null,
        }
      }

      const validate = AnimeSchema.safeParse(response.data?.data)

      if (!validate.success) {
        return {
          error: ERROR.PARSING,
          isLoading: false,
          data: null,
        }
      }

      return {
        error: null,
        isLoading: false,
        data: validate.data,
      }
    })
  }

  getAnimeRandom = async (): ServiceResponse<Anime> => {
    return fetchData<SingleResponse>(`${this.api}/random/anime`, {
      next: { revalidate: REVALIDATE.ONE_DAY },
    }).then((response) => {
      if (response.error) {
        return {
          error: response.error,
          isLoading: response.isLoading,
          data: null,
        }
      }

      const validate = AnimeSchema.safeParse(response.data?.data)

      if (!validate.success) {
        return {
          error: ERROR.PARSING,
          isLoading: false,
          data: null,
        }
      }

      return {
        error: null,
        isLoading: false,
        data: validate.data,
      }
    })
  }

  getAnimesByAiring = async (): ServiceResponse<Ranking[]> => {
    return fetchData<MultipleResponse>(
      `${this.api}/anime?order_by=score&status=airing&&sort=desc`,
      {
        next: { revalidate: REVALIDATE.ONE_DAY },
      },
    ).then((response) => {
      const animes: Ranking[] = []

      if (response.error) {
        return {
          error: response.error,
          isLoading: response.isLoading,
          data: animes,
        }
      }

      if (response.data?.data) {
        for (const anime of response.data.data) {
          const validate = RankingSchema.safeParse(anime)
          if (validate.success) {
            animes.push(validate.data)
          }
        }
      }

      return {
        error: null,
        isLoading: false,
        data: animes.slice(0, 5),
      }
    })
  }

  getAnimesByPopularity = async (): ServiceResponse<Ranking[]> => {
    return fetchData<MultipleResponse>(`${this.api}/anime?order_by=popularity`, {
      next: { revalidate: REVALIDATE.ONE_DAY },
    }).then((response) => {
      const animes: Ranking[] = []

      if (response.error) {
        return {
          error: response.error,
          isLoading: response.isLoading,
          data: animes,
        }
      }

      if (response.data?.data) {
        for (const anime of response.data.data) {
          const validate = RankingSchema.safeParse(anime)
          if (validate.success) {
            animes.push(validate.data)
          }
        }
      }

      return {
        error: null,
        isLoading: false,
        data: animes.slice(0, 10),
      }
    })
  }
}

export default new Service()
