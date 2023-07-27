'use client'

import { animeStore } from '@/store/animeStore'

import { Content } from './content'

export default function Fetched() {
  const byTitle = animeStore((store) => store.byTitle?.anime || null)

  if (!byTitle) return null

  return <Content {...byTitle} />
}
