import ReactECharts from 'echarts-for-react'
import { useSeverityChartData } from '@/features/dashboard/hooks'

const SeverityBarChart = () => {
  const data = useSeverityChartData()
  const option = {
    title: {
      text: 'Severity Breakdown',
      left: 'center',
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {},
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLabel: {
        fontSize: 8, // Adjusted font size to prevent clipping
        overflow: 'truncate', // Optional: to ensure long labels don't overflow
      },
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        data: data.map((d) => d.value),
        label: {
          show: true,
          position: 'right',
          fontSize: 8, // Optional: also reduce label font if needed
        },
        itemStyle: {
          color: '#3182CE', // Optional: consistent styling
        },
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 400 }} />
}

export default SeverityBarChart
