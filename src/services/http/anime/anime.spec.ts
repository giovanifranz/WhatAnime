import { ERROR } from '@/common/enum'
import { getAnimesByTitleMock, onePieceMock } from '@/mocks'
import { server } from '@/mocks/setup-msw/server'
import { rest } from 'msw'

import service, { baseUrl } from './'

describe('Teste de Integração - Anime Service', () => {
  describe(service.getAnimeById.name, () => {
    it('Deve retornar anime por ID', async () => {
      const response = await service.getAnimeById(21)

      expect(response.data).toStrictEqual(onePieceMock)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime/:id`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.json({ invalidData: true }))
        }),
      )

      const response = await service.getAnimeById(21)
      expect(response.data).toBeNull()
      expect(response.error).toEqual(ERROR.PARSING)
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime/:id`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.status(500))
        }),
      )

      const response = await service.getAnimeById(21)
      expect(response.data).toBeNull()
      expect(response.error).toEqual(ERROR.FETCHING)
      expect(response.isLoading).toBeFalsy()
    })
  })

  describe(service.getAnimesByTitle.name, () => {
    it('Deve retornar animes por título', async () => {
      const response = await service.getAnimesByTitle('Naruto')

      expect(response.data).toStrictEqual(getAnimesByTitleMock)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.json({ invalidData: true }))
        }),
      )

      const response = await service.getAnimesByTitle('Naruto')

      expect(response.data).toBeNull()
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.status(500))
        }),
      )

      const response = await service.getAnimesByTitle('Naruto')

      expect(response.data).toBeNull()
      expect(response.error).toEqual(ERROR.FETCHING)
      expect(response.isLoading).toBeFalsy()
    })
  })

  describe(service.getAnimeRandom.name, () => {
    it('Deve retornar anime aleatório', async () => {
      const response = await service.getAnimeRandom()

      expect(response.data).toStrictEqual(onePieceMock)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/random/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.json({ invalidData: true }))
        }),
      )

      const response = await service.getAnimeRandom()
      expect(response.data).toBeNull()
      expect(response.error).toEqual(ERROR.PARSING)
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar nulo em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/random/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.status(500))
        }),
      )

      const response = await service.getAnimeRandom()
      expect(response.data).toBeNull()
      expect(response.error).toEqual(ERROR.FETCHING)
      expect(response.isLoading).toBeFalsy()
    })
  })

  describe(service.getAnimesByAiring.name, () => {
    it('Deve retornar ranking de animes em exibição', async () => {
      const response = await service.getAnimesByAiring()

      expect(response.data?.length).toEqual(5)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar array vazio de animes em exibição em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.json({ invalidData: true }))
        }),
      )

      const response = await service.getAnimesByAiring()

      expect(response.data?.length).toEqual(0)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar array vazio de animes em exibição em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.status(500))
        }),
      )

      const response = await service.getAnimesByAiring()

      expect(response.data?.length).toEqual(0)
      expect(response.error).toEqual(ERROR.FETCHING)
      expect(response.isLoading).toBeFalsy()
    })
  })

  describe(service.getAnimesByPopularity.name, () => {
    it('Deve retornar ranking de animes por popularidade', async () => {
      const response = await service.getAnimesByPopularity()

      expect(response.data?.length).toEqual(10)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar array vazio de animes por popularidade em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.json({ invalidData: true }))
        }),
      )

      const response = await service.getAnimesByPopularity()

      expect(response.data?.length).toEqual(0)
      expect(response.error).toBeNull()
      expect(response.isLoading).toBeFalsy()
    })

    it('Deve retornar array vazio de animes por popularidade em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(100), ctx.status(500))
        }),
      )

      const response = await service.getAnimesByPopularity()

      expect(response.data?.length).toEqual(0)
      expect(response.error).toEqual(ERROR.FETCHING)
      expect(response.isLoading).toBeFalsy()
    })
  })
})
