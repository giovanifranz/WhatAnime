'use client'

import { useState, type PropsWithChildren, useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'

import { isMockEnabled } from '@/lib/utils'

import { AxeCore } from './axe-core'
import { ThemeProvider } from './theme-provider'

export function Provider({ children }: PropsWithChildren) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isMockEnabled()) {
      import('@/mocks').then(() => setShouldRender(true))
    } else {
      setShouldRender(true)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      <Analytics />
      <AxeCore />
    </ThemeProvider>
  )
}
