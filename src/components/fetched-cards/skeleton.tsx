import { Skeleton as UiSkeleton } from '../ui/skeleton'

export function Skeleton() {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-2">
        <UiSkeleton className="h-64 w-40 md:w-48" />
        <UiSkeleton className="h-64 w-40 md:w-48" />
        <UiSkeleton className="h-64 w-40 md:w-48" />
        <UiSkeleton className="h-64 w-40 md:w-48" />
      </div>
      <div className="flex w-40 justify-between gap-2 md:w-48">
        <UiSkeleton className="h-12 w-12 md:w-14" />
        <UiSkeleton className="h-12 w-12 md:w-14" />
        <UiSkeleton className="h-12 w-12 md:w-14" />
      </div>
    </>
  )
}
