import { z } from 'zod'

export const ImageSchema = z.object({
  image_url: z.union([z.null(), z.string()]).optional(),
  small_image_url: z.union([z.null(), z.string()]).optional(),
  large_image_url: z.union([z.null(), z.string()]).optional(),
})

export type Image = z.infer<typeof ImageSchema>
export const AnimeSchema = z
  .object({
    mal_id: z.number(),
    images: z
      .union([
        z.null(),
        z.object({
          jpg: z.union([z.null(), ImageSchema]).optional(),
          webp: z.union([z.null(), ImageSchema]).optional(),
        }),
      ])
      .optional(),
    title: z.string(),
    episodes: z.union([z.null(), z.number()]).optional(),
    score: z.union([z.number(), z.null()]).optional(),
    synopsis: z.union([z.null(), z.string()]).optional(),
    year: z.union([z.number(), z.null()]).optional(),
  })
  .transform((data) => ({
    id: data.mal_id,
    image:
      data.images?.webp?.image_url || data.images?.jpg?.image_url || '/placeholder.png',
    title: data.title,
    episodes: data.episodes || null,
    synopsis: data.synopsis || null,
    year: data.year || null,
    score: data.score || null,
  }))

const MultipleAnimesSchema = z.array(AnimeSchema)

export const RankingSchema = z
  .object({ mal_id: z.number(), title: z.string() })
  .transform((data) => ({
    id: data.mal_id,
    title: data.title,
  }))

export type Ranking = z.output<typeof RankingSchema>

export type SingleResponse = {
  data: z.input<typeof AnimeSchema>
}

export type MultipleResponse = {
  data: z.input<typeof MultipleAnimesSchema>
}

export type Anime = z.output<typeof AnimeSchema>

const ChunksSchema = z.array(
  z.object({
    animes: MultipleAnimesSchema,
    page: z.number(),
  }),
)

export type AnimeChunks = z.infer<typeof ChunksSchema>

export type AnimeByTitle = {
  anime: Anime
  othersAnimes: AnimeChunks
}
