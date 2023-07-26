import { HtmlHTMLAttributes } from 'react'
import { ImArrowRight2 } from 'react-icons/im'

import clsx from 'clsx'

import { Button } from './ui/button'

type Props = HtmlHTMLAttributes<HTMLDivElement>

export function Quote({ className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        'rounded-lg bg-yellow-400 p-4 text-neutral-800',
        className,
      )}
      {...rest}
    >
      <p className="mb-2 line-clamp-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-col ">
          <span className="font-bold">Elliot Nightray</span>
          <span>Pandora Hearts</span>
        </div>
        <Button>
          <ImArrowRight2 size={20} />
        </Button>
      </div>
    </div>
  )
}
