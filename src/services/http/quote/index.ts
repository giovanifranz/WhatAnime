import { ERROR, REVALIDATE } from '@/common/enum'

import { DataResponse, fetchData } from '@/lib/fetchData'

import { Quote, QuoteResponse, QuoteSchema } from './schema'

export const baseUrl = 'https://animechan.xyz/api'

type ServiceResponse<T> = Promise<DataResponse<T>>

class Service {
  private api = baseUrl

  getRandomQuote = async (): ServiceResponse<Quote> => {
    return await fetchData<QuoteResponse>(`${this.api}/random`, {
      next: { revalidate: REVALIDATE.ONE_DAY },
    }).then((response) => {
      if (response.error) {
        return {
          error: response.error,
          isLoading: response.isLoading,
          data: null,
        }
      }

      const validate = QuoteSchema.safeParse(response.data)

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
}

export default new Service()
