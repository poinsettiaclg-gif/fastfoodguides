const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

// Read all frontmatter to build a map of chain -> articles
const articlesByChain = {};
const allArticles = [];

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = file.replace('.md', '');
  
  const titleMatch = content.match(/title:\s*"(.*?)"/);
  const chainMatch = content.match(/chain:\s*"(.*?)"/);
  
  if (titleMatch) {
    const title = titleMatch[1];
    const chain = chainMatch ? chainMatch[1] : 'General';
    
    const article = { slug, title, chain, filePath, content };
    allArticles.push(article);
    
    if (!articlesByChain[chain]) {
      articlesByChain[chain] = [];
    }
    articlesByChain[chain].push(article);
  }
}

const orphans = [
  'auntie-annes-pretzel-rolling',
  'chick-fil-a-first-day-training',
  'chick-fil-a-waffle-fry-station',
  'chipotle-grill-validation',
  'chipotle-guacamole',
  'crumbl-cookies-weekly-logistics',
  'dominos-dough-stretching',
  'dominos-first-day-training',
  'fast-food-hacks-never-order',
  'five-guys-first-day-training',
  'mcdonalds-fresh-beef-grill-process',
  'mcdonalds-ice-cream-machine-truth',
  'mcdonalds-ice-cream-machine',
  'mcdonalds-uhc-cabinet',
  'pizza-hut-kds-ticket-sequencing',
  'raising-canes-sauce',
  'starbucks-drive-thru-dto-dtr',
  'starbucks-first-day-training',
  'starbucks-pump-ratios-memorize',
  'starbucks-tiktok-hacks-debunked',
  'subway-first-day-training',
  'subway-tuna',
  'taco-bell-chalupa-shell',
  'taco-bell-first-day-training',
  'taco-bell-rethermalizer-90-minute-bag-drop-cycle',
  'tiktok-hacks-ruin-drive-thru-metrics',
  'wendys-first-day-training'
];

for (const orphanSlug of orphans) {
  const article = allArticles.find(a => a.slug === orphanSlug);
  if (!article) continue;
  
  // If it already has a "See Also" section, skip it
  if (article.content.includes('### See Also') || article.content.includes('### Read More')) continue;
  
  const sameChain = articlesByChain[article.chain] || [];
  let related = sameChain.filter(a => a.slug !== orphanSlug);
  
  // If not enough from same chain, grab random ones
  if (related.length < 3) {
    related = related.concat(allArticles.filter(a => a.slug !== orphanSlug && a.chain !== article.chain));
  }
  
  // Pick first 3
  const picked = related.slice(0, 3);
  
  let appendStr = '\n\n### See Also\n\n';
  for (const p of picked) {
    appendStr += `- [${p.title}](/articles/${p.slug}/)\n`;
  }
  
  const newContent = article.content + appendStr;
  fs.writeFileSync(article.filePath, newContent, 'utf8');
  console.log(`Fixed orphaned article: ${orphanSlug}`);
}
