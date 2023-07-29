import { ERROR } from '@/common/enum'
import { quoteMock } from '@/mocks'
import { server } from '@/mocks/setup-msw/server'
import { rest } from 'msw'

import service, { baseUrl } from './'

describe('Teste de Integração - Quote Service', () => {
  describe(service.getRandomQuote.name, () => {
    it('Deve uma quote corretamente', async () => {
      const response = await service.getRandomQuote()

      expect(response.data).toStrictEqual(quoteMock)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/random`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.json({ invalidData: true }))
        }),
      )

      const response = await service.getRandomQuote()
      expect(response.data).toBeNull()
      expect(response.error).toEqual(ERROR.PARSING)
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/random`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.status(500))
        }),
      )

      const response = await service.getRandomQuote()
      expect(response.data).toBeNull()
      expect(response.error).toEqual(ERROR.FETCHING)
      expect(response.isLoading).toBeFalsy()
    })
  })
})
