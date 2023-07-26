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
      {othersTitles.map(({ mal_id, title, images }) => (
        <Link
          href={`/anime/${mal_id}`}
          key={mal_id}
          className="transition-all hover:opacity-80"
          onMouseEnter={() => handleMouseEnter(mal_id)}
        >
          <MiniCard
            image={images.webp.image_url || images.jpg.image_url}
            title={title}
          />
        </Link>
      ))}
    </div>
  )
}
