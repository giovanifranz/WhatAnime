import { MultipleAnimes } from './type'

const api = 'https://api.jikan.moe/v4'

export const getAnimeByTitle = async (
  title: string,
): Promise<MultipleAnimes> => {
  return fetch(`${api}/anime?q=${title}&sfw`).then((res) => {
    return res.json()
  })
}
