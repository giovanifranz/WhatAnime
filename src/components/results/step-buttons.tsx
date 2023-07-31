'use client'

import { useCallback, useState } from 'react'
import { ImArrowRight2, ImArrowLeft2 } from 'react-icons/im'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
import { useUpdateEffect } from 'usehooks-ts'

import { animeStore } from '@/store/animeStore'

import { Button } from '../ui/button'

type Props = {
  canGoToNextStep: boolean
  goToNextStep: () => void
  goToPrevStep: () => void
  currentStep: number
}

export default function StepButtons({
  canGoToNextStep,
  goToNextStep,
  goToPrevStep,
  currentStep,
}: Props) {
  const [isDisable, setIsDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { updateAnimeByTitleList, hasNextPage } = animeStore((state) => ({
    updateAnimeByTitleList: state.updateAnimeByTitleList,
    hasNextPage: state.byTitle?.pagination.has_next_page || false,
  }))

  const handleClick = useCallback(async () => {
    if (!canGoToNextStep && !hasNextPage) {
      setIsDisable(true)
      return
    }

    goToNextStep()
  }, [canGoToNextStep, goToNextStep, hasNextPage])

  const updateList = useCallback(async () => {
    if (!canGoToNextStep && hasNextPage) {
      setIsLoading(true)
      await updateAnimeByTitleList()
      setIsLoading(false)
    }
  }, [canGoToNextStep, hasNextPage, updateAnimeByTitleList])

  useUpdateEffect(() => {
    updateList()
  }, [updateList])

  return (
    <div className="flex gap-2 p-2 pl-0">
      <Button type="button" disabled={currentStep === 1} onClick={goToPrevStep}>
        <ImArrowLeft2 size={20} />
      </Button>
      <Button
        asChild
        type="button"
        disabled={isDisable || isLoading}
        className="w-14 font-semibold"
      >
        <span>
          {isLoading ? (
            <AccessibleIcon.Root label="Loading Icon">
              <UseAnimations animation={loading} />
            </AccessibleIcon.Root>
          ) : (
            currentStep
          )}
        </span>
      </Button>
      <Button
        type="button"
        disabled={isDisable || isLoading || currentStep === 10}
        onClick={handleClick}
      >
        <ImArrowRight2 size={20} />
      </Button>
    </div>
  )
}
