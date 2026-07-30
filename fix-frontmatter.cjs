const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.md') || f.endsWith('.mdx')) {
    const filepath = path.join(dir, f);
    let content = fs.readFileSync(filepath, 'utf-8');
    if (content.includes(' description: "')) {
      // Find title: "..." description: "..." and split them
      content = content.replace(/^(title:\s*".*?")\s+description:\s+"/m, '$1\ndescription: "');
      fs.writeFileSync(filepath, content, 'utf-8');
    }
  }
});
console.log('Fixed frontmatter in markdown files');
