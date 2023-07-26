'use client'

import { useLayoutEffect, useRef } from 'react'

import { Anime } from '@/services/jikan/type'

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
