import { cn } from "@/lib/utils";
import Image from "next/image";
import type { HtmlHTMLAttributes } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = HtmlHTMLAttributes<HTMLDivElement>;

export function BigCard({ className, ...rest }: Props) {
  return (
    <Card className={cn("max-w-4xl", className)} {...rest}>
      <article className="bg-neutral-700 rounded-lg text-neutral-50 flex">
        <Image
          className="rounded-l-lg w-48 border-r-2 hidden md:block"
          src="https://cdn.myanimelist.net/images/anime/13/17405.webp"
          alt="Naruto"
          width={400}
          height={600}
        />
        <div className="p-4 w-full">
          <CardContent className="flex flex-row-reverse md:flex-row justify-between px-0 items-start">
            <div className="md:flex gap-4 justify-between items-center hidden">
              <CardHeader className="p-0 flex flex-col">
                <CardTitle className="text-lg">Naruto (2006)</CardTitle>
                <span>Episodes: 256</span>
              </CardHeader>
              <div className=" flex flex-col items-center">
                <Badge>score</Badge>
                <span>8.5</span>
              </div>
            </div>
            <Button>Go to Page</Button>
          </CardContent>
          <div className="">
            <h3 className="text-md font-semibold">Synopsis</h3>
            <CardDescription className="text-md text-neutral-50 line-clamp-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </CardDescription>
          </div>
        </div>
      </article>
    </Card>
  );
}
