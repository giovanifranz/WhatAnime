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

export const onePieceMock: Anime = {
  id: 21,
  image: 'https://cdn.myanimelist.net/images/anime/6/73245.webp',
  title: 'One Piece',
  episodes: null,
  synopsis: 'Gol D. Roger was known as the "Pirate King',
  year: 1999,
  score: 8.7,
}

export const getAnimesByTitleMock = {
  data: {
    data: [
      {
        id: 20,
        image: 'https://cdn.myanimelist.net/images/anime/13/17405.webp',
        title: 'Naruto',
        episodes: 220,
        synopsis: "Moments prior to Naruto Uzumaki's birth",
        year: 2002,
        score: 7.99,
      },
      {
        id: 16870,
        image: 'https://cdn.myanimelist.net/images/anime/1491/134498.webp',
        title: 'The Last: Naruto the Movie',
        episodes: 1,
        synopsis: 'Two years have passed since the end of the Fourth Great Ninja War.',
        year: null,
        score: 7.79,
      },
    ],
    pagination: {
      has_next_page: true,
      current_page: 1,
    },
  },
}
