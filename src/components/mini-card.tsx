import Link from 'next/link'

import { Card, CardFooter } from './ui/card'

export function MiniCard() {
  return (
    <Link href={'/'}>
      <Card
        className={
          'relative h-60 w-48 bg-neutral-600 bg-cover transition-all hover:opacity-80'
        }
        style={{
          backgroundImage:
            "url('https://cdn.myanimelist.net/images/anime/13/17405.webp')",
        }}
      >
        <CardFooter className="absolute inset-x-0 bottom-0 flex justify-center rounded-b-lg bg-yellow-400 p-1 px-0">
          <span className="truncate font-semibold text-neutral-800">
            Naruto Shippuden
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
