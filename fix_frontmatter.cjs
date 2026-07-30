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
  
  if (content.startsWith('faq:')) {
    // It looks like:
    // faq:\n  - question: ...\n---\ntitle: ...\n---
    // We want to move everything before the first --- to inside the frontmatter.
    const parts = content.split('---');
    if (parts.length >= 3) {
      const faqBlock = parts[0];
      const restOfFrontmatter = parts[1];
      const body = parts.slice(2).join('---');
      
      const newContent = `---\n${restOfFrontmatter.trim()}\n${faqBlock.trim()}\n---\n${body.trimStart()}`;
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Fixed ' + file);
    }
  }
}
