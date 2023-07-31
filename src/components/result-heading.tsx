'use client'

import { animeStore } from '@/store/animeStore'

import { Skeleton } from './ui/skeleton'

export function ResultHeading() {
  const { isLoading, showTitle } = animeStore((state) => ({
    isLoading: state.byTitle?.isLoading,
    showTitle: state.byTitle,
  }))

  if (isLoading) return <Skeleton className="h-full w-28" />

  return showTitle && <h2>Result</h2>
}
