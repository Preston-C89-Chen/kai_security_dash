export interface RiskFactors {
  [key: string]: Record<string, never>
}

export interface Vulnerability {
  cve: string
  severity: string
  cvss: number
  status: string
  description: string
  riskFactors: RiskFactors
  link: string
  packageName: string
  packageVersion: string
  fixDate: string
  published: string
  kaiStatus: string
}

export interface Image {
  name: string
  version: string
  vulnerabilities: Vulnerability[]
}

export interface Repo {
  name: string
  images: Record<string, Image>
}

export interface Group {
  name: string
  repos: Record<string, Repo>
}

export interface VulnerabilityRoot {
  name: string
  groups: Record<string, Group>
}

export interface FlattenedVulnerability extends Vulnerability {
  groupName: string
  repoName: string
  imageName: string
  imageVersion: string
}

