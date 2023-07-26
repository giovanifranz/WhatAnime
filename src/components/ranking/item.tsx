'use client'

import Link from 'next/link'
import { useCallback } from 'react'

import { Anime } from '@/services/jikan/type'

import { animeStore } from '@/store/animeStore'

type Props = Pick<Anime, 'title' | 'mal_id'> & {
  index: number
}

export default function Item({ index, mal_id, title }: Props) {
  const getAnimeById = animeStore((store) => store.getAnimeById)

  const handleMouseOver = useCallback(async () => {
    await getAnimeById(mal_id)
  }, [getAnimeById, mal_id])

  return (
    <li className="w-56 truncate" key={mal_id}>
      <Link
        href={`/anime/${mal_id}`}
        onMouseOver={handleMouseOver}
        className="transition-all hover:underline hover:opacity-80"
      >
        {index + 1}. {title}
      </Link>
    </li>
  )
}
