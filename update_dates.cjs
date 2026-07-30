const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('updatedDate:')) continue;
  
  // Find the pubDate and insert updatedDate right after it
  content = content.replace(/(pubDate:\s*".*?")/g, '$1\nupdatedDate: "2026-07-23"');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log(`Updated ${files.length} articles with updatedDate`);
