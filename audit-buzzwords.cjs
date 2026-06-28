const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const buzzwords = [
  'delve', 'embark', 'navigate', 'elevate', 'synergize', 'facilitate',
  'crucial', 'robust', 'seamless', 'dynamic', 'innovative', 'transformative',
  'tapestry', 'landscape', 'testament', 'paradigm',
  'moreover', 'furthermore', 'in conclusion', 'to summarize'
];

let totalHits = 0;
let filesWithHits = 0;

files.forEach(f => {
  const filepath = path.join(dir, f);
  const content = fs.readFileSync(filepath, 'utf-8').toLowerCase();
  
  let hitInFile = false;
  buzzwords.forEach(word => {
    // Basic regex to find the word as a whole word
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = content.match(regex);
    if (matches) {
      totalHits += matches.length;
      hitInFile = true;
    }
  });
  if (hitInFile) filesWithHits++;
});

console.log(`Audited ${files.length} articles.`);
console.log(`Found ${totalHits} total AI buzzwords across ${filesWithHits} files.`);
