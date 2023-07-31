import {
  BigCard,
  Quote,
  Ranking,
  Search,
  FetchedCards,
  ResultHeading,
} from '@/components'

export default async function Home() {
  return (
    <section className="grid grid-cols-2 gap-4 p-2 md:grid-cols-7 md:p-0">
      {/* CONTAINER 1*/}
      <div className="col-span-2 p-2 md:col-span-5">
        <Search />
      </div>

      <div className="col-span-2 col-start-6 hidden p-2 lg:block">
        <Quote />
      </div>

      {/* CONTAINER 2*/}
      <h2 className="col-span-2 h-12 p-2 text-2xl font-semibold uppercase tracking-tight md:col-span-7 md:text-3xl">
        Anime of the day
      </h2>

      <div className="col-span-2 p-2 md:col-span-5">
        <BigCard.Root>
          <BigCard.Today />
        </BigCard.Root>
      </div>

      <div className="col-span-2 col-start-6 hidden p-2 lg:block">
        <Ranking type="airing" />
      </div>

      {/* CONTAINER 3*/}
      <div className="col-span-2 h-12 p-2 text-2xl font-semibold uppercase tracking-tight md:col-span-7 md:text-3xl">
        <ResultHeading />
      </div>

      <div className="col-span-2 flex min-h-fit flex-col gap-4 p-2 md:col-span-5">
        <BigCard.Root>
          <BigCard.Fetched />
        </BigCard.Root>

        <FetchedCards />
      </div>

      <div className="col-span-2 col-start-6 hidden h-[500px] p-2 lg:block">
        <Ranking type="popular" />
      </div>
    </section>
  )
}
