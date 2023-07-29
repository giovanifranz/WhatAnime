import { NextResponse } from 'next/server'

import { ERROR } from '@/common/enum'
import { REVALIDATE } from '@/common/enum/revalidate'
import { AnimeService } from '@/services/http'
import { AnimeByTitle } from '@/services/http/anime/schema'

import { DataResponse } from '@/lib/fetchData'

export const revalidate = REVALIDATE.ONE_DAY

type Response = Promise<NextResponse<DataResponse<AnimeByTitle>>>

export async function GET(request: Request): Response {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title')

  if (!title) {
    return NextResponse.json(
      { data: null, isLoading: false, error: ERROR.MISSING_QUERY_PARAM },
      { status: 400 },
    )
  }
  const response = await AnimeService.getAnimesByTitle(title)

  if (!response.data)
    return NextResponse.json(
      { data: null, isLoading: false, error: ERROR.NOT_FOUND },
      { status: 404 },
    )

  return NextResponse.json({ data: response.data, isLoading: false, error: null })
}
