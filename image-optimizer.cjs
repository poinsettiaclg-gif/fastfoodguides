const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

let totalImagesUpdated = 0;

for (const file of files) {
    let content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    let modified = false;

    // Replace ![Alt Text](/images/filename.ext) with ![Alt Text](../../assets/images/filename.ext)
    const newContent = content.replace(/!\[([^\]]*)\]\(\/images\/([^)]+)\)/g, (match, alt, filename) => {
        modified = true;
        totalImagesUpdated++;
        return `![${alt}](../../assets/images/${filename})`;
    });

    if (modified) {
        fs.writeFileSync(path.join(articlesDir, file), newContent);
    }
}

console.log(`Updated ${totalImagesUpdated} image paths to use Astro assets optimizer.`);
