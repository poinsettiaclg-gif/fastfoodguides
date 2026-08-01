import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Get all markdown files
function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        getFiles(path.join(dir, file), filesList);
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      if (file !== 'README.md' && !dir.includes('.agents')) {
        filesList.push(path.join(dir, file));
      }
    }
  }
  return filesList;
}

const allMdFiles = getFiles('./src');

const requiredFields = [
  'title', 'description', 'pubDate', 'author', 'authorTitle',
  'chain', 'topic', 'heroImage', 'relatedArticles', 'faq'
];

let report = `# Frontmatter Integrity Audit\n\nGenerated on: ${new Date().toISOString()}\n\n`;

let totalFiles = 0;
let errorsFound = 0;

for (const file of allMdFiles) {
  totalFiles++;
  const content = fs.readFileSync(file, 'utf-8');
  let data, parseError;
  try {
    const parsed = matter(content);
    data = parsed.data;
  } catch (err) {
    parseError = err.message;
  }

  const issues = [];

  if (parseError) {
    issues.push(`**Parse Error** (Possible unescaped quotes or bad YAML): ${parseError}`);
  } else if (!data || Object.keys(data).length === 0) {
    issues.push('**Missing Frontmatter**: No YAML frontmatter found.');
  } else {
    // Check required fields
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        issues.push(`Missing or empty required field: \`${field}\``);
      }
    }

    // Check pubDate format
    if (data.pubDate) {
      const dateVal = new Date(data.pubDate);
      if (isNaN(dateVal.getTime())) {
        issues.push(`Invalid date format for \`pubDate\`: ${data.pubDate}`);
      }
    }

    // Check faq structure
    if (data.faq) {
      if (!Array.isArray(data.faq)) {
        issues.push(`\`faq\` is not an array`);
      } else {
        if (data.faq.length !== 2) {
          issues.push(`\`faq\` does not have exactly 2 items (found ${data.faq.length})`);
        }
        data.faq.forEach((item, index) => {
          if (!item.question || !item.answer) {
            issues.push(`FAQ item ${index + 1} is missing \`question\` or \`answer\``);
          }
        });
      }
    }
    
    // Check relatedArticles
    if (data.relatedArticles && !Array.isArray(data.relatedArticles)) {
      issues.push(`\`relatedArticles\` is not an array`);
    }
  }

  if (issues.length > 0) {
    errorsFound++;
    report += `## ${file}\n`;
    for (const issue of issues) {
      report += `- ${issue}\n`;
    }
    report += '\n';
  }
}

if (errorsFound === 0) {
  report += 'No frontmatter issues found! All files are compliant.\n';
}

fs.mkdirSync('./scratch/reports/round3', { recursive: true });
fs.writeFileSync('./scratch/reports/round3/frontmatter_audit.md', report);
console.log(`Audit complete. Found issues in ${errorsFound} out of ${totalFiles} files.`);
