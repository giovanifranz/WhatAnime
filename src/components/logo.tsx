import WhatAnime from "@/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/">
      <Image src={WhatAnime} alt="WhatAnime" />
    </Link>
  );
}
