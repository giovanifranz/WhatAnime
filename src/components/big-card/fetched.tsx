'use client'

import { animeStore } from '@/store/animeStore'

import { Content } from './content'

export default function Fetched() {
  const { anime, isLoading, error } = animeStore((state) => ({
    anime: state.byTitle?.animeList[0],
    isLoading: state.byTitle?.isLoading,
    error: state.byTitle?.error,
  }))

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>Error ...</p>
  if (!anime) return null

  return <Content {...anime} />
}
