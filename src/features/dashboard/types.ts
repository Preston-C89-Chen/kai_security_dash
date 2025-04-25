export interface DashboardMetrics {
  totalVulnerabilities: number
  severityCounts: Record<string, number>
  kaiStatusCounts: Record<string, number>
  affectedImages: number
  uniquePackages: number
}
