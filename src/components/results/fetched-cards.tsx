'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'

import { animeStore } from '@/store/animeStore'

import { Button } from '../ui/button'
import { MiniCard } from './mini-card'

export default function FetchedCards() {
  const [pagination, setPagination] = useState(0)

  const othersAnimes = animeStore((store) => store.byTitle?.othersAnimes || [])

  const handleClick = useCallback((page: number) => {
    setPagination(page)
  }, [])

  if (!othersAnimes.length) return null

  return (
    <>
      <div className="mt-4 flex flex-wrap justify-between gap-2">
        {othersAnimes[pagination].animes.map(({ id, image, title }) => (
          <Link
            href={`/anime/${id}`}
            key={id}
            className="transition-all hover:opacity-80"
          >
            <MiniCard image={image} title={title} />
          </Link>
        ))}
      </div>
      <div className="flex gap-2 p-2 pl-0">
        {othersAnimes.map(({ page }) => (
          <Button
            key={page}
            type="button"
            disabled={page - 1 === pagination}
            onClick={() => handleClick(page - 1)}
          >
            {page}
          </Button>
        ))}
      </div>
    </>
  )
}
