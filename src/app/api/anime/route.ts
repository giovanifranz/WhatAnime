import { NextResponse } from 'next/server'

import { REVALIDATE } from '@/common/enum/revalidate'
import { AnimeService } from '@/services/http'

export const revalidate = REVALIDATE.ONE_DAY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title')

  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 })

  const anime = await AnimeService.getAnimesByTitle(title)

  if (!anime) return NextResponse.json({ error: 'Anime not found' }, { status: 404 })

  return NextResponse.json({ data: anime })
}
