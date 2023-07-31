import { AnimeService } from '@/services/http'

import ListItem from './item'

type Props = {
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

export async function Ranking({ type, ...rest }: Props) {
  const { getAnimes, heading } = rankingMap[type]

  const { data, error, isLoading } = await getAnimes()

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>Error ...</p>
  if (!data) return <p>Not found</p>

  return (
    <section
      className="hidden min-h-fit flex-col rounded-lg bg-neutral-700 lg:flex"
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
