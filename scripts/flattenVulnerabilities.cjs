// flattenVulnerabilities.js

// Use CommonJS require syntax
const fs = require('fs');
const path = require('path');

// Define the function locally (no export needed if only used in this file)
const flattenVulnerabilities = (root) => {
  const flattened = [];
  // Use optional chaining and nullish coalescing (supported in modern Node.js)
  if (!root || typeof root !== 'object' || !root.groups) return flattened;

  for (const [groupKey, group] of Object.entries(root.groups ?? {})) {
    for (const [repoKey, repo] of Object.entries(group.repos ?? {})) {
      for (const [imageKey, image] of Object.entries(repo.images ?? {})) {
        const imageName = image?.name ?? '(unknown image)';
        const imageVersion = imageKey; // Use the key as the version

        const vulns = image?.vulnerabilities;
        if (!Array.isArray(vulns)) continue;

        for (const vuln of vulns) {
          // Skip if vulnerability doesn't have a CVE identifier
          if (!vuln?.cve) continue;

          flattened.push({
            ...vuln, // Spread existing vulnerability details
            groupName: groupKey,
            repoName: repoKey,
            imageName,
            imageVersion,
          });
        }
      }
    }
  }

  return flattened;
};

// __dirname is available in CommonJS modules
// Adjust the path relative to where this script will be saved
const inputPath = path.resolve(__dirname, '../public/data/ui_demo.json');

// Path where the flattened file will be saved
const outputPath = path.resolve(__dirname, '../public/data/ui_demo_flattened.json');

// Main execution logic using async/await (supported in modern Node.js)
async function main() {
  try {
    console.log(`Reading raw vulnerability data from: ${inputPath}`);
    // Read and parse the JSON file
    const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

    console.log('Flattening vulnerabilities...');
    const flattened = flattenVulnerabilities(rawData);

    console.log(`Writing ${flattened.length} flattened vulnerabilities to: ${outputPath}`);
    // Write the flattened data to a new JSON file, formatted nicely
    fs.writeFileSync(outputPath, JSON.stringify(flattened, null, 2), 'utf-8');

    console.log(`✅ Flattened vulnerabilities saved successfully.`);
  } catch (error) {
    console.error('❌ Failed to flatten vulnerabilities:', error);
    // Exit with an error code if something goes wrong
    process.exit(1);
  }
}

// Run the main function
main();