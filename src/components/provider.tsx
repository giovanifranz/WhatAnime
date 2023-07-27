'use client'

import { ThemeProvider } from 'next-themes'
import { useState, type PropsWithChildren, useEffect } from 'react'
import * as React from 'react'

import { Analytics } from '@vercel/analytics/react'

import { isMockEnabled } from '@/lib/utils'

export function Provider({ children }: PropsWithChildren) {
  const [shouldRender, setShouldRender] = useState(false)
  const reportAccessibility = async () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
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

    import('@/mocks').then(() => setShouldRender(true))
  }

  useEffect(() => {
    reportAccessibility()
    initMocks()
  }, [])

  if (!shouldRender) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      <Analytics />
    </ThemeProvider>
  )
}
