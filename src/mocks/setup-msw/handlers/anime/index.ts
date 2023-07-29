import { baseUrl } from '@/services/http/anime'
import type { SingleResponse, MultipleResponse } from '@/services/http/anime/schema'
import { rest, type RequestHandler } from 'msw'

import multipleAnimes from './multiple.json'
import singleAnime from './single.json'

export const handlers: RequestHandler[] = [
  rest.get<SingleResponse>(`${baseUrl}/anime/:id`, (_, res, ctx) => {
    return res(ctx.delay(100), ctx.status(200), ctx.json(singleAnime))
  }),

  rest.get<SingleResponse>(`${baseUrl}/random/anime`, (_, res, ctx) => {
    return res(ctx.delay(100), ctx.status(200), ctx.json(singleAnime))
  }),

  rest.get<MultipleResponse>(`${baseUrl}/anime`, (req, res, ctx) => {
    if (req.url.searchParams.get('q')) {
      return res(ctx.delay(100), ctx.status(200), ctx.json(multipleAnimes))
    }
  }),
]
