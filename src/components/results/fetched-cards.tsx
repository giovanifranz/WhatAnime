'use client'

import Link from 'next/link'
import { useCallback } from 'react'

import { animeStore } from '@/store/animeStore'

import { MiniCard } from './mini-card'

export default function FetchedCards() {
  const { othersTitles, getAnimeById } = animeStore((store) => ({
    othersTitles: store.othersTitles,
    getAnimeById: store.getAnimeById,
  }))

  const handleMouseEnter = useCallback(
    async (id: number) => {
      await getAnimeById(id)
    },
    [getAnimeById],
  )

  if (!othersTitles) return null

  return (
    <div className="mt-4 flex flex-wrap justify-between ">
      {othersTitles.map(({ id, title, image }) => (
        <Link
          href={`/anime/${id}`}
          key={id}
          className="transition-all hover:opacity-80"
          onMouseEnter={() => handleMouseEnter(id)}
        >
          <MiniCard image={image} title={title} />
        </Link>
      ))}
    </div>
  )
}
