import { Anime } from '@/services/jikan/type'

import { Card, CardFooter } from './ui/card'

type Props = Pick<Anime, 'title'> & {
  image: string
}

export function MiniCard({ image, title }: Props) {
  return (
    <Card
      className={'relative h-60 w-48 bg-neutral-600 bg-cover'}
      style={{ backgroundImage: `url(${image})` }}
    >
      <CardFooter className="absolute inset-x-0 bottom-0 flex justify-center rounded-b-lg bg-yellow-400 p-1 px-0">
        <span className="truncate px-2 font-semibold text-neutral-800">
          {title}
        </span>
      </CardFooter>
    </Card>
  )
}
