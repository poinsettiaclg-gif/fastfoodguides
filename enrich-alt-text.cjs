const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;
    
    // Replace generic "Inside the X operation" with SEO rich text based on the slug
    // e.g. "Inside the Sweetgreen operation" -> "Detailed operational view of the Sweetgreen kitchen and assembly process"
    content = content.replace(/!\[Inside the ([^\]]+) operation\]/g, (match, chainName) => {
        return `![Detailed operational view of the ${chainName} kitchen, assembly process, and station layout]`;
    });

    // Replace short generic alt text
    content = content.replace(/!\[(.*?)\]/g, (match, altText) => {
        if (altText.split(' ').length <= 4 && !altText.toLowerCase().includes('detailed')) {
            return `![Detailed technical view of ${altText} equipment and operational workflow]`;
        }
        return match;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        updatedCount++;
    }
}

console.log(`Enriched alt text in ${updatedCount} articles.`);
