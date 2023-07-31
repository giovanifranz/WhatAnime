import { AnimeService } from '@/services/http'

import { animeStore } from '@/store/animeStore'
import { InitializerStore } from '@/store/initializerStore'

import Content from './content'
import Skeleton from './skeleton'

export default async function Today() {
  const random = await AnimeService.getAnimeRandom()
  animeStore.setState({ random: random })

  if (random.isLoading || random.error || !random.data) return <Skeleton />

  return (
    <>
      <Content {...random.data} />
      <InitializerStore random={random} />
    </>
  )
}
