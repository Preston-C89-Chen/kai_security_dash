import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Input,
  Portal,
  Grid,
  GridItem,
  Switch, 
  HStack 
} from '@chakra-ui/react'
import { useState, useMemo } from 'react'
import { useColorModeValue } from '@/components/ui/color-mode'
import { useProgressiveLoadVulnerabilities } from '@/features/vulnerabilities/hooks'
import { useDashboardMetrics } from '@/features/dashboard/hooks'
import SeverityBarChart from '@/components/charts/SeverityBarChart'
import CorrelationHeatmap from '@/components/charts/CorrelationHeatmap'
import VulnerabilityTrendChart from '@/components/charts/VulnerabilityTrend'
import RiskFactorChart from '@/components/charts/RiskFactorChart'
import VulnerabilityMarimekko from '@/components/charts/VulnerabilityMarimeko'
import { Select } from '@chakra-ui/react' // or your custom Select
import { severityCollection, kaiStatusCollection } from '@/features/vulnerabilities/components/VulnerabilityTable' // assuming you have these

const Dashboard = () => {
  const { flattened, isLoading, hasNextPage, isError } = useProgressiveLoadVulnerabilities()
  const [globalFilter, setGlobalFilter] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string[]>([])
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const loadingState = isLoading && flattened.length === 0
  const kaiStatusOptions = ['invalid - norisk', 'ai-invalid-norisk']
  const [kaiStatusFilter, setKaiStatusFilter] = useState<string[]>([])

  const filteredVulnerabilities = useMemo(() => {
    return flattened.filter((vuln) => {
      const matchesGlobal = globalFilter
        ? vuln.cve.includes(globalFilter) ||
          vuln.packageName.includes(globalFilter) ||
          vuln.imageName.includes(globalFilter)
        : true

      const matchesSeverity = severityFilter.length
        ? severityFilter.includes(vuln.severity)
        : true

      const matchesKaiStatus = kaiStatusFilter.length
        ? !kaiStatusFilter.includes(vuln.kaiStatus || '')
        : true

      return matchesGlobal && matchesSeverity && matchesKaiStatus
    })
  }, [flattened, globalFilter, severityFilter, kaiStatusFilter])

  const metrics = useDashboardMetrics(filteredVulnerabilities)

  const renderMetrics = () => {
    const accessors = [
      { key: 'total', label: 'Vulnerabilities' },
      { key: 'affectedImages', label: 'Affected Images' },
      { key: 'uniquePackages', label: 'Unique Packages' },
    ]
    return (
      <>
        {accessors.map((accessor) => (
          <Box key={accessor.key} p={4} bg="gray.100" rounded="md" shadow="sm">
            <Text fontSize="sm" fontWeight="medium">
              Total {accessor.label}
            </Text>
            {loadingState ? (
              <Box textAlign="center" py={10}>
                <Spinner size="xl" />
              </Box>
            ) : (
              <Text fontSize="xl" fontWeight="bold">{metrics?.[accessor.key]}</Text>
            )}
          </Box>
        ))}
      </>
    )
  }

  return (
    <Box>
      <Heading mb={6}>📊 Dashboard Overview</Heading>
      {isError && !loadingState && (
        <Text color="red.500" textAlign="center">
          Failed to load vulnerabilities.
        </Text>
      )}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="1em" mb={6}>
        {renderMetrics()}
      </SimpleGrid>
      {loadingState && (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" />
        </Box>
      )}

    <Flex mb={4} gap={4} wrap="wrap" align="center">
      {/* Severity Filter */}
      <Select.Root
        multiple
        deselectable
        value={severityFilter}
        onValueChange={(e) => {
          const value = e.value as string[]; 
          setSeverityFilter(value)
        }}
        collection={severityCollection}
        size="sm"
        width="200px"
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Filter by Severity" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {severityCollection.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Box>
        <HStack spacing={4}>
          {kaiStatusOptions.map((status) => {
            const isChecked = kaiStatusFilter.includes(status)
            return (
              <HStack key={status} align="center">
                          <Switch.Root
              checked={isChecked}
              onCheckedChange={({ checked }) => {
                setKaiStatusFilter((prev) =>
                  checked
                ? prev.includes(status) ? prev : [...prev, status]
                : prev.filter((s) => s !== status)
                )
              }}
            >
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Label fontSize="sm">{status}</Switch.Label>
            </Switch.Root>
              </HStack>
            )
          })}
        </HStack>
      </Box>
      <Text fontSize="sm" color="gray.500">
        Showing {filteredVulnerabilities.length} results
      </Text>
    </Flex>

      {!loadingState && filteredVulnerabilities.length > 0 && (
        <>
          <Text fontSize="lg" fontWeight="semibold" mb={3}>
            Charts & Visualizations {hasNextPage && <Spinner size="sm" />}
          </Text>
          <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={6}>
          <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <RiskFactorChart data={filteredVulnerabilities} />
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <VulnerabilityTrendChart  data={filteredVulnerabilities} />
              </Box>
            </GridItem>
          
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <VulnerabilityMarimekko  data={filteredVulnerabilities} />
              </Box>
            </GridItem>
  
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <SeverityBarChart/>
              </Box>
            </GridItem>
        
            <GridItem>
              <Box p={4} border="1px dashed" borderColor={borderColor} rounded="md">
                <CorrelationHeatmap/>
              </Box>
            </GridItem>


          </Grid>
        </>
      )}
    </Box>
  )
}

export default Dashboard
