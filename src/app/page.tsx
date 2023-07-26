import { Suspense } from 'react'

import {
  BigCard,
  Quote,
  Ranking,
  Search,
  Results,
  ResultHeading,
} from '@/components'

export default async function Home() {
  return (
    <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-8">
      <Search className="col-span-6" />
      <Suspense fallback={<div>Loading...</div>}>
        <Quote className="col-span-2 col-start-7" />
      </Suspense>

      <h2 className="col-span-8 h-10 text-3xl font-semibold uppercase tracking-tight">
        Anime of the day
      </h2>

      <BigCard.Root className="col-span-6">
        <BigCard.Today />
      </BigCard.Root>

      <Suspense fallback={<div>Loading...</div>}>
        <Ranking className="col-span-2 col-start-7" type="airing" />
      </Suspense>

      <ResultHeading />

      <Results className="col-span-6 col-start-1" />

      <Suspense fallback={<div>Loading...</div>}>
        <Ranking className="col-span-2 col-start-7" type="popular" />
      </Suspense>
    </section>
  )
}
