'use client'

import { useRef } from 'react'

import type { Anime } from '@/services/http/anime/schema'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

import type { DataResponse } from '@/lib/fetchData'

import { animeStore } from './animeStore'

type Props = {
  random: DataResponse<Anime> | null
}

export function InitializerStore({ random }: Partial<Props>) {
  const initializer = useRef(false)
  const storedRandom = animeStore((state) => state.random)

  useIsomorphicLayoutEffect(() => {
    if (!initializer.current) {
      animeStore.setState({
        random: random || storedRandom,
      })
      initializer.current = true
    }
  }, [random, storedRandom])

  return null
}
