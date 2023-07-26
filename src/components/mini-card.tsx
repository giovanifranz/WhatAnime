import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export function MiniCard() {
  return (
    <Link href={"/"}>
      <Card
        className={
          "bg-neutral-600 w-48 h-60 bg-cover relative hover:opacity-80 transition-all"
        }
        style={{
          backgroundImage:
            "url('https://cdn.myanimelist.net/images/anime/13/17405.webp')",
        }}
      >
        <CardFooter className="rounded-b-lg absolute bottom-0 px-0 p-1 bg-yellow-400 left-0 right-0 justify-center flex">
          <span className="truncate text-neutral-800 font-semibold">
            Naruto Shippuden
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
