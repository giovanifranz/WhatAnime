import { rest } from 'msw'
import { setupServer } from 'msw/node'

import service, { baseUrl } from './'
import multipleAnimes from './mock/multiple.json'
import randomAnime from './mock/random.json'
import singleAnime from './mock/single.json'

export const handlers = [
  rest.get(`${baseUrl}/anime/:id`, (_, res, ctx) => {
    return res(ctx.delay(300), ctx.status(200), ctx.json(singleAnime))
  }),

  rest.get(`${baseUrl}/random/anime`, (_, res, ctx) => {
    return res(ctx.delay(300), ctx.status(200), ctx.json(randomAnime))
  }),

  rest.get(`${baseUrl}/anime`, (req, res, ctx) => {
    if (req.url.searchParams.get('q')) {
      return res(ctx.delay(300), ctx.status(200), ctx.json(multipleAnimes))
    }
  }),
]

const server = setupServer(...handlers)

describe('Anime Service', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  describe(service.getAnimeById.name, () => {
    it('Deve retornar anime por ID', async () => {
      const response = await service.getAnimeById(21)

      expect(response!.id).toBe(singleAnime.data.mal_id)
      expect(response!.image).toBe(singleAnime.data.images.webp.image_url)
      expect(response!.title).toBe(singleAnime.data.title)
      expect(response!.episodes).toBe(singleAnime.data.episodes)
      expect(response!.synopsis).toBe(singleAnime.data.synopsis)
      expect(response!.year).toBe(singleAnime.data.year)
      expect(response!.score).toBe(singleAnime.data.score)
    })

    it('Deve retornar nulo em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime/:id`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.json({ invalidData: true }))
        }),
      )

      const anime = await service.getAnimeById(21)
      expect(anime).toBeNull()
    })

    it('Deve retornar nulo em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime/:id`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.status(500))
        }),
      )

      const anime = await service.getAnimeById(21)
      expect(anime).toBeNull()
    })
  })

  describe(service.getAnimesByTitle.name, () => {
    it('Deve retornar animes por título', async () => {
      const response = await service.getAnimesByTitle('naruto')
      expect(response.length).toBe(21)
    })

    it('Deve retornar array vazio em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.json({ invalidData: true }))
        }),
      )

      const animes = await service.getAnimesByTitle('naruto')
      expect(animes.length).toBe(0)
    })

    it('Deve retornar array vazio em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.status(500))
        }),
      )

      const animes = await service.getAnimesByTitle('naruto')
      expect(animes.length).toBe(0)
    })
  })

  describe(service.getAnimeRandom.name, () => {
    it('Deve retornar anime aleatório', async () => {
      const response = await service.getAnimeRandom()

      expect(response!.id).toBe(randomAnime.data.mal_id)
      expect(response!.image).toBe(randomAnime.data.images.webp.image_url)
      expect(response!.title).toBe(randomAnime.data.title)
      expect(response!.episodes).toBe(randomAnime.data.episodes)
      expect(response!.synopsis).toBe(randomAnime.data.synopsis)
      expect(response!.year).toBe(randomAnime.data.year)
    })

    it('Deve retornar nulo em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/random/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.json({ invalidData: true }))
        }),
      )

      const anime = await service.getAnimeRandom()
      expect(anime).toBeNull()
    })

    it('Deve retornar nulo em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/random/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.status(500))
        }),
      )

      const anime = await service.getAnimeRandom()
      expect(anime).toBeNull()
    })
  })

  describe(service.getAnimesByAiring.name, () => {
    it('Deve retornar ranking de animes em exibição', async () => {
      const response = await service.getAnimesByAiring()

      expect(response.length).toBe(5)
    })

    it('Deve retornar array vazio de animes em exibição em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.json({ invalidData: true }))
        }),
      )

      const animes = await service.getAnimesByAiring()
      expect(animes.length).toBe(0)
    })

    it('Deve retornar array vazio de animes em exibição em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.status(500))
        }),
      )

      const animes = await service.getAnimesByAiring()
      expect(animes.length).toBe(0)
    })
  })

  describe(service.getAnimesByPopularity.name, () => {
    it('Deve retornar ranking de animes por popularidade', async () => {
      const response = await service.getAnimesByPopularity()

      expect(response.length).toBe(10)
    })

    it('Deve retornar array vazio de animes por popularidade em caso de valor invalido', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.json({ invalidData: true }))
        }),
      )

      const animes = await service.getAnimesByPopularity()
      expect(animes.length).toBe(0)
    })

    it('Deve retornar array vazio de animes por popularidade em caso falha na request', async () => {
      server.use(
        rest.get(`${baseUrl}/anime`, (_, res, ctx) => {
          return res(ctx.delay(300), ctx.status(500))
        }),
      )

      const animes = await service.getAnimesByPopularity()
      expect(animes.length).toBe(0)
    })
  })
})
