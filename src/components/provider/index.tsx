import type { PropsWithChildren } from 'react'

import { Analytics } from '@vercel/analytics/react'

import { AxeCore } from './axe-core'
import { MSWComponent } from './msw'
import { ThemeProvider } from './theme-provider'

export function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      <Analytics />
      <MSWComponent />
      <AxeCore />
    </ThemeProvider>
  )
}
