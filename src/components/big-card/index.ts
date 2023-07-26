import dynamic from 'next/dynamic'

import Root from './root'
import Today from './today'

const Fetched = dynamic(() => import('./fetched'), { ssr: false })

export const BigCard = {
  Fetched,
  Root,
  Today,
}
