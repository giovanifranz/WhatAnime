import { BigCard } from "@/components/big-card";
import { MiniCard } from "@/components/mini-card";
import { Quote } from "@/components/quote";
import { Ranking } from "@/components/ranking";
import { Search } from "@/components/search";

export default function Home() {
  return (
    <section className="grid grid-cols-1 p-4 md:grid-cols-8 gap-4">
      <Search className="md:col-span-6" />
      <Quote className="md:col-span-2" />
      <h2 className="md:col-span-8 uppercase scroll-m-20 text-3xl font-semibold tracking-tight">
        Anime of the day
      </h2>
      <BigCard className="md:col-span-6" />
      <Ranking className="md:col-span-2">
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
        <li>teste</li>
      </Ranking>
      <h2 className="mt-4 md:col-span-8 uppercase scroll-m-20 text-3xl font-semibold tracking-tight">
        Results
      </h2>
      <div className="md:col-span-6 max-w-4xl">
        <BigCard />
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
  );
}
