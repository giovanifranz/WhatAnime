import { bleachMock, narutoMock, getAnimesByTitleMock } from '@/mocks'
import { AnimeService } from '@/services/http'
import { vi } from 'vitest'

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
      vi.spyOn(AnimeService, 'getAnimeById').mockImplementationOnce(
        async () => narutoMock,
      )
      const { getAnimeById } = animeStore.getState()
      await getAnimeById(narutoMock.id)

      const { byId } = animeStore.getState()

      expect(AnimeService.getAnimeById).toHaveBeenCalledTimes(1)
      expect(byId).toStrictEqual(narutoMock)
    })

    it('Deve atualizar caso anime da store possua outro id', async () => {
      vi.spyOn(AnimeService, 'getAnimeById').mockImplementationOnce(
        async () => bleachMock,
      )
      animeStore.setState({ byId: narutoMock })

      const { getAnimeById } = animeStore.getState()
      await getAnimeById(bleachMock.id)

      const { byId } = animeStore.getState()
      expect(AnimeService.getAnimeById).toHaveBeenCalledTimes(1)
      expect(byId).toStrictEqual(bleachMock)
    })

    it('Deve retornar nulo em caso de response invalido', async () => {
      vi.spyOn(AnimeService, 'getAnimeById').mockImplementationOnce(async () => null)

      const { getAnimeById } = animeStore.getState()

      await getAnimeById(21)

      const { byId } = animeStore.getState()

      expect(AnimeService.getAnimeById).toHaveBeenCalledTimes(1)
      expect(byId).toBeNull()
    })

    it('Não Deve atualizar caso já possua na store anime com mesmo id', async () => {
      animeStore.setState({ byId: narutoMock })
      const { byId, getAnimeById } = animeStore.getState()
      await getAnimeById(21)

      expect(AnimeService.getAnimeById).not.toHaveBeenCalled()
      expect(byId).toStrictEqual(narutoMock)
    })
  })

  describe('getAnimeRandom', () => {
    it('Deve atualizar a store', async () => {
      vi.spyOn(AnimeService, 'getAnimeRandom').mockImplementationOnce(
        async () => narutoMock,
      )
      const { getAnimeRandom } = animeStore.getState()
      await getAnimeRandom()

      const { random } = animeStore.getState()

      expect(AnimeService.getAnimeRandom).toHaveBeenCalledTimes(1)
      expect(random).toStrictEqual(narutoMock)
    })

    it('Deve atualizar mesmo que já exista um random na store', async () => {
      vi.spyOn(AnimeService, 'getAnimeRandom').mockImplementationOnce(
        async () => bleachMock,
      )
      animeStore.setState({ random: narutoMock })

      const { getAnimeRandom } = animeStore.getState()
      await getAnimeRandom()

      const { random } = animeStore.getState()
      expect(AnimeService.getAnimeRandom).toHaveBeenCalledTimes(1)
      expect(random).toStrictEqual(bleachMock)
    })

    it('Deve retornar nulo em caso de response invalido', async () => {
      vi.spyOn(AnimeService, 'getAnimeRandom').mockImplementationOnce(async () => null)

      const { getAnimeRandom } = animeStore.getState()

      await getAnimeRandom()

      const { random } = animeStore.getState()

      expect(AnimeService.getAnimeRandom).toHaveBeenCalledTimes(1)
      expect(random).toBeNull()
    })
  })

  describe('getAnimesByTitle', () => {
    it('Deve atualizar a store', async () => {
      global.fetch = vi.fn().mockImplementationOnce(async () => {
        return {
          ok: true,
          json: async () => {
            return { data: getAnimesByTitleMock }
          },
        }
      })

      const { getAnimesByTitle } = animeStore.getState()

      await getAnimesByTitle('naruto')

      const { byTitle } = animeStore.getState()

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(byTitle).toStrictEqual(getAnimesByTitleMock)
    })

    it('Deve retornar nulo em caso de response invalido', async () => {
      global.fetch = vi.fn().mockImplementationOnce(async () => {
        return {
          ok: false,
        }
      })

      const { getAnimesByTitle } = animeStore.getState()

      await getAnimesByTitle('naruto')

      const { byTitle } = animeStore.getState()

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(byTitle).toBeNull()
    })

    it('Não Deve atualizar caso já possua na store anime com mesmo nome', async () => {
      animeStore.setState({ byTitle: getAnimesByTitleMock })
      const { byTitle, getAnimesByTitle } = animeStore.getState()
      await getAnimesByTitle('naruto')

      expect(global.fetch).not.toHaveBeenCalled()
      expect(byTitle).toStrictEqual(getAnimesByTitleMock)
    })
  })
})
