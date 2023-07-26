'use client'

import Link from 'next/link'
import { useCallback } from 'react'
import { ImArrowRight2 } from 'react-icons/im'

import { animeStore } from '@/store/animeStore'

import { Button } from '../ui/button'

export default function QuoteButton() {
  const { mal_id, getAnimeById } = animeStore((store) => ({
    mal_id: store.animeQuote ? store.animeQuote.mal_id : null,
    getAnimeById: store.getAnimeById,
  }))

  const handleMouseOver = useCallback(async () => {
    if (!mal_id) return

    await getAnimeById(mal_id)
  }, [getAnimeById, mal_id])

  if (!mal_id) return null

  return (
    <Button asChild className="absolute bottom-4 right-4">
      <Link href={`/anime/${mal_id}`} onMouseOver={handleMouseOver}>
        <ImArrowRight2 size={20} />
      </Link>
    </Button>
  )
}
