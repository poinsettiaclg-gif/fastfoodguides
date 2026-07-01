const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

let totalDeepLinksInjected = 0;

for (const file of files) {
    let content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    let frontmatter = parts[1];
    let body = parts.slice(2).join('---');
    
    // Parse relatedArticles
    const relatedMatch = frontmatter.match(/relatedArticles:\n([\s\S]*?)(?=\w+?:|---)/);
    if (!relatedMatch) continue;
    
    const relatedList = relatedMatch[1];
    const slugs = [];
    const regex = /-\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(relatedList)) !== null) {
        slugs.push(match[1]);
    }
    
    let modified = false;

    for (const slug of slugs) {
        const url = `/articles/${slug}/`;
        
        // Generate keywords from slug, e.g., "starbucks-mastrena-espresso-calibration"
        // 1. Full string with spaces: "starbucks mastrena espresso calibration"
        // 2. String without chain (assume first word is chain): "mastrena espresso calibration"
        // 3. Just the last two words: "espresso calibration"
        const words = slug.split('-');
        const keywords = [
            words.join(' '),
            words.slice(1).join(' '),
            words.slice(-2).join(' '),
            words.slice(-3).join(' ')
        ].filter(k => k.length > 5); // avoid tiny matches
        
        // Try matching largest keywords first
        keywords.sort((a, b) => b.length - a.length);

        for (const kw of keywords) {
            const escapedKw = kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            const searchRegex = new RegExp(`\\b${escapedKw}\\b`, 'gi');
            
            let found = false;
            let execMatch;
            
            while ((execMatch = searchRegex.exec(body)) !== null) {
                const index = execMatch.index;
                const before = body.slice(0, index);
                
                // Ensure not inside an existing markdown link or HTML tag
                const openBrackets = (before.match(/\[/g) || []).length;
                const closeBrackets = (before.match(/\]/g) || []).length;
                const lastOpenTag = before.lastIndexOf('<');
                const lastCloseTag = before.lastIndexOf('>');
                
                if (openBrackets === closeBrackets && lastOpenTag <= lastCloseTag) {
                    const after = body.slice(index + execMatch[0].length);
                    body = before + `[${execMatch[0]}](${url})` + after;
                    modified = true;
                    totalDeepLinksInjected++;
                    found = true;
                    break; // Inject only once per slug
                }
            }
            if (found) break; // Move to next slug if we successfully injected
        }
    }
    
    if (modified) {
        fs.writeFileSync(path.join(articlesDir, file), `---${frontmatter}---${body}`);
    }
}

console.log(`Injected ${totalDeepLinksInjected} deep inline links.`);
