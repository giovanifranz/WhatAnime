export interface MultipleAnimes {
  pagination: Pagination
  data: Anime[]
}

export interface SingleAnime {
  data: Anime
}

export interface Anime {
  mal_id: number
  url: string
  images: { webp: Image; jpg: Image }
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: null | string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string | null
  episodes: number | null
  status: string | null
  airing: boolean
  aired: Aired
  duration: string
  rating: string | null
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number
  members: number
  favorites: number
  synopsis: null | string
  background: null | string
  season: null | string
  year: number | null
}

export interface Aired {
  from: Date | null
  to: Date | null
  prop: Prop
  string: string
}

export interface Prop {
  from: From
  to: From
}

export interface From {
  day: number | null
  month: number | null
  year: number | null
}

export interface Broadcast {
  day: null | string
  time: null | string
  timezone: null | string
  string: null | string
}

export interface Image {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Title {
  type: string
  title: string
}

export interface Trailer {
  youtube_id: null | string
  url: null | string
  embed_url: null | string
  images: Images
}

export interface Images {
  image_url: null | string
  small_image_url: null | string
  medium_image_url: null | string
  large_image_url: null | string
  maximum_image_url: null | string
}

export interface Pagination {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: Items
}

export interface Items {
  count: number
  total: number
  per_page: number
}
