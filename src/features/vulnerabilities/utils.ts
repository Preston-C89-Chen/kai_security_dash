import { VulnerabilityRoot,FlattenedVulnerability } from "./types";

export const flattenVulnerabilities = (
  root: VulnerabilityRoot
): FlattenedVulnerability[] => {
  const flattened: FlattenedVulnerability[] = []
  if (!root || typeof root !== 'object' || !root.groups) return flattened

  for (const [groupKey, group] of Object.entries(root.groups ?? {})) {
    for (const [repoKey, repo] of Object.entries(group.repos ?? {})) {
      for (const [imageKey, image] of Object.entries(repo.images ?? {})) {
        const imageName = image?.name ?? '(unknown image)'
        const imageVersion = imageKey // 💡 use the key

        const vulns = image?.vulnerabilities
        if (!Array.isArray(vulns)) continue

        for (const vuln of vulns) {
          if (!vuln?.cve) continue

          flattened.push({
            ...vuln,
            groupName: groupKey,
            repoName: repoKey,
            imageName,
            imageVersion,
          })
        }
      }
    }
  }

  return flattened
}

export const multiIncludesFilter = (
  row: { getValue: (columnId: string) => unknown },
  columnId: string,
  filterValue: unknown
): boolean => {
  const cellValue = row.getValue(columnId)

  // Expecting filterValue to be an array of strings
  if (!Array.isArray(filterValue)) return false
  if (typeof cellValue !== 'string') return false

  return filterValue.includes(cellValue)
}

export function downloadJSON(data: any, filename = 'data.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
}

export function downloadCSV(data: any[], filename = 'data.csv') {
  if (!data.length) return

  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row => headers.map(field => JSON.stringify(row[field] ?? '')).join(','))
  ]

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
