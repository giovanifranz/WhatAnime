import Image from 'next/image'
import Link from 'next/link'
import { RiFacebookFill, RiTwitterFill, RiPaypalFill } from 'react-icons/ri'
import { SiAnilist, SiMyanimelist } from 'react-icons/si'

import Highlander from '@/assets/highlander.svg'

import { Logo } from '@/components'

import { Separator } from './separator'
import { Social } from './social'

export function Footer() {
  return (
    <footer className="bg-neutral-800">
      <div className="mx-auto flex flex-col gap-4 p-4 md:max-w-7xl md:flex-row">
        <div className="w-full md:w-2/5">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            <span>CONNECT</span>
            <div className="flex gap-4">
              <Social
                data-testid="myanimelist-social"
                href="https://myanimelist.net/profile/HighlanderTech"
                icon={SiMyanimelist}
              />
              <Social
                data-testid="anilist-social"
                href="https://anilist.co/user/giovanifranz/"
                icon={SiAnilist}
              />
            </div>

            <span>SHARE</span>
            <div className="flex gap-4">
              <Social
                data-testid="facebook-social"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.whatanime.com.br"
                icon={RiFacebookFill}
              />
              <Social
                data-testid="twitter-social"
                href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.whatanime.com.br"
                icon={RiTwitterFill}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="max-w-xs">
              This site is our baby, so please consider donating if you are able so that
              we can keep working on it!
            </p>
            <Link
              data-testid="paypal"
              href="https://www.paypal.com/donate/?hosted_button_id=KJ9TK628E7N42"
              className="rounded-full bg-neutral-100 p-2 text-neutral-800 transition-all hover:opacity-90"
            >
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
          <Link href="https://www.highlandertech.com.br" data-testid="highlander-logo">
            <Image src={Highlander} alt="HighlanderTech" width={257} height={65} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
