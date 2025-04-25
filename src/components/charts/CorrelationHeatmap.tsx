import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useStatusSeverityMatrix } from '@/features/Dashboard/hooks'

const SeverityStatusHeatmap = () => {
  const result = useStatusSeverityMatrix()
  if (!result) return null

  const { data, xLabels, yLabels } = result

  const option = {
    tooltip: { position: 'top' },
    grid: { left: '10%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: xLabels, splitArea: { show: true } },
    yAxis: { type: 'category', data: yLabels, splitArea: { show: true } },
    title: {
      text: 'Severity and Status Matrix',
      left: 'center',  // or 'left'/'right'
      top: 'top',      // optional (default is top)
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: Math.max(...data.map(d => d[2])),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
    },
    series: [
      {
        name: 'Vulnerabilities',
        type: 'heatmap',
        data,
        label: { show: true },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 400 }} />
}


export default SeverityStatusHeatmap