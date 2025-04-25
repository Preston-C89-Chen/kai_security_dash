// src/pages/Dashboard.tsx
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useColorModeValue } from '@/components/ui/color-mode'
import { useDashboardMetrics } from '@/features/dashboard/hooks'
import { useLoadVulnerabilities } from '@/features/vulnerabilities/hooks'
import SeverityBarChart from '@/components/charts/SeverityBarChart'
import CorrelationHeatmap from '@/components/charts/CorrelationHeatmap'
import VulnerabilityTrend from '@/components/charts/VulnerabilityTrend'
import RiskFactorChart from '@/components/charts/RiskFactorChart'

const Dashboard = () => {
  const { flattened, isLoading, isError } = useLoadVulnerabilities()
  const metrics = useDashboardMetrics()

  const loadingState = isLoading && flattened.length === 0
  const lightGray = useColorModeValue('gray.100', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box>
      <Heading mb={6}>📊 Dashboard Overview</Heading>

      {loadingState && (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" />
        </Box>
      )}

      {!loadingState && isError && (
        <Text color="red.500" textAlign="center">
          Failed to load vulnerabilities.
        </Text>
      )}

      {!loadingState && flattened.length > 0 && (
        <>
          {/* Stat Cards */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} gap="1.5em" mb={6}>
            <Box p={4} bg={lightGray} rounded="md" shadow="sm">
              <Text fontSize="sm" fontWeight="medium">Total Vulnerabilities</Text>
              <Text fontSize="xl" fontWeight="bold">{metrics.total}</Text>
            </Box>
            <Box p={4} bg={lightGray} rounded="md" shadow="sm">
              <Text fontSize="sm" fontWeight="medium">Affected Images</Text>
              <Text fontSize="xl" fontWeight="bold">{metrics.affectedImages}</Text>
            </Box>
            <Box p={4} bg={lightGray} rounded="md" shadow="sm">
              <Text fontSize="sm" fontWeight="medium">Unique Packages</Text>
              <Text fontSize="xl" fontWeight="bold">{metrics.uniquePackages}</Text>
            </Box>
          </SimpleGrid>

          {/* Chart Grid */}
          <Text fontSize="lg" fontWeight="semibold" mb={3}>
            Charts & Visualizations
          </Text>
          <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={6}>
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <SeverityBarChart />
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <VulnerabilityTrend data={flattened} />
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <RiskFactorChart />
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <CorrelationHeatmap />
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default Dashboard
