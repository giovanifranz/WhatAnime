'use client'
import Image from 'next/image'

import { useAnimeByNameStore } from '@/store/anime-by-name.store'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export function Fetched() {
  const { anime } = useAnimeByNameStore()

  if (!anime) return null

  return (
    <>
      <Image
        className="hidden w-48 rounded-l-lg border-r-2 md:block"
        src={anime.images.webp.image_url || anime.images.jpg.image_url}
        alt="Naruto"
        width={400}
        height={600}
      />
      <div className="w-full p-4">
        <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <CardHeader className="flex flex-col p-0">
              <CardTitle className="text-lg">
                {anime.title} ({anime.year})
              </CardTitle>
              <span>Episodes: {anime.episodes}</span>
            </CardHeader>
            <div className=" flex flex-col items-center">
              <Badge>score</Badge>
              <span>{anime.score}</span>
            </div>
          </div>
          <Button>Go to Page</Button>
        </CardContent>
        <div className="">
          <h3 className="text-md font-semibold">Synopsis</h3>
          <CardDescription className="text-md line-clamp-5 text-neutral-50">
            {anime.synopsis}
          </CardDescription>
        </div>
      </div>
    </>
  )
}
