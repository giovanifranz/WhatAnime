import { BigCard, MiniCard, Quote, Ranking, Search } from '@/components'

export default function Home() {
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
      <Ranking className="md:col-span-2">
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
      </Ranking>
      <h2 className="mt-4 scroll-m-20 text-3xl font-semibold uppercase tracking-tight md:col-span-8">
        Results
      </h2>
      <div className="max-w-4xl md:col-span-6">
        <BigCard.Root>
          <BigCard.Fetched />
        </BigCard.Root>
        <div className="mt-4 flex flex-wrap justify-between">
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
        </div>
      </div>
      <Ranking className="md:col-span-2">
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
      </Ranking>
    </section>
  )
}
