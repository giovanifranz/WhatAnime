import Image from 'next/image'
import type { HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export function BigCard({ className, ...rest }: Props) {
  return (
    <Card className={cn('max-w-4xl', className)} {...rest}>
      <article className="flex rounded-lg bg-neutral-700 text-neutral-50">
        <Image
          className="hidden w-48 rounded-l-lg border-r-2 md:block"
          src="https://cdn.myanimelist.net/images/anime/13/17405.webp"
          alt="Naruto"
          width={400}
          height={600}
        />
        <div className="w-full p-4">
          <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
            <div className="hidden items-center justify-between gap-4 md:flex">
              <CardHeader className="flex flex-col p-0">
                <CardTitle className="text-lg">Naruto (2006)</CardTitle>
                <span>Episodes: 256</span>
              </CardHeader>
              <div className=" flex flex-col items-center">
                <Badge>score</Badge>
                <span>8.5</span>
              </div>
            </div>
            <Button>Go to Page</Button>
          </CardContent>
          <div className="">
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </CardDescription>
          </div>
        </div>
      </article>
    </Card>
  )
}
