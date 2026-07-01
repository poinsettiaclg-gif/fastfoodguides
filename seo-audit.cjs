const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

console.log('--- SEO METADATA AUDIT ---');
let totalAudited = 0;
let titleWarnings = 0;
let descWarnings = 0;

for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    const frontmatter = parts[1];
    const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
    const descMatch = frontmatter.match(/description:\s*"([^"]+)"/);
    
    if (titleMatch && descMatch) {
        totalAudited++;
        const title = titleMatch[1];
        const desc = descMatch[1];
        
        let hasWarning = false;
        
        if (title.length > 60) {
            console.log(`[WARNING] Title too long (${title.length} chars): ${file}`);
            titleWarnings++;
            hasWarning = true;
        }
        
        if (desc.length < 120 || desc.length > 160) {
            console.log(`[WARNING] Description length (${desc.length} chars) outside 120-160 range: ${file}`);
            descWarnings++;
            hasWarning = true;
        }
    }
}

console.log('\n--- AUDIT SUMMARY ---');
console.log(`Total Articles Audited: ${totalAudited}`);
console.log(`Title Warnings (>60 chars): ${titleWarnings}`);
console.log(`Description Warnings (<120 or >160 chars): ${descWarnings}`);
