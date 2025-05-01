import { flattenVulnerabilities } from "../utils";
import { VulnerabilityRoot } from "../types";
import mockData from '../__mocks__/mock_vulnerability_data.json'
// const mockData: VulnerabilityRoot = {
//   name: 'test-data',
//   groups: {
//     group1: {
//       name: 'Group One',
//       repos: {
//         repo1: {
//           name: 'Repo One',
//           images: {
//             '1.0': {
//               name: 'image-one',
//               version: '1.0',
//               vulnerabilities: [
//                 {
//                   cve: 'CVE-1234',
//                   severity: 'high',
//                   cvss: 9.1,
//                   status: 'unfixed',
//                   description: 'Buffer overflow',
//                   riskFactors: { attackVector: {} },
//                   link: 'https://example.com',
//                   packageName: 'libexample',
//                   packageVersion: '1.2.3',
//                   fixDate: '2023-01-01',
//                   published: '2022-12-01',
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//   },
// }

describe('flattenVulnerabilities()', () => {
  it('should flatten nested vulnerabilities with metadata', () => {
    const flatData = flattenVulnerabilities(mockData)
    expect(flatData.length).toBeGreaterThan(0)
  })
})