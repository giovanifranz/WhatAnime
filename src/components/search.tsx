import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { HtmlHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement>;

export function Search({ className, ...rest }: Props) {
  return (
    <div
      className={cn("flex flex-col gap-4 max-w-4xl justify-center", className)}
      {...rest}
    >
      <div className="flex gap-4 items-center">
        <h2 className="uppercase scroll-m-20 text-3xl font-semibold tracking-tight">
          Search
        </h2>
        <Select defaultValue="word">
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Word" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="word">Word</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full max-w-full items-center space-x-2">
        <Input type="text" placeholder="Enter your search key word" />
        <Button type="submit">Search</Button>
      </div>
    </div>
  );
}
