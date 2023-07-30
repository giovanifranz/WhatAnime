import { REVALIDATE, CUSTOM_ERROR } from '@/common/enum'
import { catchError, switchMap, map, of, lastValueFrom, from } from 'rxjs'

import { DataResponse, fetchData } from '@/lib/fetchData'

import {
  Anime,
  AnimeSchema,
  SingleResponse,
  MultipleResponse,
  RankingSchema,
  Ranking,
  PaginationSchema,
  AnimeByTitle,
} from './schema'

export const baseUrl = 'https://api.jikan.moe/v4'

type ServiceResponse<T> = Promise<DataResponse<T>>

class Service {
  private api = baseUrl

  async getAnimesByTitle(title: string, page: number = 1): Promise<AnimeByTitle> {
    return await lastValueFrom(
      from(
        fetchData<MultipleResponse>(
          `${this.api}/anime?q=${encodeURIComponent(title)}&page=${page}`,
        ),
      ).pipe(
        switchMap(async ({ data, error, isLoading }) => {
          if (!data && error && !isLoading) {
            throw new Error(CUSTOM_ERROR.NOT_FOUND)
          }

          return data as MultipleResponse
        }),
        map(({ data, pagination }) => {
          const listOfAnimes: Anime[] = []

          for (const anime of data) {
            const validate = AnimeSchema.safeParse(anime)
            if (validate.success) {
              listOfAnimes.push(validate.data)
            }
          }

          return {
            listOfAnimes,
            pagination: PaginationSchema.parse(pagination),
          }
        }),
        map(({ listOfAnimes, pagination }) => {
          return {
            data: listOfAnimes,
            pagination: {
              has_next_page: pagination.has_next_page,
              current_page: pagination.current_page,
            },
            error: null,
            isLoading: false,
          }
        }),
        catchError(() => {
          return of({
            data: [] as Anime[],
            pagination: {
              has_next_page: false,
              current_page: 0,
            },
            error: CUSTOM_ERROR.NOT_FOUND,
            isLoading: false,
          })
        }),
      ),
    )
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
          error: CUSTOM_ERROR.PARSING,
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
          error: CUSTOM_ERROR.PARSING,
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
