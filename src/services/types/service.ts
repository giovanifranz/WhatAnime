import { DataResponse } from '@/lib/fetchData'

export type ServiceResponse<T> = Promise<DataResponse<T>>
