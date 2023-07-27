import { logger } from '@/lib/utils'

import { Quote, QuoteResponse, QuoteSchema } from './schema'

export const baseUrl = 'https://animechan.xyz/api'

class Service {
  private api = baseUrl

  getRandomQuote = async (): Promise<Quote | null> => {
    return fetch(`${this.api}/random`, {
      next: { revalidate: 60 * 60 * 24 },
    })
      .then(async (res) => {
        const data: QuoteResponse = await res.json()
        const validate = QuoteSchema.safeParse(data)

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
}

export default new Service()
