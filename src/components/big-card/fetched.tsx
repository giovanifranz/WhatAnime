'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

import { animeStore } from '@/store/animeStore'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function Fetched() {
  const { byTitle, getAnimeById } = animeStore((store) => ({
    byTitle: store.byTitle?.anime || null,
    getAnimeById: store.getAnimeById,
  }))

  const handleMouseEnter = useCallback(async () => {
    if (!byTitle) return
    await getAnimeById(byTitle.id)
  }, [byTitle, getAnimeById])

  if (!byTitle) return null

  return (
    <article className="flex h-64 rounded-lg bg-neutral-700 text-neutral-50">
      <div className="relative w-56 rounded-l-lg border-r-2">
        <Image src={byTitle.image} alt={byTitle.title} fill />
      </div>
      <div className="w-full p-4">
        <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <CardHeader className="flex w-80 flex-col p-0">
              <CardTitle className="truncate text-lg">
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
            <Link href={`/anime/${byTitle.id}`} onMouseEnter={handleMouseEnter}>
              Go to Page
            </Link>
          </Button>
        </CardContent>
        {byTitle.synopsis && (
          <>
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50">
              {byTitle.synopsis}
            </CardDescription>
          </>
        )}
      </div>
    </article>
  )
}
