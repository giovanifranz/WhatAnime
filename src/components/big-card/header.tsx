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
    <UiCardHeader className="flex flex-row items-start justify-between p-0 md:flex-row">
      <div className="justify-between gap-4 md:flex md:items-center">
        <div className="flex flex-col p-0 md:w-80">
          <CardTitle className="truncate text-lg">{title}</CardTitle>
          <span>Episodes: {episodes}</span>
        </div>
        {width >= 768 && score ? (
          <div className=" flex flex-col items-center">
            <Badge>score</Badge>
            <span>{score}</span>
          </div>
        ) : null}
      </div>
      {
        <Button asChild>
          <Link href={`/anime/${id}`}>
            {width < 768 ? <ImArrowRight2 size={20} /> : 'Go to Page'}
          </Link>
        </Button>
      }
    </UiCardHeader>
  )
}
