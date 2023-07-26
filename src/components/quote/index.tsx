import type { HtmlHTMLAttributes } from 'react'

import animeService from '@/services/http/anime'
import { getRandomQuote } from '@/services/quote'

import { cn } from '@/lib/utils'

import { animeStore } from '@/store/animeStore'
import { InitializerStore } from '@/store/initializerStore'

import Button from './button'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export async function Quote({ className, ...rest }: Props) {
  const { anime, character, quote } = await getRandomQuote()

  const animeQuote = await animeService
    .getAnimesByTitle(anime)
    .then((data) => data[0])
  animeStore.setState({ animeQuote })

  return (
    <div
      className={cn(
        'relative h-full min-h-[168px] rounded-lg bg-yellow-400 p-4 text-neutral-800',
        className,
      )}
      {...rest}
    >
      <p className="mb-2 line-clamp-3">{quote}</p>

      <div className="absolute bottom-4 left-4 flex w-[200px] flex-col">
        <span className="truncate font-bold">{character}</span>
        <span className="truncate">{anime}</span>
      </div>
      <Button />
      <InitializerStore animeQuote={animeQuote} />
    </div>
  )
}
