import { cn } from "@/lib/utils";
import type { HtmlHTMLAttributes } from "react";

type Props = HtmlHTMLAttributes<HTMLDivElement>;

export function Ranking({ className, children, ...rest }: Props) {
  return (
    <section
      className={cn("bg-neutral-700 rounded-lg min-h-fit", className)}
      {...rest}
    >
      <h2 className="rounded-t-lg p-2 uppercase scroll-m-20 text-neutral-800 text-2xl md:text-3xl text-center font-semibold tracking-tight bg-yellow-400">
        Top Airing
      </h2>
      <ul className="list-decimal flex flex-col items-center justify-center p-4 gap-2">
        {children}
      </ul>
    </section>
  );
}
