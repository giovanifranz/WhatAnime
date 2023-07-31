import dynamic from 'next/dynamic'

import Content from './content'
import Root from './root'
import Skeleton from './skeleton'

const Today = dynamic(() => import('./today'), { loading: () => <Skeleton /> })
const Fetched = dynamic(() => import('./fetched'), { loading: () => <Skeleton /> })

export const BigCard = {
  Fetched,
  Root,
  Today,
  Content,
}
