import { rest } from 'msw'
import { setupServer } from 'msw/node'

import service, { baseUrl } from './'
import singleQuote from './mock/single-quote.json'

export const handlers = [
  rest.get(`${baseUrl}/random`, (_, res, ctx) => {
    return res(ctx.delay(300), ctx.status(200), ctx.json(singleQuote))
  }),
]

const server = setupServer(...handlers)

describe('Quote Service', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  describe(service.getRandomQuote.name, () => {
    it('Deve uma quote corretamente', async () => {
      const response = await service.getRandomQuote()

      expect(response!.title).toBe(singleQuote.anime)
      expect(response!.character).toBe(singleQuote.character)
      expect(response!.quote).toBe(singleQuote.quote)
    })

    it('Deve retornar nulo em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/random`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.json({ invalidData: true }))
        }),
      )

      const quote = await service.getRandomQuote()
      expect(quote).toBeNull()
    })

    it('Deve retornar nulo em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/random`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.status(500))
        }),
      )

      const quote = await service.getRandomQuote()
      expect(quote).toBeNull()
    })
  })
})
