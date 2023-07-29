'use client'

import { useWindowSize } from 'usehooks-ts'

import { Separator as UiSeparator } from '../ui/separator'

export function Separator() {
  const { width } = useWindowSize()

  return (
    <UiSeparator
      orientation={width < 768 ? 'horizontal' : 'vertical'}
      className="my-auto bg-neutral-200 md:my-4 md:flex md:h-72"
    />
  )
}
