import { QuoteService } from '@/services/http'

import Button from './button'
import Skeleton from './skeleton'

export default async function Root() {
  const { data, error, isLoading } = await QuoteService.getRandomQuote()

  if (isLoading || error || !data) return <Skeleton />

  return (
    <div className="relative h-48 rounded-lg bg-yellow-400 p-4 text-neutral-800">
      <p className="mb-2 line-clamp-3">“{data.quote}“</p>

      <div className="absolute bottom-4 left-4 flex w-40 flex-col">
        <span className="truncate font-bold">{data.character}</span>
        <span className="truncate">{data.title}</span>
      </div>

      <Button title={data.title} />
    </div>
  )
}
