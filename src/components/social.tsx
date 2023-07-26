import Link, { type LinkProps } from 'next/link'
import type { IconType } from 'react-icons'

type Props = LinkProps & {
  icon: IconType
}

export function Social({ icon, ...rest }: Props) {
  const Icon = icon
  return (
    <Link
      {...rest}
      className="rounded-lg bg-neutral-50 p-2 text-neutral-800 transition-all hover:opacity-90"
    >
      <Icon size={24} />
    </Link>
  )
}
