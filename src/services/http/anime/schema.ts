import { z } from 'zod'

export const TypeSchema = z.enum(['anime'])
export type Type = z.infer<typeof TypeSchema>

export const ImagesSchema = z.object({
  image_url: z.union([z.null(), z.string()]).optional(),
  small_image_url: z.union([z.null(), z.string()]).optional(),
  medium_image_url: z.union([z.null(), z.string()]).optional(),
  large_image_url: z.union([z.null(), z.string()]).optional(),
  maximum_image_url: z.union([z.null(), z.string()]).optional(),
})
export type Images = z.infer<typeof ImagesSchema>

export const TrailerSchema = z.object({
  youtube_id: z.union([z.null(), z.string()]).optional(),
  url: z.union([z.null(), z.string()]).optional(),
  embed_url: z.union([z.null(), z.string()]).optional(),
  images: z.union([ImagesSchema, z.null()]).optional(),
})
export type Trailer = z.infer<typeof TrailerSchema>

export const TitleSchema = z.object({
  type: z.union([z.null(), z.string()]).optional(),
  title: z.union([z.null(), z.string()]).optional(),
})
export type Title = z.infer<typeof TitleSchema>

export const ImageSchema = z.object({
  image_url: z.union([z.null(), z.string()]).optional(),
  small_image_url: z.union([z.null(), z.string()]).optional(),
  large_image_url: z.union([z.null(), z.string()]).optional(),
})
export type Image = z.infer<typeof ImageSchema>

export const DemographicSchema = z.object({
  mal_id: z.union([z.number(), z.null()]).optional(),
  type: z.union([TypeSchema, z.null()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
  url: z.union([z.null(), z.string()]).optional(),
})
export type Demographic = z.infer<typeof DemographicSchema>

export const FromSchema = z.object({
  day: z.union([z.number(), z.null()]).optional(),
  month: z.union([z.number(), z.null()]).optional(),
  year: z.union([z.number(), z.null()]).optional(),
})
export type From = z.infer<typeof FromSchema>

export const PropSchema = z.object({
  from: z.union([FromSchema, z.null()]).optional(),
  to: z.union([FromSchema, z.null()]).optional(),
})
export type Prop = z.infer<typeof PropSchema>

export const AiredSchema = z.object({
  from: z.union([z.null(), z.string()]).optional(),
  to: z.null().optional(),
  prop: z.union([PropSchema, z.null()]).optional(),
  string: z.union([z.null(), z.string()]).optional(),
})
export type Aired = z.infer<typeof AiredSchema>

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
    titles: z.union([z.array(TitleSchema), z.null()]).optional(),
    title: z.string(),
    title_english: z.union([z.null(), z.string()]).optional(),
    title_japanese: z.union([z.null(), z.string()]).optional(),
    type: z.union([z.null(), z.string()]).optional(),
    source: z.union([z.null(), z.string()]).optional(),
    episodes: z.union([z.null(), z.number()]).optional(),
    status: z.union([z.null(), z.string()]).optional(),
    airing: z.union([z.boolean(), z.null()]).optional(),
    aired: z.union([AiredSchema, z.null()]).optional(),
    duration: z.union([z.null(), z.string()]).optional(),
    rating: z.union([z.null(), z.string()]).optional(),
    score: z.union([z.number(), z.null()]).optional(),
    scored_by: z.union([z.number(), z.null()]).optional(),
    rank: z.union([z.number(), z.null()]).optional(),
    popularity: z.union([z.number(), z.null()]).optional(),
    members: z.union([z.number(), z.null()]).optional(),
    favorites: z.union([z.number(), z.null()]).optional(),
    synopsis: z.union([z.null(), z.string()]).optional(),
    season: z.union([z.null(), z.string()]).optional(),
    year: z.union([z.number(), z.null()]).optional(),
  })
  .transform((data) => ({
    id: data.mal_id,
    image:
      data.images?.webp?.image_url ||
      data.images?.jpg?.image_url ||
      '/placeholder.png',
    title: data.title,
    episodes: data.episodes || null,
    synopsis: data.synopsis || null,
    year: data.year || null,
    score: data.score || null,
  }))

const MultipleAnimesSchema = z.array(AnimeSchema)

export const RankingSchema = z
  .object({
    mal_id: z.number(),
    title: z.string(),
  })
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
