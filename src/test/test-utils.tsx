import { ThemeProvider } from 'next-themes'
import type { ReactElement, ReactNode } from 'react'

import { render, RenderOptions } from '@testing-library/react'

const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="dark">
    {children}
  </ThemeProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
