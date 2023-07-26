import { Anime, MultipleAnimes, SingleAnime } from './type'

const api = 'https://api.jikan.moe/v4'

export const getAnimesByTitle = async (
  title: string,
): Promise<MultipleAnimes> => {
  return fetch(`${api}/anime?q=${encodeURIComponent(title)}&sfw`).then(
    (res) => {
      return res.json()
    },
  )
}

export const getAnimeRandom = async (): Promise<SingleAnime> => {
  return fetch(`${api}/random/anime`, {
    next: { revalidate: 60 * 60 * 24 },
  }).then((res) => {
    return res.json()
  })
}

export const getAnimeById = async (id: number): Promise<SingleAnime> => {
  return fetch(`${api}/anime/${id}`).then((res) => {
    return res.json()
  })
}

export const getAnimesByAiring = async (): Promise<Anime[]> => {
  return fetch(`${api}/anime?order_by=score&status=airing&&sort=desc`).then(
    async (res) => {
      const { data }: MultipleAnimes = await res.json()
      return data.slice(0, 5)
    },
  )
}

export const getAnimesByPopularity = async (): Promise<Anime[]> => {
  return fetch(`${api}/anime?order_by=popularity`).then(async (res) => {
    const { data }: MultipleAnimes = await res.json()
    return data.slice(0, 10)
  })
}
