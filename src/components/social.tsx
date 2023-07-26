import Link, { type LinkProps } from "next/link";
import type { IconType } from "react-icons";

type Props = LinkProps & {
  icon: IconType;
};

export function Social({ icon, ...rest }: Props) {
  const Icon = icon;
  return (
    <Link
      {...rest}
      className="hover:opacity-90 transition-all text-neutral-800 bg-neutral-50 rounded-lg p-2"
    >
      <Icon size={24} />
    </Link>
  );
}
