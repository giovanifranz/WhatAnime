import { Suspense, type HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { Card } from '../ui/card'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export default function Root({ className, children, ...rest }: Props) {
  return (
    <Card className={cn('max-w-4xl border-none', className)} {...rest}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </Card>
  )
}
