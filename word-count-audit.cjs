const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

let counts = [];

files.forEach(f => {
  const filepath = path.join(dir, f);
  const content = fs.readFileSync(filepath, 'utf-8');
  
  // Strip frontmatter
  const match = content.match(/^(---[\s\S]*?\n---\n)([\s\S]*)$/);
  let body = content;
  if (match) {
    body = match[2];
  }
  
  // Very basic word count (split by whitespace)
  const words = body.split(/\s+/).filter(w => w.length > 0).length;
  counts.push({ file: f, words });
});

counts.sort((a, b) => a.words - b.words);

const under500 = counts.filter(c => c.words < 500).length;
const under1000 = counts.filter(c => c.words >= 500 && c.words < 1000).length;
const over1000 = counts.filter(c => c.words >= 1000).length;

console.log(`Total Articles: ${counts.length}`);
console.log(`Under 500 words (Thin): ${under500}`);
console.log(`500 - 1000 words: ${under1000}`);
console.log(`Over 1000 words: ${over1000}`);

console.log('\nTop 10 shortest articles:');
counts.slice(0, 10).forEach(c => {
  console.log(`${c.file}: ${c.words} words`);
});
