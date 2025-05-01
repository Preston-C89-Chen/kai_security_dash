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

const RiskFactorChart = (props) => {
  const { data } = props
  const [filter, setFilter] = useState('all')
  const chartData = useMemo(() => {
    const factorCounts: Record<string, number> = {}

    for (const vuln of data) {
      Object.keys(vuln.riskFactors || {}).forEach((key) => {
        factorCounts[key] = (factorCounts[key] || 0) + 1
      })
    }

    return Object.entries(factorCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }))
  }, [data])

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

      <ReactECharts option={option} style={{ height: 400 }} />
    </Box>
  )
}

export default RiskFactorChart