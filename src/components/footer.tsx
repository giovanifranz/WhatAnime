import Highlander from "@/assets/highlander.svg";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Logo } from "./logo";
import Link from "next/link";
import { SiAnilist, SiMyanimelist } from "react-icons/si";
import { Social } from "./social";
import {
  RiInstagramFill,
  RiFacebookFill,
  RiTwitterFill,
  RiPaypalFill,
} from "react-icons/ri";

export function Footer() {
  return (
    <footer className="bg-neutral-800">
      <div className="mx-auto max-w-7xl flex p-4 gap-4">
        <div className="w-2/5">
          <Logo />
          <div className="flex flex-col gap-2 mt-8">
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
        <Separator
          orientation="vertical"
          className="bg-neutral-200 h-72 my-auto"
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="max-w-xs">
              This site is our baby, so please consider donating if you are able
              so that we can keep working on it!
            </p>
            <Link
              href="/"
              className="rounded-full text-neutral-800 bg-neutral-100 p-2"
            >
              <RiPaypalFill size={56} />
            </Link>
          </div>
          <span className="mt-4">LEGAL</span>
          <p>
            All anime series names, images, and content are copyrighted content
            of their respective license holders. I do not own the rights to any
            of these anime series. Anime information compiled from AniList and
            MyAnimeList.
          </p>
          <span className="mt-4 -mb-4">DESIGNED BY</span>
          <Link href="https://www.highlandertech.com.br/">
            <Image src={Highlander} alt="HighlanderTech" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
