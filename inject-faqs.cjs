const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const articles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

let updated = 0;

for (const file of articles) {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if it already has FAQ
    if (content.includes('faq:\n')) continue;
    
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    const frontmatter = parts[1];
    const body = parts.slice(2).join('---');
    
    // Extract title
    const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract chain
    const chainMatch = frontmatter.match(/chain:\s*"([^"]+)"/);
    const chain = chainMatch ? chainMatch[1] : 'this restaurant';
    
    // Find all H2s
    const h2Regex = /^##\s+(.+)$/gm;
    let match;
    const h2s = [];
    while ((match = h2Regex.exec(body)) !== null) {
        h2s.push(match[1]);
    }
    
    if (h2s.length === 0) continue;
    
    // Generate 2 simple FAQs based on title and H2s
    const q1 = `What is the process for ${title.toLowerCase().replace(/the /g, '')}?`;
    const a1 = `As detailed in our guide, the process involves specific operational steps like ${h2s[0].toLowerCase()} to ensure efficiency and quality at ${chain}.`;
    
    const q2 = h2s.length > 1 ? `Why is ${h2s[1].toLowerCase()} important at ${chain}?` : `How does ${chain} handle operations efficiently?`;
    const a2 = h2s.length > 1 ? `It is a critical part of the standard operating procedure that helps maintain consistency across all ${chain} locations.` : `They use specialized equipment and strict training protocols to maximize throughput during peak hours.`;
    
    const faqYaml = `faq:\n  - question: "${q1}"\n    answer: "${a1}"\n  - question: "${q2}"\n    answer: "${a2}"\n`;
    
    // Inject into frontmatter
    const newFrontmatter = frontmatter + faqYaml;
    content = parts[0] + '---' + newFrontmatter + '---' + body;
    
    fs.writeFileSync(filePath, content, 'utf-8');
    updated++;
}

console.log(`Injected FAQ schema into ${updated} articles.`);
