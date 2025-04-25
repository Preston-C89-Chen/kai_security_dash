import { useAppSelector, RootState } from '@/app/hooks'
import { FlattenedVulnerability } from '@/features/vulnerabilities/types'
import { useMemo } from 'react'
import { format, parseISO } from 'date-fns'

export const useDashboardMetrics = () => {
  const flattened: FlattenedVulnerability = useAppSelector((state: RootState) => state.vulnerabilities.flattened)

  return useMemo(() => {
    if (!flattened || flattened.length === 0) return null

    const severityCounts: Record<string, number> = {}
    const kaiStatusCounts: Record<string, number> = {}
    const images = new Set<string>()
    const packages = new Set<string>()

    for (const vuln of flattened) {
      // Normalize case
      const severity = vuln.severity?.toLowerCase() || 'unknown'
      const kaiStatus = vuln.kaiStatus?.toLowerCase() || 'unknown'

      severityCounts[severity] = (severityCounts[severity] || 0) + 1
      kaiStatusCounts[kaiStatus] = (kaiStatusCounts[kaiStatus] || 0) + 1

      const imageKey = `${vuln.imageName}:${vuln.imageVersion}`
      const packageKey = `${vuln.packageName}@${vuln.packageVersion}`

      images.add(imageKey)
      packages.add(packageKey)
    }

    return {
      total: flattened.length,
      severityCounts,
      kaiStatusCounts,
      affectedImages: images.size,
      uniquePackages: packages.size,
    }
  }, [flattened])
}

export const useSeverityChartData = () => {
  const metrics = useDashboardMetrics()
  const rawCounts = metrics?.severityCounts ?? {}

  const normalized: Record<string, number> = {}

  Object.entries(rawCounts).forEach(([severity, count]) => {
    const key = (() => {
      const s = severity.toLowerCase()
      if (['critical', 'high', 'medium', 'low'].includes(s)) return s
      return 'unknown'
    })()

    normalized[key] = (normalized[key] || 0) + count
  })

  return Object.entries(normalized).map(([name, value]) => ({
    name: name.toUpperCase(),
    value,
  }))
}


export const useKaiStatusChartData = () => {
  const metrics = useDashboardMetrics()
  const rawCounts = metrics?.kaiStatusCounts ?? {}

  const normalized: Record<string, number> = {}

  Object.entries(rawCounts).forEach(([status, count]) => {
    const key = (() => {
      if (!status) return 'unknown'
      if (status.includes('open')) return 'open'
      if (status.includes('fixed')) return 'fixed'
      if (status.includes('pending')) return 'pending'
      return 'other'
    })()

    normalized[key] = (normalized[key] || 0) + count
  })

  return Object.entries(normalized).map(([name, value]) => ({ name, value }))
}

export const useStatusSeverityMatrix = () => {
  const flattened = useAppSelector((state: RootState) => state.vulnerabilities.flattened)

  return useMemo(() => {
    if (!flattened.length) return null

    const severities = ['critical', 'high', 'medium', 'low']
    const simplifiedStatuses = ['fixed', 'open', 'unknown']

    const normalizeStatus = (status: string | undefined) => {
      if (!status) return 'unknown'
      const s = status.toLowerCase()
      if (s.includes('fixed')) return 'fixed'
      if (s.includes('open')) return 'open'
      return 'unknown'
    }

    const matrix: [number, number, number][] = []
    for (let i = 0; i < severities.length; i++) {
      for (let j = 0; j < simplifiedStatuses.length; j++) {
        const count = flattened.filter(
          v =>
            (v.severity?.toLowerCase() ?? '') === severities[i] &&
            normalizeStatus(v.status) === simplifiedStatuses[j]
        ).length
        matrix.push([j, i, count])
      }
    }

    return {
      data: matrix,
      xLabels: simplifiedStatuses,
      yLabels: severities,
    }
  }, [flattened])
}


export const useRiskFactorFrequency = (data: FlattenedVulnerability)  => {
  return useMemo(() => {
    const riskMap: Record<string, number> = {}

    for (const vuln of data) {
      for (const factor of Object.keys(vuln.riskFactors || {})) {
        riskMap[factor] = (riskMap[factor] || 0) + 1
      }
    }

    return Object.entries(riskMap).map(([name, value]) => ({ name, value }))
  }, [data])
}

export const useVulnerabilityTrend = (data: FlattenedVulnerability) => {
  return useMemo(() => {
    if (!data || data.length === 0) return []

    const monthlyCounts: Record<string, number> = {}

    for (const vuln of data) {
      const rawDate = vuln.published || vuln.fixDate || vuln.layerTime || ''
      const date = new Date(rawDate)

      if (isNaN(date.getTime())) continue // skip invalid dates

      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      monthlyCounts[yearMonth] = (monthlyCounts[yearMonth] || 0) + 1
    }

    return Object.entries(monthlyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vulnerabilities]) => ({ date, vulnerabilities }))
  }, [data])
}

export const useCriticalCvesData = () => {
  const flattened = useAppSelector((state) => state.vulnerabilities.flattened)

  const result = flattened
    .filter((v) => v.severity === 'critical')
    .map((v) => ({
      name: v.cve,
      value: [
        v.affectedImages?.length ?? 1,
        v.affectedPackages?.length ?? 1,
        v.exploitCount ?? 1,
      ],
      severity: v.severity,
    }))

  return result.sort((a, b) => b.value[2] - a.value[2]).slice(0, 15)
}