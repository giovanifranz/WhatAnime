'use client'

import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'

import { animeStore } from '@/store/animeStore'

import { Button } from '../ui/button'

export default function QuoteButton() {
  const id = animeStore((store) => store.animeQuote && store.animeQuote.id)

  if (!id) return null

  return (
    <Button asChild className="absolute bottom-4 right-4">
      <Link href={`/anime/${id}`} prefetch={false}>
        <ImArrowRight2 size={20} />
      </Link>
    </Button>
  )
}
