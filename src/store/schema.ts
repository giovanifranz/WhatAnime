import { z } from 'zod'

import { DataResponse } from '@/lib/fetchData'

export const PaginationSchema = z.object({
  has_next_page: z.boolean(),
  current_page: z.number(),
})
export type Pagination = z.infer<typeof PaginationSchema>

export const AnimeSchema = z.object({
  id: z.number(),
  image: z.string(),
  title: z.string(),
  episodes: z.union([z.number(), z.null()]),
  synopsis: z.union([z.null(), z.string()]),
  year: z.union([z.number(), z.null()]),
  score: z.union([z.number(), z.null()]),
})
export type Anime = z.infer<typeof AnimeSchema>

export const ByTitleSchema = z.object({
  data: z.array(AnimeSchema),
  pagination: PaginationSchema,
})

export interface InternalByTitleResponse extends DataResponse<Anime[]> {
  pagination: Pagination
}
