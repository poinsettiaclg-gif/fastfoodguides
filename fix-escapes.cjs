const fs = require('fs');
fs.readdirSync('src/content/articles').forEach(f => {
  if (!f.endsWith('.md')) return;
  let t = fs.readFileSync('src/content/articles/'+f, 'utf8');
  let nt = t.replace(/\\'/g, "'");
  if (t !== nt) fs.writeFileSync('src/content/articles/'+f, nt);
});
