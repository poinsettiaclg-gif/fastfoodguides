const fs = require('fs');
const files = fs.readdirSync('src/content/articles');
for (const f of files) {
  if (!f.endsWith('.md')) continue;
  let text = fs.readFileSync('src/content/articles/' + f, 'utf8');
  let newText = text.replace(/(question|answer):\s*"(.*)"$/gm, (match, key, val) => {
    const safeVal = val.replace(/"/g, "'");
    return `${key}: "${safeVal}"`;
  });
  if (text !== newText) fs.writeFileSync('src/content/articles/' + f, newText);
}
