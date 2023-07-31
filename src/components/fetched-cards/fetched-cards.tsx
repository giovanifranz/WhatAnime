'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import { useStep, useUpdateEffect } from 'usehooks-ts'

import { animeStore } from '@/store/animeStore'

import { Skeleton } from './skeleton'
import StepButtons from './step-buttons'

const MiniCard = dynamic(() => import('./mini-card'))

export default function FetchedCards() {
  const { list, isLoading, error, title } = animeStore((state) => ({
    title: state.byTitle?.title,
    list: state.byTitle?.chunkedList || [],
    isLoading: state.byTitle?.isLoading,
    error: state.byTitle?.error,
  }))

  const [currentStep, helpers] = useStep(list.length)

  const { canGoToNextStep, goToNextStep, goToPrevStep, reset } = helpers

  useUpdateEffect(() => {
    reset()
  }, [reset, title])

  if (isLoading) return <Skeleton />
  if (error) return <p>Error ...</p>
  if (list.length <= 0) return null

  return (
    <>
      <div className="flex flex-wrap justify-between gap-2">
        {list[currentStep - 1] &&
          list[currentStep - 1].animes.map(({ id, image, title }) => (
            <Link
              href={`/anime/${id}`}
              key={id}
              prefetch={false}
              className="transition-all hover:opacity-80"
            >
              <MiniCard image={image} title={title} />
            </Link>
          ))}
      </div>
      <StepButtons
        canGoToNextStep={canGoToNextStep}
        currentStep={currentStep}
        goToNextStep={goToNextStep}
        goToPrevStep={goToPrevStep}
      />
    </>
  )
}
