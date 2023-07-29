import { AnimeService } from '@/services/http'

import { animeStore } from '@/store/animeStore'
import { InitializerStore } from '@/store/initializerStore'

import { Content } from './content'

export default async function Today() {
  const random = await AnimeService.getAnimeRandom()
  animeStore.setState({ random: random })

  if (random.isLoading) return <p>Loading ...</p>
  if (random.error) return <p>Error ...</p>
  if (!random.data) return <p>Not found</p>

  return (
    <>
      <Content {...random.data} />
      <InitializerStore random={random} />
    </>
  )
}
