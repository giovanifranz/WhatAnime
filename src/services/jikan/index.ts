import { MultipleAnimes, SingleAnime } from './type'

const api = 'https://api.jikan.moe/v4'

export const getAnimesByTitle = async (
  title: string,
): Promise<MultipleAnimes> => {
  return fetch(`${api}/anime?q=${title}&sfw`).then((res) => {
    return res.json()
  })
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

export const getAnimesByAiring = async (): Promise<MultipleAnimes> => {
  return fetch(`${api}/anime?order_by=score&status=airing&&sort=desc`).then(
    (res) => {
      return res.json()
    },
  )
}

export const getAnimesByPopularity = async (): Promise<MultipleAnimes> => {
  return fetch(`${api}/anime?order_by=popularity`).then((res) => {
    return res.json()
  })
}
