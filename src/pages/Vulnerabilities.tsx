// src/pages/Vulnerabilities.tsx
import {
  Box,
  Heading,
  Spinner,
  Text,
  Link,
  Table,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { VulnerabilityTable } from '@/features/vulnerabilities/components/VulnerabilityTable'
import { useLoadVulnerabilities} from '@/features/vulnerabilities/hooks'
import { useProgressiveLoadVulnerabilities } from '@/features/vulnerabilities/hooks'


const Vulnerabilities = () => {
  //const { flattened, isLoading, isError } = useLoadVulnerabilities()
  const {
    flattened,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProgressiveLoadVulnerabilities()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); //
  return (
    <Box
      style={{overflow: 'hidden'}}
    >
      <Heading mb={6}>🔍 Vulnerability Listing</Heading>

      {isLoading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" />
        </Box>
      ) :
        (
          <VulnerabilityTable data={flattened} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
        )
      }
    </Box>
  )
}

export default Vulnerabilities
