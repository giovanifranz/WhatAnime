import { AnimeService } from '@/services/http'
import { vi } from 'vitest'

import { animeStore, initialState } from './animeStore'
import { bleachMock, narutoMock } from './mock/mock'

vi.mock('@/services/http/anime', () => {
  return {
    default: {
      getAnimeById: vi.fn(),
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

    it('Deve atualizar caso anime da store possua outro id id', async () => {
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

    it('Deve retornar nulo em caso de valor invalido', async () => {
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
})
