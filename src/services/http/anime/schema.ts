import { z } from 'zod'

export const ImageSchema = z.object({
  image_url: z.union([z.null(), z.string()]).optional(),
  small_image_url: z.union([z.null(), z.string()]).optional(),
  large_image_url: z.union([z.null(), z.string()]).optional(),
})

export type Image = z.infer<typeof ImageSchema>

export const TitleSchema = z.object({
  type: z.union([z.null(), z.string()]).optional(),
  title: z.union([z.null(), z.string()]).optional(),
})

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
    titles: z.array(TitleSchema),
    episodes: z.union([z.null(), z.number()]).optional(),
    score: z.union([z.number(), z.null()]).optional(),
    synopsis: z.union([z.null(), z.string()]).optional(),
    year: z.union([z.number(), z.null()]).optional(),
  })
  .transform((data) => ({
    id: data.mal_id,
    image:
      data.images?.webp?.image_url || data.images?.jpg?.image_url || '/placeholder.png',
    title: data.titles[0].title || data.title,
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

export const ItemsSchema = z.object({
  count: z.number(),
  total: z.number(),
  per_page: z.number(),
})
export type Items = z.infer<typeof ItemsSchema>

export const PaginationSchema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
  current_page: z.number(),
  items: ItemsSchema,
})

export type PaginationResponse = z.input<typeof PaginationSchema>

export type MultipleResponse = {
  data: z.input<typeof MultipleAnimesSchema>
  pagination: PaginationResponse
}

export type Anime = z.output<typeof AnimeSchema>

const AnimeChunksSchema = z.array(
  z.object({
    animes: MultipleAnimesSchema,
  }),
)

export type AnimeChunks = z.infer<typeof AnimeChunksSchema>

const AnimeByTitleSchema = z.object({
  pagination: z.object({
    has_next_page: z.boolean(),
    current_page: z.number(),
  }),
  data: MultipleAnimesSchema,
  isLoading: z.boolean(),
  error: z.union([z.null(), z.string()]),
})

export type AnimeByTitle = z.infer<typeof AnimeByTitleSchema>
