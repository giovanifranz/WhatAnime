import Image from 'next/image'
import Link from 'next/link'

import { getAnimeRandom } from '@/services/jikan'

import { animeStore } from '@/store/animeStore'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default async function Today() {
  const { data } = await getAnimeRandom()
  animeStore.setState({ random: data })

  return (
    <article className="flex h-64 rounded-lg bg-neutral-700 text-neutral-50">
      <div className="relative hidden w-56 rounded-l-lg border-r-2 md:block">
        <Image
          src={data.images.webp.image_url || data.images.jpg.image_url}
          alt={data.title}
          fill
        />
      </div>
      <div className="w-full p-4">
        <CardContent className="flex flex-row-reverse items-start justify-between px-0 md:flex-row">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <CardHeader className="flex w-80 flex-col p-0">
              <CardTitle className="truncate text-lg">
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
          <>
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md line-clamp-5 text-neutral-50">
              {data.synopsis}
            </CardDescription>
          </>
        )}
      </div>
    </article>
  )
}
