import { logger } from '@/lib/utils'

import {
  Anime,
  AnimeSchema,
  SingleResponse,
  MultipleResponse,
  RankingSchema,
  Ranking,
} from './schema'

export const baseUrl = 'https://api.jikan.moe/v4'

class Service {
  private api = baseUrl

  getAnimesByTitle = async (title: string): Promise<Anime[]> => {
    return fetch(`${this.api}/anime?q=${encodeURIComponent(title)}&sfw`)
      .then(async (res) => {
        const { data }: MultipleResponse = await res.json()
        const animes: Anime[] = []

        for (const anime of data) {
          const validate = AnimeSchema.safeParse(anime)
          if (validate.success) {
            animes.push(validate.data)
          }
        }

        return animes
      })
      .catch((err) => {
        logger.error(err)
        return []
      })
  }

  getAnimeById = async (id: number): Promise<Anime | null> => {
    return fetch(`${this.api}/anime/${id}`)
      .then(async (res) => {
        const { data }: SingleResponse = await res.json()
        const validate = AnimeSchema.safeParse(data)

        if (!validate.success) {
          logger.error(validate.error)
          return null
        }

        return validate.data
      })
      .catch((err) => {
        logger.error(err)
        return null
      })
  }

  getAnimeRandom = async (): Promise<Anime | null> => {
    return fetch(`${this.api}/random/anime`, {
      next: { revalidate: 60 * 60 * 24 },
    })
      .then(async (res) => {
        const { data }: SingleResponse = await res.json()
        const validate = AnimeSchema.safeParse(data)

        if (!validate.success) {
          logger.error(validate.error)
          return null
        }

        return validate.data
      })
      .catch((err) => {
        logger.error(err)
        return null
      })
  }

  getAnimesByAiring = async (): Promise<Ranking[]> => {
    return fetch(`${this.api}/anime?order_by=score&status=airing&&sort=desc`)
      .then(async (res) => {
        const { data }: MultipleResponse = await res.json()
        const animes: Ranking[] = []

        for (const anime of data) {
          const validate = RankingSchema.safeParse(anime)
          if (validate.success) {
            animes.push(validate.data)
          }
        }

        return animes.slice(0, 5)
      })
      .catch((err) => {
        logger.error(err)
        return []
      })
  }

  getAnimesByPopularity = async (): Promise<Ranking[]> => {
    return fetch(`${this.api}/anime?order_by=popularity`)
      .then(async (res) => {
        const { data }: MultipleResponse = await res.json()
        const animes: Ranking[] = []

        for (const anime of data) {
          const validate = RankingSchema.safeParse(anime)
          if (validate.success) {
            animes.push(validate.data)
          }
        }

        return animes.slice(0, 10)
      })
      .catch((err) => {
        logger.error(err)
        return []
      })
  }
}

export default new Service()
