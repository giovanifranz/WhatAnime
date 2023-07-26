import { Suspense } from 'react'

import { getAnimesByAiring, getAnimesByPopularity } from '@/services/jikan'

import { BigCard, Quote, Ranking, Search, FetchedCards } from '@/components'

import { animeStore } from '@/store/animeStore'

export default async function Home() {
  const [byAiring, byPopularity] = await Promise.all([
    (await getAnimesByAiring()).data.slice(0, 5),
    (await getAnimesByPopularity()).data.slice(0, 10),
  ])

  animeStore.setState({
    byAiring,
    byPopularity,
  })

  return (
    <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-8">
      <Search className="md:col-span-6" />
      <Quote className="md:col-span-2" />
      <h2 className="scroll-m-20 text-3xl font-semibold uppercase tracking-tight md:col-span-8">
        Anime of the day
      </h2>
      <BigCard.Root className="md:col-span-6">
        <BigCard.Today />
      </BigCard.Root>
      <Suspense fallback={<div>Loading...</div>}>
        <Ranking.Root className="md:col-span-2" title="Top Airing">
          {byAiring.map(({ mal_id, title }, index) => (
            <Ranking.Item
              key={mal_id}
              mal_id={mal_id}
              title={title}
              index={index}
            />
          ))}
        </Ranking.Root>
      </Suspense>
      <h2 className="mt-4 scroll-m-20 text-3xl font-semibold uppercase tracking-tight md:col-span-8">
        Results
      </h2>
      <div className="max-w-4xl md:col-span-6">
        <BigCard.Root>
          <BigCard.Fetched />
        </BigCard.Root>
        <FetchedCards />
      </div>
      <Ranking.Root className="md:col-span-2" title="Most Popular">
        {byPopularity.map(({ mal_id, title }, index) => (
          <Ranking.Item
            key={mal_id}
            mal_id={mal_id}
            title={title}
            index={index}
          />
        ))}
      </Ranking.Root>
    </section>
  )
}
