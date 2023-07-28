import { baseUrl } from '@/services/http/quote'
import type { QuoteResponse } from '@/services/http/quote/schema'
import { type RequestHandler, rest } from 'msw'

import singleQuote from './single-quote.json'

export const handlers: RequestHandler[] = [
  rest.get<QuoteResponse>(`${baseUrl}/random`, (_, res, ctx) => {
    return res(ctx.delay(300), ctx.status(200), ctx.json(singleQuote))
  }),
]
