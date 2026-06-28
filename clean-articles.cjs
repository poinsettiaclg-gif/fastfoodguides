const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let totalFixed = 0;

// Build slug->chain map for relatedArticles matching
const articleMeta = {};
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const chainMatch = content.match(/^chain:\s*"(.+?)"/m);
  const topicMatch = content.match(/^topic:\s*"(.+?)"/m);
  const slug = f.replace('.md', '');
  articleMeta[slug] = {
    chain: chainMatch ? chainMatch[1] : null,
    topic: topicMatch ? topicMatch[1] : null,
  };
});

files.forEach(f => {
  const filepath = path.join(dir, f);
  let content = fs.readFileSync(filepath, 'utf-8');
  let modified = false;

  // 1. Remove stray breadcrumb artifacts (lines like "2.  \>" or "3. [Guides](/articles/)" etc.)
  const breadcrumbPattern = /^(\d+\.\s+\\?>?\s*\n)+/gm;
  if (breadcrumbPattern.test(content)) {
    content = content.replace(breadcrumbPattern, '');
    modified = true;
  }

  // Also catch individual stray lines like "2.  \>"
  const strayLines = /^\d+\.\s+\\>?\s*$/gm;
  if (strayLines.test(content)) {
    content = content.replace(strayLines, '');
    modified = true;
  }

  // 2. Remove duplicate H1 headings in body (# Title that matches frontmatter title)
  const titleMatch = content.match(/^title:\s*"(.+?)"/m);
  if (titleMatch) {
    const titleText = titleMatch[1].replace(/\\"/g, '"');
    const h1Pattern = new RegExp('^# ' + titleText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$', 'gm');
    if (h1Pattern.test(content)) {
      content = content.replace(h1Pattern, '');
      modified = true;
    }
  }

  // 3. Remove duplicate byline text (By Russell Roseberry...)
  const bylinePattern = /^By Russell Roseberry.*(?:QSR|Kitchen Manager|Veteran).*$/gm;
  if (bylinePattern.test(content)) {
    content = content.replace(bylinePattern, '');
    modified = true;
  }

  // 4. Remove hardcoded author bio section at bottom
  const bioPattern = /---\s*\n+\*?\*?About the Author\*?\*?[\s\S]*?(?:\/about\/?[)\]]\s*\.?\s*\n)/gi;
  if (bioPattern.test(content)) {
    content = content.replace(bioPattern, '');
    modified = true;
  }

  // 5. Remove hardcoded "More Insider Guides" section at bottom of markdown body
  const moreGuidesPattern = /(?:---\s*\n+)?(?:#{1,3}\s*)?More Insider Guides\s*\n[\s\S]*$/gi;
  // Only remove if it's in the last 30% of the file to avoid removing section in the middle
  const lines = content.split('\n');
  const totalLines = lines.length;
  for (let i = Math.floor(totalLines * 0.7); i < totalLines; i++) {
    if (/^(?:#{1,3}\s*)?More Insider Guides/i.test(lines[i])) {
      content = lines.slice(0, i).join('\n').trimEnd() + '\n';
      modified = true;
      break;
    }
  }

  // 6. Clean up multiple consecutive blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  // 7. Add relatedArticles if missing
  const hasRelated = /^relatedArticles:/m.test(content);
  if (!hasRelated) {
    const slug = f.replace('.md', '');
    const meta = articleMeta[slug];
    if (meta) {
      // Find related articles: same chain first, then same topic
      const candidates = Object.entries(articleMeta)
        .filter(([s, m]) => s !== slug)
        .sort((a, b) => {
          const aScore = (a[1].chain === meta.chain ? 2 : 0) + (a[1].topic === meta.topic ? 1 : 0);
          const bScore = (b[1].chain === meta.chain ? 2 : 0) + (b[1].topic === meta.topic ? 1 : 0);
          return bScore - aScore;
        })
        .slice(0, 3)
        .map(([s]) => s);

      if (candidates.length > 0) {
        const relatedYaml = 'relatedArticles:\n' + candidates.map(s => `  - "${s}"`).join('\n');
        // Insert before the closing ---
        content = content.replace(/^---\s*$/m, relatedYaml + '\n---');
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf-8');
    totalFixed++;
  }
});

console.log(`Cleaned ${totalFixed} of ${files.length} articles.`);
