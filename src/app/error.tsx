'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

import { animeStore, initialState } from '@/store/animeStore'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    animeStore.setState(initialState)
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <h2 className="uppercase">Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
