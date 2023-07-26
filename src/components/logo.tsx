import Image from 'next/image'
import Link from 'next/link'

import WhatAnime from '@/assets/logo.svg'

export function Logo() {
  return (
    <Link href="/">
      <Image src={WhatAnime} alt="WhatAnime" />
    </Link>
  )
}
