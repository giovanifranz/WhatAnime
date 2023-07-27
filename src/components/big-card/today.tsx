import Image from 'next/image'
import Link from 'next/link'

import { AnimeService } from '@/services/http'

import { animeStore } from '@/store/animeStore'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default async function Today() {
  const random = await AnimeService.getAnimeRandom()
  animeStore.setState({ random })

  if (!random) return null

  return (
    <article className="flex h-64 rounded-lg bg-neutral-700 text-neutral-50">
      <div className="relative hidden w-56 rounded-l-lg border-r-2 md:block">
        <Image src={random.image} alt={random.title} fill />
      </div>
      <div className="w-full p-4">
        <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <CardHeader className="flex w-80 flex-col p-0">
              <CardTitle className="truncate text-lg">
                {random.title} {random.year && <>({random.year})</>}
              </CardTitle>
              <span>Episodes: {random.episodes}</span>
            </CardHeader>
            {random.score && (
              <div className=" flex flex-col items-center">
                <Badge>score</Badge>
                <span>{random.score}</span>
              </div>
            )}
          </div>
          <Button asChild>
            <Link href={'/anime/random'}>Go to Page</Link>
          </Button>
        </CardContent>
        {random.synopsis && (
          <>
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50">
              {random.synopsis}
            </CardDescription>
          </>
        )}
      </div>
    </article>
  )
}
