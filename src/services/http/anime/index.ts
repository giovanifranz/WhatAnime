import { ONE_DAY, logger } from '@/lib/utils'

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

  getAnimesByTitle = async (title: string): Promise<AnimeByTitle | null> => {
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

        return this.sortByScoreDescending(animes)
      })
      .catch((err) => {
        logger.error(err)
        return null
      })
  }

  getAnimeById = async (id: number): Promise<Anime | null> => {
    return fetch(`${this.api}/anime/${id}`)
      .then(async (res) => {
        const { data }: SingleResponse = await res.json()
        const validate = await AnimeSchema.safeParseAsync(data)

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
      next: { revalidate: ONE_DAY },
    })
      .then(async (res) => {
        const { data }: SingleResponse = await res.json()
        const validate = await AnimeSchema.safeParseAsync(data)

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
    return fetch(`${this.api}/anime?order_by=score&status=airing&&sort=desc`, {
      next: { revalidate: ONE_DAY },
    })
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
    return fetch(`${this.api}/anime?order_by=popularity`, {
      next: { revalidate: ONE_DAY },
    })
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
