import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { getAnimeRandom } from '@/services/jikan'

import { animeStore } from '@/store/animeStore'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default async function Today() {
  const { data } = await getAnimeRandom()
  animeStore.setState({ random: data })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Image
        className="hidden w-48 rounded-l-lg border-r-2 md:block"
        src={data.images.webp.image_url || data.images.jpg.image_url}
        alt="Naruto"
        width={400}
        height={600}
      />
      <div className="w-full p-4">
        <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <CardHeader className="flex flex-col p-0">
              <CardTitle className="text-lg">
                {data.title} {data.year && <>({data.year})</>}
              </CardTitle>
              <span>Episodes: {data.episodes}</span>
            </CardHeader>
            {data.score && (
              <div className=" flex flex-col items-center">
                <Badge>score</Badge>
                <span>{data.score}</span>
              </div>
            )}
          </div>
          <Button asChild>
            <Link href={'/anime/random'}>Go to Page</Link>
          </Button>
        </CardContent>
        {data.synopsis && (
          <div>
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50">
              {data.synopsis}
            </CardDescription>
          </div>
        )}
      </div>
    </Suspense>
  )
}
