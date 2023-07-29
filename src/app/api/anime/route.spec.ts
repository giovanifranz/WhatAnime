import { createMocks } from 'node-mocks-http'

import { GET } from './route'

describe('Teste de Integração - Anime Route Handler', () => {
  describe(GET.name, () => {
    it('Deve retornar byTitle anime corretamente', async () => {
      const { req } = createMocks({
        url: 'http://localhost:3000/api/anime?title=naruto',
      })

      const data = await GET(req)

      expect(data.status).toEqual(200)
    })

    it('Deve retornar status 400 em caso de falta de title', async () => {
      const { req } = createMocks({
        url: 'http://localhost:3000/api/anime?title=',
      })

      const data = await GET(req)

      expect(data.status).toEqual(400)
    })
  })
})
