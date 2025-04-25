import { useQuery } from '@tanstack/react-query'
import { VulnerabilityRoot } from '@/features/vulnerabilities/types'
 const DATA_URL = import.meta.env.VITE_DATA_URL ?? '/data/ui_demo.json'

export const useVulnerabilityData = () => {
  return useQuery<VulnerabilityRoot[]>({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch(DATA_URL)
      if (!response.ok) throw new Error('Failed to fetch vulnerability data')
      const raw: VulnerabilityRoot = await response.json()
      return raw
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

