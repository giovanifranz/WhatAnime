import { AnimeService } from '@/services/http'
import { vi } from 'vitest'

import { animeStore, initialState } from './animeStore'
import { bleachMock, narutoMock, getAnimesByTitleMock } from './mock/mock'

vi.mock('@/services/http/anime', () => {
  return {
    default: {
      getAnimeById: vi.fn(),
      getAnimeRandom: vi.fn(),
      getAnimesByTitle: vi.fn(),
    },
  }
})

describe('Teste unitário - animeStore', () => {
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
      expect(byId).toBe(narutoMock)
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
      expect(byId).toBe(bleachMock)
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
      expect(byId).toBe(narutoMock)
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
      expect(random).toBe(narutoMock)
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
      expect(random).toBe(bleachMock)
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
      vi.spyOn(AnimeService, 'getAnimesByTitle').mockImplementationOnce(
        async () => getAnimesByTitleMock,
      )
      const { getAnimesByTitle } = animeStore.getState()
      await getAnimesByTitle(getAnimesByTitleMock.anime.title)

      const { byTitle } = animeStore.getState()

      expect(AnimeService.getAnimesByTitle).toHaveBeenCalledTimes(1)
      expect(byTitle).toBe(getAnimesByTitleMock)
    })

    it('Titulo deve ter pelo menos três caracteres', async () => {
      const { getAnimesByTitle } = animeStore.getState()
      await getAnimesByTitle('ab')

      const { byTitle } = animeStore.getState()

      expect(AnimeService.getAnimesByTitle).not.toHaveBeenCalled()
      expect(byTitle).toBeNull()
    })

    it('Deve retornar nulo em caso de response invalido', async () => {
      vi.spyOn(AnimeService, 'getAnimesByTitle').mockImplementationOnce(async () => null)

      const { getAnimesByTitle } = animeStore.getState()

      await getAnimesByTitle('naruto')

      const { byTitle } = animeStore.getState()

      expect(AnimeService.getAnimesByTitle).toHaveBeenCalledTimes(1)
      expect(byTitle).toBeNull()
    })

    it('Não Deve atualizar caso já possua na store anime com mesmo nome', async () => {
      animeStore.setState({ byTitle: getAnimesByTitleMock })
      const { byTitle, getAnimesByTitle } = animeStore.getState()
      await getAnimesByTitle('naruto')

      expect(AnimeService.getAnimesByTitle).not.toHaveBeenCalled()
      expect(byTitle).toBe(getAnimesByTitleMock)
    })
  })
})
