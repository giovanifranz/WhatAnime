import { ERROR } from '@/common/enum'
import { getAnimesByTitleMock } from '@/mocks'
import { AnimeService } from '@/services/http'
import { createMocks } from 'node-mocks-http'
import { vi } from 'vitest'

import { GET } from './route'

describe('Teste de Integração - Anime Route Handler', () => {
  describe(GET.name, () => {
    it('Deve retornar byTitle anime corretamente', async () => {
      const { req } = createMocks({
        url: 'http://localhost:3000/api/anime?title=naruto',
      })

      const data = await GET(req)

      expect(data.status).toEqual(200)
      expect(await data.json()).toStrictEqual(getAnimesByTitleMock)
    })

    it('Deve retornar status 400 em caso de falta de title', async () => {
      const { req } = createMocks({
        url: 'http://localhost:3000/api/anime',
      })

      const data = await GET(req)

      expect(data.status).toEqual(400)
      expect(await data.json()).toStrictEqual(ERROR.MISSING_QUERY_PARAM)
    })

    it('Deve retornar status 404 em caso de falha na resposta', async () => {
      const mock = {
        data: null,
        isLoading: false,
        error: ERROR.NOT_FOUND,
      }
      vi.spyOn(AnimeService, 'getAnimesByTitle').mockImplementationOnce(async () => mock)

      const { req } = createMocks({
        url: 'http://localhost:3000/api/anime?title=bleach',
      })

      const data = await GET(req)

      expect(data.status).toEqual(404)
      expect(await data.json()).toStrictEqual(ERROR.NOT_FOUND)
    })
  })
})
