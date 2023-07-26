import type { HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export function Ranking({ className, children, ...rest }: Props) {
  return (
    <section
      className={cn('bg-neutral-700 rounded-lg min-h-fit', className)}
      {...rest}
    >
      <h2 className="scroll-m-20 rounded-t-lg bg-yellow-400 p-2 text-center text-2xl font-semibold uppercase tracking-tight text-neutral-800 md:text-3xl">
        Top Airing
      </h2>
      <ul className="flex list-decimal flex-col items-center justify-center gap-2 p-4">
        {children}
      </ul>
    </section>
  )
}
