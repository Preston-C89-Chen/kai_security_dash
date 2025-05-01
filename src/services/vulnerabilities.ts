import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { VulnerabilityRoot, Vulnerability } from '@/features/vulnerabilities/types'
const DATA_URL = import.meta.env.VITE_VULNERABILITIES_FLATTENED_DATA_URL
const PAGE_SIZE = 25000
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

export const useProgressiveVulnerabilityData = () => {
  return useInfiniteQuery<Vulnerability[], Error>({
    queryKey: ['vulnerabilities-ndjson'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(DATA_URL)
      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')

      let { value, done } = await reader.read()
      let buffer = ''
      const results: Vulnerability[] = []
      let lineCount = 0

      while (!done) {
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')

        // Save the last line (incomplete possibly)
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.trim()) {
            const vuln = JSON.parse(line)
            if (lineCount >= pageParam * PAGE_SIZE && lineCount < (pageParam + 1) * PAGE_SIZE) {
              results.push(vuln)
            }
            lineCount++

            // If we loaded a full page, return early
            if (results.length >= PAGE_SIZE) {
              await reader.cancel()
              return results
            }
          }
        }

        // Read the next chunk
        ;({ value, done } = await reader.read())
      }

      // Also parse the final buffer if any
      if (buffer.trim()) {
        const vuln = JSON.parse(buffer)
        if (lineCount >= pageParam * PAGE_SIZE && lineCount < (pageParam + 1) * PAGE_SIZE) {
          results.push(vuln)
        }
      }

      return results
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined // no more pages
      }
      return allPages.length // next page to load
    },
    initialPageParam: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}