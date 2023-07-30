import { Suspense, type HtmlHTMLAttributes } from 'react'

import { QuoteService } from '@/services/http'

import { cn } from '@/lib/utils'

import Button from './button'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export async function Quote({ className, ...rest }: Props) {
  const { data, error, isLoading } = await QuoteService.getRandomQuote()

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>Error ...</p>
  if (!data) return <p>Not found</p>

  return (
    <div
      className={cn(
        'relative h-full min-h-[168px] rounded-lg bg-yellow-400 p-4 text-neutral-800',
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
