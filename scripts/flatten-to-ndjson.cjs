const fs = require('fs')
const path = require('path')

// Adjust these paths
const inputPath = path.resolve(__dirname, '../public/data/ui_demo_flattened.json')
const outputPath = path.resolve(__dirname, '../public/data/ui_demo.ndjson')

// Read the flattened JSON array
const rawData = fs.readFileSync(inputPath, 'utf-8')
const vulnerabilities = JSON.parse(rawData)

// Build NDJSON
const ndjson = vulnerabilities.map((vuln) => JSON.stringify(vuln)).join('\n')

// Write NDJSON file
fs.writeFileSync(outputPath, ndjson, 'utf-8')

console.log(`✅ NDJSON file written to ${outputPath}`)
