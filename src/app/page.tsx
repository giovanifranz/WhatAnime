import { Suspense } from 'react'

import { BigCard, Quote, Ranking, Search, Results, ResultHeading } from '@/components'

export default async function Home() {
  return (
    <section className="grid  grid-cols-2 gap-4  p-4 md:grid-cols-6 lg:grid-cols-8">
      <Search className="col-span-2 md:col-span-6" />

      <Suspense fallback={<div>Loading...</div>}>
        <Quote className="col-span-2 hidden lg:col-start-7 lg:block" />
      </Suspense>

      <h2 className="col-span-2 h-10 text-2xl font-semibold uppercase tracking-tight md:col-span-8 md:text-3xl">
        Anime of the day
      </h2>

      <BigCard.Root className="col-span-2 md:col-span-6">
        <BigCard.Today />
      </BigCard.Root>

      <Suspense fallback={<div>Loading...</div>}>
        <Ranking className="col-span-2 col-start-7 " type="airing" />
      </Suspense>

      <ResultHeading />

      <Results className="col-span-2 col-start-1 h-fit md:col-span-6 md:h-[528px]" />

      <Suspense fallback={<div>Loading...</div>}>
        <Ranking className="col-span-2 col-start-7" type="popular" />
      </Suspense>
    </section>
  )
}
