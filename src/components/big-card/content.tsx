import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

import type { Anime } from '@/services/http/anime/schema'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

type Props = Anime

function Component({ id, title, image, episodes, score, synopsis }: Props) {
  return (
    <article className="flex h-64 rounded-lg bg-neutral-700 text-neutral-50">
      <div className="relative w-56 rounded-l-lg border-r-2">
        <Image src={image} alt={title} fill />
      </div>
      <div className="w-full p-4">
        <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <CardHeader className="flex w-80 flex-col p-0">
              <CardTitle className="truncate text-lg">{title}</CardTitle>
              <span>Episodes: {episodes}</span>
            </CardHeader>
            {score && (
              <div className=" flex flex-col items-center">
                <Badge>score</Badge>
                <span>{score}</span>
              </div>
            )}
          </div>
          <Button asChild>
            <Link href={`/anime/${id}`}>Go to Page</Link>
          </Button>
        </CardContent>
        {synopsis && (
          <>
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50">
              {synopsis}
            </CardDescription>
          </>
        )}
      </div>
    </article>
  )
}

export const Content = memo(Component)
Content.displayName = 'Content'
