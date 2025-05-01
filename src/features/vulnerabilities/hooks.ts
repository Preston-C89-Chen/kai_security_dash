import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEffect } from 'react'
import { setRawData, appendFlattenedData } from '@/features/vulnerabilities/vulnerabilitySlice'
import { useProgressiveVulnerabilityData, useVulnerabilityData } from '@/services/vulnerabilities'

export const useLoadVulnerabilities = () => {
  const dispatch = useAppDispatch()
  const flattened = useAppSelector((state) => state.vulnerabilities.flattened)
  const { data: raw, isLoading, isError } = useVulnerabilityData()

  useEffect(() => {
    if (raw && flattened.length === 0) {
      dispatch(setRawData(raw))
    }
  }, [raw, flattened.length, dispatch])

  return {
    flattened,
    isLoading,
    isError,
  }
}

export const useProgressiveLoadVulnerabilities = () => {
  const dispatch = useAppDispatch()
  const flattened = useAppSelector((state) => state.vulnerabilities.flattened)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useProgressiveVulnerabilityData()

  useEffect(() => {
    if (data?.pages.length) {
      const newVulnerabilities = data.pages[data.pages.length - 1]
      dispatch(appendFlattenedData(newVulnerabilities))
    }
  }, [data, dispatch])

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    isFetchingNextPage,
    hasNextPage,
    flattened,
    isLoading,
    isError,
  }
}