import { ERROR } from '@/common/enum'

export type DataResponse<T> = {
  isLoading: boolean
  error: string | null
  data: T | null
}

export async function fetchData<T>(
  url: string,
  options?: RequestInit,
): Promise<DataResponse<T>> {
  const response: DataResponse<T> = {
    isLoading: true,
    error: null,
    data: null,
  }

  try {
    const res = await fetch(url, options)
    const data = await res.json()

    response.isLoading = false
    response.data = data
  } catch (error) {
    response.isLoading = false
    response.error = ERROR.FETCHING
  }

  return response
}
