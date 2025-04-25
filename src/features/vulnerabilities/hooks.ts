import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEffect } from 'react'
import { setRawData } from '@/features/vulnerabilities/vulnerabilitySlice'
import { useVulnerabilityData } from '@/services/vulnerabilities'

export const useLoadVulnerabilities = () => {
  const dispatch = useAppDispatch()
  const flattened = useAppSelector((state) => state.vulnerabilities.flattened)
  const { data: raw, isLoading, isError } = useVulnerabilityData({
    enabled: flattened.length === 0,
  })

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
