const fs = require('fs');
const path = require('path');

function replaceInFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  let original = content;

  // Replace image references for the webp image that we are swapping for a png
  content = content.replace(/mcdonalds-platen-grill\.webp/g, 'generic_clamshell_grill.png');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Updated ${filepath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walkDir(p);
    } else if (p.endsWith('.astro') || p.endsWith('.md') || p.endsWith('.mdx')) {
      replaceInFile(p);
    }
  }
}

walkDir('src/content');
walkDir('src/components');
walkDir('src/layouts');
walkDir('src/pages');
