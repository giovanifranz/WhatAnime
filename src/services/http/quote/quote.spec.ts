import singleQuote from '@/mocks/setup-msw/handlers/quote/single-quote.json'
import { server } from '@/mocks/setup-msw/server'
import { rest } from 'msw'

import service, { baseUrl } from './'

describe('Teste de Integração - Quote Service', () => {
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
