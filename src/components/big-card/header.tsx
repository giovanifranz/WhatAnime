'use client'

import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'

import { useWindowSize } from 'usehooks-ts'

import { Anime } from '@/store/schema'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardHeader as UiCardHeader, CardTitle } from '../ui/card'

type Props = Pick<Anime, 'episodes' | 'title' | 'score' | 'id'>

export default function CardHeader({ episodes, title, score, id }: Props) {
  const { width } = useWindowSize()
  return (
    <UiCardHeader className="flex flex-row items-center justify-between p-0">
      <div className="flex h-14 max-w-[280px] flex-col justify-center">
        <CardTitle className="truncate text-lg ">{title}</CardTitle>
        <span>Episodes: {episodes}</span>
      </div>
      <div className="flex h-14 items-center gap-4">
        {width >= 768 && score ? (
          <div className="mt-4 flex h-12 flex-col items-center">
            <Badge>score</Badge>
            <span>{score}</span>
          </div>
        ) : null}
        <Button asChild className="md:w-32">
          <Link href={`/anime/${id}`}>
            {width < 768 ? <ImArrowRight2 size={20} /> : 'Go to Page'}
          </Link>
        </Button>
      </div>
    </UiCardHeader>
  )
}
