import { ERROR } from '@/common/enum'
import { bleachMock, narutoMock, getAnimesByTitleMock } from '@/mocks'
import { AnimeService } from '@/services/http'
import { vi } from 'vitest'

import { fetchData } from '@/lib/fetchData'

import { animeStore, initialState } from './animeStore'

vi.mock('@/services/http/anime', () => {
  return {
    default: {
      getAnimeById: vi.fn(),
      getAnimeRandom: vi.fn(),
      getAnimesByTitle: vi.fn(),
    },
  }
})

vi.mock('@/lib/fetchData', () => ({
  fetchData: vi.fn(),
}))

describe('Teste Unitário - animeStore', () => {
  beforeEach(() => {
    animeStore.setState(initialState)
  })

  it('Deve retornar o estado inicial', () => {
    const store = animeStore.getState()

    expect(store.animeQuote).toBe(initialState.animeQuote)
    expect(store.byId).toBe(initialState.byId)
    expect(store.byTitle).toBe(initialState.byTitle)
    expect(store.byAiring).toBe(initialState.byAiring)
    expect(store.byPopularity).toBe(initialState.byPopularity)
    expect(store.random).toBe(initialState.random)
  })

  describe('getAnimesById', () => {
    it('Deve atualizar a store', async () => {
      const mock = {
        data: narutoMock,
        isLoading: false,
        error: null,
      }
      vi.spyOn(AnimeService, 'getAnimeById').mockImplementationOnce(async () => mock)

      const { getAnimeById } = animeStore.getState()
      await getAnimeById(narutoMock.id)

      const { byId } = animeStore.getState()

      expect(AnimeService.getAnimeById).toHaveBeenCalledTimes(1)
      expect(byId).toStrictEqual(mock)
    })

    it('Deve atualizar caso anime da store possua outro id', async () => {
      const firstMock = {
        data: narutoMock,
        isLoading: false,
        error: null,
      }

      const secondMock = {
        data: bleachMock,
        isLoading: false,
        error: null,
      }

      vi.spyOn(AnimeService, 'getAnimeById').mockImplementationOnce(async () => firstMock)
      animeStore.setState({ byId: secondMock })

      const { getAnimeById } = animeStore.getState()
      await getAnimeById(firstMock.data.id)

      const { byId } = animeStore.getState()

      expect(AnimeService.getAnimeById).toHaveBeenCalledTimes(1)
      expect(byId).toStrictEqual(firstMock)
    })

    it('Deve retornar error e data nulo em caso de response invalido', async () => {
      const mock = {
        data: null,
        isLoading: false,
        error: ERROR.NOT_FOUND,
      }
      vi.spyOn(AnimeService, 'getAnimeById').mockImplementationOnce(async () => mock)

      const { getAnimeById } = animeStore.getState()

      await getAnimeById(21)

      const { byId } = animeStore.getState()

      expect(AnimeService.getAnimeById).toHaveBeenCalledTimes(1)

      expect(byId).toStrictEqual(mock)
    })

    it('Não Deve atualizar caso já possua na store anime com mesmo id', async () => {
      const mock = {
        data: narutoMock,
        isLoading: false,
        error: null,
      }
      animeStore.setState({ byId: mock })

      const { byId, getAnimeById } = animeStore.getState()
      await getAnimeById(mock.data.id)

      expect(AnimeService.getAnimeById).not.toHaveBeenCalled()
      expect(byId).toStrictEqual(mock)
    })
  })

  describe('getAnimeRandom', () => {
    it('Deve atualizar a store', async () => {
      const mock = {
        data: narutoMock,
        isLoading: false,
        error: null,
      }

      vi.spyOn(AnimeService, 'getAnimeRandom').mockImplementationOnce(async () => mock)
      const { getAnimeRandom } = animeStore.getState()
      await getAnimeRandom()

      const { random } = animeStore.getState()

      expect(AnimeService.getAnimeRandom).toHaveBeenCalledTimes(1)
      expect(random).toStrictEqual(mock)
    })

    it('Deve atualizar mesmo que já exista um random na store', async () => {
      const firstMock = {
        data: narutoMock,
        isLoading: false,
        error: null,
      }

      const secondMock = {
        data: bleachMock,
        isLoading: false,
        error: null,
      }

      vi.spyOn(AnimeService, 'getAnimeRandom').mockImplementationOnce(
        async () => firstMock,
      )
      animeStore.setState({ random: secondMock })

      const { getAnimeRandom } = animeStore.getState()
      await getAnimeRandom()

      const { random } = animeStore.getState()
      expect(AnimeService.getAnimeRandom).toHaveBeenCalledTimes(1)
      expect(random).toStrictEqual(firstMock)
    })

    it('Deve retornar error e data nulo em caso de response invalido', async () => {
      const mock = {
        data: null,
        isLoading: false,
        error: ERROR.NOT_FOUND,
      }
      vi.spyOn(AnimeService, 'getAnimeRandom').mockImplementationOnce(async () => mock)

      const { getAnimeRandom } = animeStore.getState()

      await getAnimeRandom()

      const { random } = animeStore.getState()

      expect(AnimeService.getAnimeRandom).toHaveBeenCalledTimes(1)
      expect(random).toStrictEqual(mock)
    })
  })

  describe('getAnimesByTitle', () => {
    it('Deve atualizar a store', async () => {
      const mock = {
        data: getAnimesByTitleMock,
        error: null,
        isLoading: false,
      }

      const fetcher = fetchData as any
      fetcher.mockResolvedValue(mock)

      const { getAnimesByTitle } = animeStore.getState()

      await getAnimesByTitle('Bleach')

      const { byTitle } = animeStore.getState()

      expect(fetchData).toHaveBeenCalledTimes(1)
      expect(byTitle).toStrictEqual(mock)
    })

    it('Deve retornar nulo em caso de response invalido', async () => {
      const mock = {
        data: null,
        error: ERROR.NOT_FOUND,
        isLoading: false,
      }

      const fetcher = fetchData as any
      fetcher.mockResolvedValue(mock)

      const { getAnimesByTitle } = animeStore.getState()

      await getAnimesByTitle('naruto')

      const { byTitle } = animeStore.getState()

      expect(fetcher).toHaveBeenCalledTimes(1)
      expect(byTitle).toStrictEqual(mock)
    })

    it('Não Deve atualizar caso já possua na store anime com mesmo nome', async () => {
      const mock = {
        data: getAnimesByTitleMock,
        isLoading: false,
        error: null,
      }

      const fetcher = fetchData as any
      fetcher.mockResolvedValue(mock)

      animeStore.setState({ byTitle: mock })
      const { byTitle, getAnimesByTitle } = animeStore.getState()
      await getAnimesByTitle('Naruto')

      expect(fetcher).not.toHaveBeenCalled()
      expect(byTitle).toStrictEqual(mock)
    })
  })
})
