const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

// Build dictionary of slugs and titles/keywords
const dictionary = [];

for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    if (!titleMatch) continue;
    
    const slug = file.replace('.md', '');
    const title = titleMatch[1];
    
    // Create variations of the title to use as keywords
    let keyword = title.toLowerCase();
    
    // Remove common stop words from the start of the title
    keyword = keyword.replace(/^(the|a|an|how to|why|what is)\s+/, '');
    // Clean up punctuation
    keyword = keyword.replace(/[^\w\s-]/g, '').trim();
    
    if (keyword.length > 5) {
        dictionary.push({
            slug: slug,
            keyword: keyword,
            originalFile: file
        });
    }
}

// Sort dictionary by keyword length descending (so longer phrases match first)
dictionary.sort((a, b) => b.keyword.length - a.keyword.length);

let totalLinksInjected = 0;

for (const file of files) {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    const frontmatter = parts[1];
    let body = parts.slice(2).join('---');
    
    let linksAddedThisFile = 0;
    const MAX_LINKS = 3; // Keep it natural
    
    for (const entry of dictionary) {
        if (linksAddedThisFile >= MAX_LINKS) break;
        if (entry.originalFile === file) continue; // Don't link to self
        
        // Find the keyword in the body.
        // We use a regex that looks for the keyword surrounded by word boundaries,
        // and importantly, ENSURES it is not already inside a markdown link [like this](url).
        // Negative lookahead to ensure we aren't inside `[]` or `()` or HTML tags
        const regexStr = `\\b(${entry.keyword})\\b(?![^\\[]*\\])(?![^<]*>)`;
        const regex = new RegExp(regexStr, 'i'); // Case insensitive
        
        if (regex.test(body)) {
            // Replace only the FIRST occurrence
            body = body.replace(regex, `[$1](/articles/${entry.slug})`);
            linksAddedThisFile++;
            totalLinksInjected++;
        }
    }
    
    if (linksAddedThisFile > 0) {
        const newContent = parts[0] + '---' + frontmatter + '---' + body;
        fs.writeFileSync(filePath, newContent, 'utf-8');
    }
}

console.log(`Internal linking complete. Injected ${totalLinksInjected} internal links across ${files.length} articles.`);
