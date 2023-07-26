'use client'

import Link from 'next/link'
import { useCallback } from 'react'

import type { Anime } from '@/services/http/anime/schema'

import { animeStore } from '@/store/animeStore'

type Props = Pick<Anime, 'title' | 'id'> & {
  index: number
}

export default function Item({ index, id, title }: Props) {
  const getAnimeById = animeStore((store) => store.getAnimeById)

  const handleMouseOver = useCallback(async () => {
    await getAnimeById(id)
  }, [getAnimeById, id])

  return (
    <li className="w-56 truncate" key={id}>
      <Link
        href={`/anime/${id}`}
        onMouseOver={handleMouseOver}
        className="transition-all hover:underline hover:opacity-80"
      >
        {index + 1}. {title}
      </Link>
    </li>
  )
}
