const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'content', 'articles');
const files = [
  'mcdonalds-first-day-training.md',
  'chick-fil-a-first-day-training.md',
  'dominos-first-day-training.md',
  'five-guys-first-day-training.md',
  'starbucks-first-day-training.md',
  'subway-first-day-training.md',
  'taco-bell-first-day-training.md',
  'wendys-first-day-training.md'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\\'/g, "'");
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed YAML');
