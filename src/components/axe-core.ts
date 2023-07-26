'use client'

import React, { useEffect } from 'react'

export function AxeCore() {
  const reportAccessibility = async () => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV !== 'production'
    ) {
      const axe = await import('@axe-core/react')
      const ReactDOM = await import('react-dom')

      axe.default(React, ReactDOM, 1000)
    }
  }

  useEffect(() => {
    reportAccessibility()
  }, [])

  return null
}
