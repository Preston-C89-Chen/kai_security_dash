import {
  Box,
  Heading,
  Flex,
  Select,
  createListCollection,
  Portal,
} from '@chakra-ui/react'
import { useColorModeValue } from "@/components/ui/color-mode"
import ReactECharts from 'echarts-for-react'
import { useState, useMemo } from 'react'
import { useAppSelector } from '@/app/hooks'

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Severity: Critical', value: 'severity:critical' },
  { label: 'Severity: High', value: 'severity:high' },
  { label: 'Status: Fixed', value: 'status:fixed' },
]

const filterCollection = createListCollection({ items: filterOptions })

const RiskFactorChart = () => {
  const data = useAppSelector((state) => state.vulnerabilities.flattened)
  const [filter, setFilter] = useState('all')

  const filteredData = useMemo(() => {
    // If it's an array (unexpected), take the first item
    const rawFilter = Array.isArray(filter) ? filter[0] : filter
  
    if (rawFilter === 'all') return data
  
    const [dimension, value] = rawFilter.split(':')
    return data.filter((vuln) => {
      if (dimension === 'severity') {
        return vuln.severity?.toLowerCase() === value
      }
      if (dimension === 'status') {
        return vuln.status?.toLowerCase().includes(value)
      }
      return true
    })
  }, [data, filter])

  const chartData = useMemo(() => {
    const factorCounts: Record<string, number> = {}

    for (const vuln of filteredData) {
      Object.keys(vuln.riskFactors || {}).forEach((key) => {
        factorCounts[key] = (factorCounts[key] || 0) + 1
      })
    }

    return Object.entries(factorCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }))
  }, [filteredData])

  const option = {
    title: {
      text: 'Risk Factor Frequency',
      left: 'center',
      textStyle: {
        color: useColorModeValue('#2D3748', '#E2E8F0'),
      },
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: chartData.map((item) => item.name),
      axisLabel: {
        rotate: 30,
        fontSize: 8,
        overflow: 'truncate',
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: chartData.map((item) => item.value),
        itemStyle: {
          color: useColorModeValue('#3182CE', '#90CDF4'),
        },
      },
    ],
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h3" size="md">
          Risk Factors by Frequency
        </Heading>

          <Select.Root
            value={filter}
            onValueChange={(e) => setFilter(e.value)} // e.value will be a string
            size="sm"
            width="250px"
            collection={filterCollection}
          >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Filter" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {filterCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Flex>

      <ReactECharts option={option} style={{ height: 400 }} />
    </Box>
  )
}

export default RiskFactorChart