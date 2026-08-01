const fs = require('fs');
const path = require('path');
const dir = 'src/content/articles';
const files = fs.readdirSync(dir).filter(f => f.startsWith('mcdonalds-') || f.startsWith('burger-king-'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const parts = content.split('---');
  if (parts.length < 3) return console.log(file, 'Missing frontmatter');
  
  const frontmatter = parts[1];
  const body = parts.slice(2).join('---');
  
  const words = body.split(/\s+/).filter(w => w.length > 0).length;
  
  let faqCount = 0;
  const faqMatch = frontmatter.match(/faq:\s*([\s\S]*?)(\n[a-zA-Z]+:|$)/);
  if (faqMatch) {
    faqCount = (faqMatch[1].match(/- question:/g) || []).length;
  } else {
    // maybe it's just at the end
    const fallbackMatch = frontmatter.match(/faq:\s*([\s\S]*)/);
    if (fallbackMatch) {
      faqCount = (fallbackMatch[1].match(/- question:/g) || []).length;
    }
  }
  
  const hasImage = /!\[.*?\]\(.*?\)/.test(body);
  const hasProTip = /<div class=\"callout callout-tip\"|<ProTip>/i.test(body);
  
  console.log(JSON.stringify({ file, words, faqCount, hasImage, hasProTip }));
});
