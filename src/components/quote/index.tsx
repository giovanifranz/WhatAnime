import dynamic from 'next/dynamic'

import Skeleton from './skeleton'

const Quote = dynamic(() => import('./quote'), { loading: () => <Skeleton /> })

export { Quote }
