import type { Anime } from '@/services/http/anime/schema'

export const narutoMock: Anime = {
  title: 'Naruto',
  id: 21,
  image: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
  episodes: 256,
  synopsis: 'Naruto Uzumaki, um ninja hiperativo e cabeça dura',
  year: 2006,
  score: 8.21,
}

export const bleachMock: Anime = {
  title: 'Bleach',
  id: 22,
  image: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg',
  episodes: 366,
  synopsis: 'Ichigo é um garoto de 15 anos que pode ver, tocar e falar com espíritos.',
  year: 2004,
  score: 7.89,
}
