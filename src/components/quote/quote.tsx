import { Suspense, type HtmlHTMLAttributes } from 'react'

import { QuoteService } from '@/services/http'

import { cn } from '@/lib/utils'

import Button from './button'
import Skeleton from './skeleton'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export default async function Root({ className, ...rest }: Props) {
  const { data, error, isLoading } = await QuoteService.getRandomQuote()

  if (isLoading || error || !data) return <Skeleton />

  return (
    <div
      className={cn(
        'relative h-48 rounded-lg bg-yellow-400 p-4 text-neutral-800',
        className,
      )}
      {...rest}
    >
      <p className="mb-2 line-clamp-3">{data.quote}</p>

      <div className="absolute bottom-4 left-4 flex w-40 flex-col">
        <span className="truncate font-bold">{data.character}</span>
        <span className="truncate">{data.title}</span>
      </div>
      <Suspense>
        <Button title={data.title} />
      </Suspense>
    </div>
  )
}
