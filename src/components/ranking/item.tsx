import Link from 'next/link'

import type { Anime } from '@/services/http/anime/schema'

type Props = Pick<Anime, 'title' | 'id'> & {
  index: number
}

export default function Item({ index, id, title }: Props) {
  return (
    <li className="w-44 truncate lg:w-56" data-testid="list-item">
      <Link
        href={`/anime/${id}`}
        className="transition-all hover:underline hover:opacity-80"
        prefetch={false}
      >
        {index + 1}. {title}
      </Link>
    </li>
  )
}
