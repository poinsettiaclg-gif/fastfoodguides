const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

// Get all available images
const allImages = fs.readdirSync(imagesDir).filter(f => !fs.statSync(path.join(imagesDir, f)).isDirectory());

const articles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

for (const file of articles) {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // 1. Convert Pro Tips to Callout divs (more forgiving regex)
    const calloutRegex = /^\s*\*\*(Pro [tT]ip|Note|Insider [sS]ecret|[tT]ip):\*\*(.*)$/gm;
    if (calloutRegex.test(content)) {
        content = content.replace(calloutRegex, (match, type, text) => {
            const capitalizedType = type.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            return `\n<div class="callout callout-tip">\n<strong>${capitalizedType}:</strong>${text}\n</div>\n`;
        });
        changed = true;
    }

    // 2. Inject mid-article images if none exist
    const bodyMatch = content.split('---');
    if (bodyMatch.length >= 3) {
        const body = bodyMatch.slice(2).join('---');
        if (!body.includes('![') && !body.includes('<img')) {
            const chainMatch = content.match(/chain:\s*"([^"]+)"/);
            const chain = chainMatch ? chainMatch[1].toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
            
            const relevantImages = allImages.filter(img => 
                (chain && img.startsWith(chain)) || img.startsWith(file.replace('.md', ''))
            );

            if (relevantImages.length > 0) {
                const heroMatch = content.match(/heroImage:\s*src:\s*"?([^"\n]+)"?/);
                const heroSrc = heroMatch ? heroMatch[1] : '';
                
                let selectedImage = relevantImages.find(img => !heroSrc.includes(img));
                if (!selectedImage) selectedImage = relevantImages[0];

                const paragraphs = body.split(/\n\s*\n/);
                if (paragraphs.length > 4) {
                    const midIndex = Math.floor(paragraphs.length / 2);
                    const imageMarkdown = `\n\n![${chain} insider view](../../assets/images/${selectedImage})\n\n`;
                    paragraphs.splice(midIndex, 0, imageMarkdown);
                    
                    const newBody = paragraphs.join('\n\n');
                    content = bodyMatch[0] + '---' + bodyMatch[1] + '---' + newBody;
                    changed = true;
                }
            }
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        updatedCount++;
    }
}

console.log(`Successfully enriched ${updatedCount} articles with callouts and rich media.`);
