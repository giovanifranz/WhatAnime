import { Anime } from '@/store/schema'

type AnimeChunk = {
  animes: Anime[]
  current_page: number
}

export type ListChunk = AnimeChunk[]

export function listChunk(animes: Anime[]): ListChunk {
  const animesChunks: ListChunk = []
  let count = 0

  for (let i = 0; i < animes.length; i += 4) {
    for (let j = 1; j < 4; j += 4) {
      count += 1
    }

    const newArraySortedAnimes = animes.slice(i, i + 4)

    if (newArraySortedAnimes.length < 4) {
      break
    }

    animesChunks.push({
      animes: newArraySortedAnimes,
      current_page: count,
    })
  }

  return animesChunks
}
