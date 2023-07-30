import { NextResponse } from 'next/server'

import { CUSTOM_ERROR } from '@/common/enum'
import { REVALIDATE } from '@/common/enum/revalidate'
import { AnimeService } from '@/services/http'

export const revalidate = REVALIDATE.ONE_DAY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title')
  const pageParam = searchParams.get('page')

  const page = pageParam ? parseInt(pageParam) : 1

  if (!title) {
    return NextResponse.json(CUSTOM_ERROR.MISSING_QUERY_PARAM, { status: 400 })
  }

  const response = await AnimeService.getAnimesByTitle(title, page)

  if (!response.data) return NextResponse.json(CUSTOM_ERROR.NOT_FOUND, { status: 404 })

  return NextResponse.json(
    {
      data: response.data,
      pagination: response.pagination,
    },
    { status: 200 },
  )
}
