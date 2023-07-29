'use client'

import { ThemeProvider } from 'next-themes'
import { useState, type PropsWithChildren } from 'react'
import * as React from 'react'

import { Analytics } from '@vercel/analytics/react'
import { useSsr, useEffectOnce } from 'usehooks-ts'

import { isDevEnvironment, isMockEnabled } from '@/lib/utils'

export function Provider({ children }: PropsWithChildren) {
  const [shouldRender, setShouldRender] = useState(false)
  const { isBrowser } = useSsr()

  const reportAccessibility = async () => {
    if (isBrowser && isDevEnvironment()) {
      const axe = await import('@axe-core/react')
      const ReactDOM = await import('react-dom')

      axe.default(React, ReactDOM, 1000)
    }
  }

  const initMocks = async () => {
    if (!isMockEnabled()) {
      setShouldRender(true)
      return
    }

    import('@/mocks/setup-msw').then(() => setShouldRender(true))
  }

  useEffectOnce(() => {
    Promise.all([reportAccessibility(), initMocks()])
  })

  if (!shouldRender) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      <Analytics />
    </ThemeProvider>
  )
}
