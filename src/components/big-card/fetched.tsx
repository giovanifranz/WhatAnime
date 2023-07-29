'use client'

import { animeStore } from '@/store/animeStore'

import { Content } from './content'

export default function Fetched() {
  const { data, isLoading, error } = animeStore((state) => {
    return {
      data: state.byTitle?.data,
      isLoading: state.byTitle?.isLoading,
      error: state.byTitle?.error,
    }
  })

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>Error ...</p>
  if (!data?.anime) return null

  return <Content {...data.anime} />
}
