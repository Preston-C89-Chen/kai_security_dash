// src/features/dashboard/dashboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DashboardMetrics } from './types'
import { FlattenedVulnerability } from '@/features/vulnerabilities/types'

interface DashboardState {
  metrics: DashboardMetrics | null
}

const initialState: DashboardState = {
  metrics: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    computeDashboardMetrics(
      state,
      action: PayloadAction<FlattenedVulnerability[]>
    ) {
      const vulns = action.payload

      const severityCounts: Record<string, number> = {}
      const kaiStatusCounts: Record<string, number> = {}
      const packages = new Set<string>()
      const images = new Set<string>()

      for (const vuln of vulns) {
        const severity = vuln.severity.toLowerCase()
        const status = vuln.status.toLowerCase()

        severityCounts[severity] = (severityCounts[severity] || 0) + 1
        kaiStatusCounts[status] = (kaiStatusCounts[status] || 0) + 1

        packages.add(`${vuln.packageName}@${vuln.packageVersion}`)
        images.add(`${vuln.imageName}:${vuln.imageVersion}`)
      }

      state.metrics = {
        totalVulnerabilities: vulns.length,
        severityCounts,
        kaiStatusCounts,
        affectedImages: images.size,
        uniquePackages: packages.size,
      }
    },
  },
})

export const { computeDashboardMetrics } = dashboardSlice.actions
export default dashboardSlice.reducer
