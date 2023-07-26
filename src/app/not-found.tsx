'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/')
    }, 500)

    return () => clearTimeout(timer)
  }, [router])

  return <h1>404 - Page Not Found</h1>
}
