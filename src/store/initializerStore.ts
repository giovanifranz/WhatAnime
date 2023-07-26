'use client'

import { useLayoutEffect, useRef } from 'react'

import type { Anime } from '@/services/http/anime/schema'

import { animeStore } from './animeStore'

type Props = {
  random: Anime | null
  animeQuote: Anime | null
}

export function InitializerStore({ random, animeQuote }: Partial<Props>) {
  const initializer = useRef(false)

  useLayoutEffect(() => {
    if (!initializer.current) {
      animeStore.setState({
        random: random || null,
        animeQuote: animeQuote || null,
      })
      initializer.current = true
    }
  }, [animeQuote, random])

  return null
}
