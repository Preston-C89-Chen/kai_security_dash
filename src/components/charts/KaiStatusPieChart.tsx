import ReactECharts from 'echarts-for-react'
import { useKaiStatusChartData } from '@/features/dashboard/hooks'

const KaiStatusBarChart = () => {
  const data = useKaiStatusChartData()

  const option = {
    title: {
      text: 'Kai Status Overview',
      left: 'center',
    },
    tooltip: {},
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.name),
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        data: data.map((d) => d.value),
        label: {
          show: true,
          position: 'right',
        },
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 400 }} />
}

export default KaiStatusBarChart
