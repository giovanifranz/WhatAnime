'use client'

import { useLayoutEffect, useRef } from 'react'

import type { Anime } from '@/services/http/anime/schema'

import { animeStore } from './animeStore'

type Props = {
  random: Anime | null
}

export function InitializerStore({ random }: Partial<Props>) {
  const initializer = useRef(false)
  const storedRandom = animeStore((store) => store.random)

  useLayoutEffect(() => {
    if (!initializer.current) {
      animeStore.setState({
        random: random || storedRandom,
      })
      initializer.current = true
    }
  }, [random, storedRandom])

  return null
}
