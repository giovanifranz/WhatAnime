import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'

import { AnimeService } from '@/services/http'

import { animeStore } from '@/store/animeStore'

import { Button } from '../ui/button'

type Props = {
  title: string
}

export default async function QuoteButton({ title }: Props) {
  const id = await AnimeService.getAnimesByTitle(title).then((result) => {
    if (!result) return null
    animeStore.setState({ animeQuote: result.anime })
    return result.anime.id
  })

  if (!id) return null

  return (
    <Button asChild className="absolute bottom-4 right-4">
      <Link href={`/anime/${id}`} prefetch={false}>
        <ImArrowRight2 size={20} />
      </Link>
    </Button>
  )
}
