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

describe('CreateCategory', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it('Deve retornar animes por título', async () => {
    const response = await service.getAnimesByTitle('naruto')
    expect(response.length).toBe(21)
  })

  it('Deve retornar anime por ID', async () => {
    const response = await service.getAnimeById(21)

    expect(response.id).toBe(singleAnime.data.mal_id)
    expect(response.image).toBe(singleAnime.data.images.webp.image_url)
    expect(response.title).toBe(singleAnime.data.title)
    expect(response.episodes).toBe(singleAnime.data.episodes)
    expect(response.synopsis).toBe(singleAnime.data.synopsis)
    expect(response.year).toBe(singleAnime.data.year)
    expect(response.score).toBe(singleAnime.data.score)
  })

  it('Deve retornar anime aleatório', async () => {
    const response = await service.getAnimeRandom()

    expect(response.id).toBe(randomAnime.data.mal_id)
    expect(response.image).toBe(randomAnime.data.images.webp.image_url)
    expect(response.title).toBe(randomAnime.data.title)
    expect(response.episodes).toBe(randomAnime.data.episodes)
    expect(response.synopsis).toBe(randomAnime.data.synopsis)
    expect(response.year).toBe(randomAnime.data.year)
  })

  it('Deve retornar ranking de animes em exibição', async () => {
    const response = await service.getAnimesByAiring()

    expect(response.length).toBe(5)
  })

  it('Deve retornar ranking de animes por popularidade', async () => {
    const response = await service.getAnimesByPopularity()

    expect(response.length).toBe(10)
  })
})
