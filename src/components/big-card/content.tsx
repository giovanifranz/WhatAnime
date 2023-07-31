import Image from 'next/image'
import { memo } from 'react'

import type { Anime } from '@/services/http/anime/schema'

import { CardContent, CardDescription } from '../ui/card'
import CardHeader from './header'

type Props = Pick<Anime, 'id' | 'title' | 'image' | 'episodes' | 'score' | 'synopsis'>

function Component({ id, title, image, episodes, score, synopsis }: Props) {
  return (
    <article className="flex h-64 rounded-lg bg-neutral-700 text-neutral-50">
      <div className="relative w-56 rounded-l-lg border-r-2">
        <Image src={image} alt={title} fill />
      </div>
      <div className="flex w-full flex-col p-2 md:p-4">
        <CardHeader episodes={episodes} id={id} score={score} title={title} />
        {synopsis && (
          <CardContent className="p-0">
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50 ">
              {synopsis}
            </CardDescription>
          </CardContent>
        )}
      </div>
    </article>
  )
}

export const Content = memo(Component)
Content.displayName = 'Content'
