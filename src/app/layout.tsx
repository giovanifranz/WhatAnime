import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import type { PropsWithChildren } from 'react'

import { Footer, Header, Provider } from '@/components'

import { cn } from '@/lib/utils'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
})

export const metadata: Metadata = {
  title: 'WhatAnime',
  description:
    'Immerse Yourself in the Enchanting World of Anime! Discover the Latest Releases, Timeless Classics, and More. Ignite Your Passion for Japanese Animation at WhatAnime. Start Exploring Now!',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, 'scroll-smooth antialiased')}>
        <Provider>
          <Header />
          <main className="mx-auto min-h-screen max-w-7xl py-32">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
