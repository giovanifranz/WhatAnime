import { z } from 'zod'

export const QuoteSchema = z
  .object({
    anime: z.string(),
    character: z.string(),
    quote: z.string(),
  })
  .transform((data) => ({
    title: data.anime,
    character: data.character,
    quote: data.quote,
  }))

export type QuoteResponse = z.input<typeof QuoteSchema>
export type Quote = z.output<typeof QuoteSchema>
