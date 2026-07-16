const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const imagesBaseDir = path.join(__dirname, 'src', 'assets', 'images');
const articles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

let updated = 0;

for (const file of articles) {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    const frontmatter = parts[1];
    let body = parts.slice(2).join('---');
    
    // Check if body already has a markdown image
    if (body.match(/!\[.*?\]\(.*?\)/)) continue;
    
    // Extract chain from frontmatter to find image folder
    const chainMatch = frontmatter.match(/chain:\s*"([^"]+)"/);
    if (!chainMatch) continue;
    
    let chainSlug = chainMatch[1].toLowerCase().replace(/['\.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    // Some chains have specific mappings or slightly different names in assets
    if (chainSlug === 'chick-fil-a') chainSlug = 'chick-fil-a';
    
    const chainImagesDir = path.join(imagesBaseDir, chainSlug);
    let imageFound = null;
    let fallbackDir = null;
    
    if (fs.existsSync(chainImagesDir)) {
        const files = fs.readdirSync(chainImagesDir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));
        if (files.length > 0) {
            imageFound = files[0];
            fallbackDir = chainSlug;
        }
    }
    
    // If no chain-specific folder, try to grab one from general
    if (!imageFound && fs.existsSync(path.join(imagesBaseDir, 'general'))) {
         const genFiles = fs.readdirSync(path.join(imagesBaseDir, 'general')).filter(f => f.endsWith('.webp') || f.endsWith('.png'));
         if (genFiles.length > 0) {
             imageFound = genFiles[0];
             fallbackDir = 'general';
         }
    }
    
    if (imageFound && fallbackDir) {
        // Inject image after first H2
        const imgMarkdown = `\n![Inside the ${chainMatch[1]} operation](../../assets/images/${fallbackDir}/${imageFound})\n`;
        body = body.replace(/(## [^\n]+)/, `$1\n${imgMarkdown}`);
        
        content = parts[0] + '---' + frontmatter + '---' + body;
        fs.writeFileSync(filePath, content, 'utf-8');
        updated++;
        console.log(`Injected image for ${file}`);
    } else {
        console.log(`No image found for ${file} (chain: ${chainSlug})`);
    }
}

console.log(`Added body images to ${updated} articles.`);
