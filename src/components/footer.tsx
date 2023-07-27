import Image from 'next/image'
import Link from 'next/link'
import {
  RiInstagramFill,
  RiFacebookFill,
  RiTwitterFill,
  RiPaypalFill,
} from 'react-icons/ri'
import { SiAnilist, SiMyanimelist } from 'react-icons/si'

import Highlander from '@/assets/highlander.svg'

import { Logo } from './logo'
import { Social } from './social'
import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer className="bg-neutral-800">
      <div className="mx-auto flex max-w-7xl gap-4 p-4">
        <div className="w-2/5">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            <span>CONNECT</span>
            <div className="flex gap-4">
              <Social href="/" icon={SiMyanimelist} />
              <Social href="/" icon={SiAnilist} />
            </div>

            <span>SHARE</span>
            <div className="flex gap-4">
              <Social href="/" icon={RiFacebookFill} />
              <Social href="/" icon={RiInstagramFill} />
              <Social href="/" icon={RiTwitterFill} />
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="my-auto h-72 bg-neutral-200" />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="max-w-xs">
              This site is our baby, so please consider donating if you are able so that
              we can keep working on it!
            </p>
            <Link href="/" className="rounded-full bg-neutral-100 p-2 text-neutral-800">
              <RiPaypalFill size={56} />
            </Link>
          </div>
          <span className="mt-4">LEGAL</span>
          <p>
            All anime series names, images, and content are copyrighted content of their
            respective license holders. I do not own the rights to any of these anime
            series. Anime information compiled from AniList and MyAnimeList.
          </p>
          <span className="-mb-4 mt-4">DESIGNED BY</span>
          <Link href="https://www.highlandertech.com.br/">
            <Image src={Highlander} alt="HighlanderTech" width={257} height={65} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
