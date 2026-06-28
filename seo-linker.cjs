const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

// 1. Gather all unique chains
const chains = new Set();
for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const match = content.match(/^chain:\s*"([^"]+)"/m);
    if (match) {
        chains.add(match[1]);
    }
}

// 2. Slugify function
function slugify(text) {
    return text.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Sort chains by length descending so we match "Panera Bread" before "Panera" (if both existed)
const chainArray = Array.from(chains).sort((a,b) => b.length - a.length);

let totalLinksInjected = 0;

for (const file of files) {
    let content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    
    // separate frontmatter from body
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    let frontmatter = parts[1];
    let body = parts.slice(2).join('---');
    
    // get current article's chain so we don't link to ourselves endlessly
    const currentChainMatch = frontmatter.match(/^chain:\s*"([^"]+)"/m);
    const currentChain = currentChainMatch ? currentChainMatch[1] : null;

    let modified = false;

    for (const chain of chainArray) {
        if (chain === currentChain) continue;

        const slug = slugify(chain);
        const url = `/articles/chain/${slug}`;
        
        // Escape special chars in chain name
        const escapedChain = chain.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        
        // Word boundary regex
        const regex = new RegExp(`\\b${escapedChain}\\b`, 'gi');
        
        let match;
        let matchFoundAndSafe = false;
        
        // We will loop through matches using regex.exec
        while ((match = regex.exec(body)) !== null) {
            const index = match.index;
            const before = body.slice(0, index);
            
            // Are we inside a link definition?
            const openBrackets = (before.match(/\[/g) || []).length;
            const closeBrackets = (before.match(/\]/g) || []).length;
            const openParens = (before.match(/\(/g) || []).length;
            const closeParens = (before.match(/\)/g) || []).length;
            
            // Check for HTML tags
            const lastOpenTag = before.lastIndexOf('<');
            const lastCloseTag = before.lastIndexOf('>');
            const insideHtmlTag = lastOpenTag > lastCloseTag;
            
            if (openBrackets === closeBrackets && openParens === closeParens && !insideHtmlTag) {
                // Safe to replace
                const after = body.slice(index + match[0].length);
                body = before + `[${match[0]}](${url})` + after;
                modified = true;
                totalLinksInjected++;
                matchFoundAndSafe = true;
                break; // only one link per chain per article
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(path.join(articlesDir, file), `---${frontmatter}---${body}`);
    }
}

console.log(`Injected ${totalLinksInjected} internal links across ${files.length} articles.`);
