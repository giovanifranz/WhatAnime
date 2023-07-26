'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useCallback } from 'react'

import { animeStore } from '@/store/animeStore'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function Fetched() {
  const { byTitle, getAnimeById } = animeStore((store) => ({
    byTitle: store.byTitle,
    getAnimeById: store.getAnimeById,
  }))

  const handleMouseEnter = useCallback(async () => {
    if (!byTitle) return
    await getAnimeById(byTitle.mal_id)
  }, [byTitle, getAnimeById])

  if (!byTitle) return null

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Image
        className="hidden w-48 rounded-l-lg border-r-2 md:block"
        src={byTitle.images.webp.image_url || byTitle.images.jpg.image_url}
        alt="Naruto"
        width={400}
        height={600}
      />
      <div className="w-full p-4">
        <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <CardHeader className="flex flex-col p-0">
              <CardTitle className="text-lg">
                {byTitle.title} {byTitle.year && <>({byTitle.year})</>}
              </CardTitle>
              <span>Episodes: {byTitle.episodes}</span>
            </CardHeader>
            {byTitle.score && (
              <div className=" flex flex-col items-center">
                <Badge>score</Badge>
                <span>{byTitle.score}</span>
              </div>
            )}
          </div>
          <Button asChild>
            <Link
              href={`/anime/${byTitle.mal_id}`}
              onMouseEnter={handleMouseEnter}
            >
              Go to Page
            </Link>
          </Button>
        </CardContent>
        {byTitle.synopsis && (
          <div>
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50">
              {byTitle.synopsis}
            </CardDescription>
          </div>
        )}
      </div>
    </Suspense>
  )
}
