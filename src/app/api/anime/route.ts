import { NextResponse } from 'next/server'

import { AnimeService } from '@/services/http'

import { ONE_DAY } from '@/lib/utils'

export const revalidate = ONE_DAY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')

  if (!title) return NextResponse.error()

  const anime = await AnimeService.getAnimesByTitle(title)

  return NextResponse.json({ data: anime })
}
