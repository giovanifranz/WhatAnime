import { z } from 'zod'

const AnimeSchema = z.object({
  id: z.number(),
  image: z.string(),
  title: z.string(),
  episodes: z.union([z.number(), z.null()]),
  synopsis: z.union([z.null(), z.string()]),
  year: z.union([z.number(), z.null()]),
  score: z.union([z.number(), z.null()]),
})

const OthersAnimeSchema = z.object({
  animes: z.array(AnimeSchema),
  page: z.number(),
})

export const ByTitleSchema = z.object({
  anime: AnimeSchema,
  othersAnimes: z.array(OthersAnimeSchema),
})
