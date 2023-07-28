'use client'

import { useRef } from 'react'

import type { Anime } from '@/services/http/anime/schema'

import { animeStore } from './animeStore'

type Props = {
  random: Anime | null
  animeQuote: Anime | null
}

export function InitializerStore({ random, animeQuote }: Partial<Props>) {
  const initializer = useRef(false)
  const { storedQuote, storedRandom } = animeStore((store) => ({
    storedRandom: store.random,
    storedQuote: store.animeQuote,
  }))

  if (!initializer.current) {
    animeStore.setState({
      random: random || storedRandom,
      animeQuote: animeQuote || storedQuote,
    })
    initializer.current = true
  }

  return null
}
