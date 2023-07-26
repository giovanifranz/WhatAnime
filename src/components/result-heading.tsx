'use client'

import { useEffect, useState } from 'react'

import { animeStore } from '@/store/animeStore'

export function ResultHeading() {
  const [showTitle, setShowTitle] = useState(false)
  const byTitle = animeStore((store) => store.byTitle)

  useEffect(() => {
    if (byTitle) {
      setShowTitle(true)
    }
  }, [byTitle])

  if (!showTitle) return <div className="h-10" />

  return (
    <h2 className="col-span-8 h-10 text-3xl font-semibold uppercase tracking-tight">
      Results
    </h2>
  )
}
