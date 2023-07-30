import { NextResponse } from 'next/server'

import { ERROR } from '@/common/enum'
import { REVALIDATE } from '@/common/enum/revalidate'
import { AnimeService } from '@/services/http'

export const revalidate = REVALIDATE.ONE_DAY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title')

  if (!title) {
    return NextResponse.json(ERROR.MISSING_QUERY_PARAM, { status: 400 })
  }
  const response = await AnimeService.getAnimesByTitle(title)

  if (!response.data) return NextResponse.json(ERROR.NOT_FOUND, { status: 404 })

  return NextResponse.json(response.data, { status: 200 })
}
