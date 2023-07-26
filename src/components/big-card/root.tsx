import type { HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { Card } from '../ui/card'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export default function Root({ className, children, ...rest }: Props) {
  return (
    <Card className={cn('max-w-4xl', className)} {...rest}>
      <article className="flex rounded-lg bg-neutral-700 text-neutral-50">
        {children}
      </article>
    </Card>
  )
}
