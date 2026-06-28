const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let processed = 0;

files.forEach(f => {
  const filepath = path.join(dir, f);
  const content = fs.readFileSync(filepath, 'utf-8');
  
  // Basic frontmatter split
  const match = content.match(/^(---[\s\S]*?\n---\n)([\s\S]*)$/);
  if (!match) return;

  const [_, frontmatter, body] = match;
  
  if (frontmatter.includes('faq:')) {
    // Already has faq
    return;
  }

  // Look for headings ending in "?" followed by paragraph
  const faqRegex = /^##\s+([^?\n]+\?)\s*\n+([^#\n][\s\S]*?(?=\n\n|\n##|$))/gm;
  
  const faqs = [];
  let m;
  while ((m = faqRegex.exec(body)) !== null) {
    const question = m[1].trim();
    // Clean up the answer (remove internal newlines, extra spaces)
    const answer = m[2].trim().replace(/\n/g, ' ').replace(/\s{2,}/g, ' ');
    if (answer.length > 20 && !answer.startsWith('>')) { // Basic filter
      faqs.push({ question, answer });
    }
  }

  if (faqs.length > 0) {
    // Inject into frontmatter
    let faqYaml = 'faq:\n';
    faqs.forEach(item => {
      faqYaml += `  - question: "${item.question.replace(/"/g, '\\"')}"\n`;
      faqYaml += `    answer: "${item.answer.replace(/"/g, '\\"')}"\n`;
    });

    const newFrontmatter = frontmatter.replace(/\n---\n$/, `\n${faqYaml}---\n`);
    fs.writeFileSync(filepath, newFrontmatter + body, 'utf-8');
    processed++;
    console.log(`Added ${faqs.length} FAQs to ${f}`);
  }
});

console.log(`Done. Processed ${processed} files.`);
