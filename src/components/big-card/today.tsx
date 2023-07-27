import { AnimeService } from '@/services/http'

import { animeStore } from '@/store/animeStore'

import { Content } from './content'

export default async function Today() {
  const random = await AnimeService.getAnimeRandom()
  animeStore.setState({ random })

  if (!random) return null

  return <Content {...random} />
}
