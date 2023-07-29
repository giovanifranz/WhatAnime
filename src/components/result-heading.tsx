'use client'

import { useEffect, useState } from 'react'

import { animeStore } from '@/store/animeStore'

export function ResultHeading() {
  const [showTitle, setShowTitle] = useState(false)
  const byTitle = animeStore((state) => state.byTitle)

  useEffect(() => {
    if (byTitle) {
      setShowTitle(true)
    }
  }, [byTitle])

  if (!showTitle) return <div className="col-span-2 h-10 md:col-span-8" />

  return (
    <h2 className="col-span-2 h-10 text-2xl font-semibold uppercase tracking-tight md:col-span-8 md:text-3xl">
      Results
    </h2>
  )
}
