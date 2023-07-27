import type { HtmlHTMLAttributes } from 'react'

import { AnimeService } from '@/services/http'

import { cn } from '@/lib/utils'

import ListItem from './item'

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  type: 'airing' | 'popular'
}

const rankingMap = {
  airing: {
    getAnimes: AnimeService.getAnimesByAiring,
    heading: 'Top Airing',
  },
  popular: {
    getAnimes: AnimeService.getAnimesByPopularity,
    heading: 'Most Popular',
  },
} as const

export async function Ranking({ className, type, ...rest }: Props) {
  const { getAnimes, heading } = rankingMap[type]

  const data = await getAnimes()

  return (
    <section
      className={cn(
        'bg-neutral-700 rounded-lg min-h-fit hidden lg:flex flex-col',
        className,
      )}
      {...rest}
    >
      <h2 className="scroll-m-20 rounded-t-lg bg-yellow-400 p-2 text-center text-2xl font-semibold uppercase tracking-tight text-neutral-800 md:text-3xl">
        {heading}
      </h2>

      <ul className="flex h-full flex-col items-center justify-center gap-3 p-4">
        {data.map(({ id, title }, index) => (
          <ListItem key={id} id={id} title={title} index={index} />
        ))}
      </ul>
    </section>
  )
}
