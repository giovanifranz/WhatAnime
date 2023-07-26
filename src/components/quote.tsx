import clsx from "clsx";
import { HtmlHTMLAttributes } from "react";
import { Button } from "./ui/button";
import { ImArrowRight2 } from "react-icons/im";

type Props = HtmlHTMLAttributes<HTMLDivElement>;

export function Quote({ className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        "bg-yellow-400 rounded-lg text-neutral-800 p-4",
        className
      )}
      {...rest}
    >
      <p className="line-clamp-3 mb-2">
        "Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book."
      </p>
      <div className="flex justify-between items-center">
        <div className="flex flex-col ">
          <span className="font-bold">Elliot Nightray</span>
          <span>Pandora Hearts</span>
        </div>
        <Button>
          <ImArrowRight2 size={20} />
        </Button>
      </div>
    </div>
  );
}
