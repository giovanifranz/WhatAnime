import { HtmlHTMLAttributes } from 'react'
import { Suspense } from 'react'
import { ImArrowRight2 } from 'react-icons/im'

import { getRandomQuote } from '@/services/quote'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export async function Quote({ className, ...rest }: Props) {
  const { anime, character, quote } = await getRandomQuote()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={cn(
          'relative h-full min-h-[168px] rounded-lg bg-yellow-400 p-4 text-neutral-800',
          className,
        )}
        {...rest}
      >
        <p className="mb-2 line-clamp-3">{quote}</p>

        <div className="absolute bottom-4 left-4 flex w-[200px] flex-col">
          <span className="truncate font-bold">{character}</span>
          <span className="truncate">{anime}</span>
        </div>

        <Button className="absolute bottom-4 right-4">
          <ImArrowRight2 size={20} />
        </Button>
      </div>
    </Suspense>
  )
}
