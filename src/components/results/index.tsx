import dynamic from 'next/dynamic'
import type { HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { BigCard } from '../big-card'

const FetchedCards = dynamic(() => import('./fetched-cards'), { ssr: false })

type Props = HtmlHTMLAttributes<HTMLDivElement>

export function Results({ className, ...rest }: Props) {
  return (
    <div className={cn('h-[512px] max-w-4xl', className)} {...rest}>
      <BigCard.Root>
        <BigCard.Fetched />
      </BigCard.Root>

      <FetchedCards />
    </div>
  )
}
