const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir);

// First build a map of slug -> title
const titleMap = {};
files.forEach(f => {
  if (f.endsWith('.md') || f.endsWith('.mdx')) {
    const content = fs.readFileSync(path.join(dir, f), 'utf-8');
    const match = content.match(/^title:\s*"(.*?)"/m);
    if (match) {
      let title = match[1].replace(/\\"/g, '"');
      titleMap[f.replace('.md', '').replace('.mdx', '')] = title;
    }
  }
});

// Now replace in all files
let count = 0;
files.forEach(f => {
  if (f.endsWith('.md') || f.endsWith('.mdx')) {
    const filepath = path.join(dir, f);
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // The broken pattern usually has \ in it, but we can just fix ALL internal article links
    // that have the exact pattern [text](/articles/slug/) to use the correct title from the map.
    const regex = /\[.*?\]\(\/articles\/([^/]+)\/\)/g;
    let modified = false;
    
    const newContent = content.replace(regex, (match, slug) => {
      if (titleMap[slug]) {
        modified = true;
        return `[${titleMap[slug]}](/articles/${slug}/)`;
      }
      return match;
    });
    
    // Also fix newlines in titles in frontmatter that got wrapped
    const frontmatterRegex = /^(title:\s*".*?)\n(.*?")/m;
    const finalContent = newContent.replace(frontmatterRegex, (match, p1, p2) => {
      modified = true;
      return `${p1} ${p2.trim()}`;
    });

    if (modified) {
      fs.writeFileSync(filepath, finalContent, 'utf-8');
      count++;
    }
  }
});

console.log(`Fixed ${count} markdown files.`);
