import { useQuery } from '@tanstack/react-query'
import { VulnerabilityRoot } from '@/features/vulnerabilities/types'

// ✅ Point to Google Drive direct download link
const DATA_URL =
  'https://drive.google.com/uc?export=download&id=1tSm0ZAa8eS9DdwhQAbClSqN4eRWsk6vH'

export const useVulnerabilityData = () => {
  return useQuery<VulnerabilityRoot[]>({
    queryKey: ['vulnerabilityData'],
    queryFn: async () => {
      const response = await fetch(DATA_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch vulnerability data')
      }

      const data: VulnerabilityRoot[] = await response.json()
      return data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
