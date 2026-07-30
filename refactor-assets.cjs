const fs = require('fs');
const path = require('path');

function replaceInFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  let original = content;

  // Replace image references
  content = content.replace(/chick_fil_a_first_day_1784553017715\.png/g, 'chick_fil_a_generic_training.png');
  content = content.replace(/dominos_first_day_1784553972462\.png/g, 'dominos_generic_training.png');
  content = content.replace(/starbucks_first_day_1784553962102\.png/g, 'starbucks_generic_training.png');
  content = content.replace(/subway_first_day_1784553981046\.png/g, 'subway_generic_training.png');
  content = content.replace(/taco_bell_first_day_1784553031980\.png/g, 'taco_bell_generic_training.png');

  // Replace hardcoded CSS colors (only in .astro files)
  if (filepath.endsWith('.astro') && !filepath.includes('BaseHead.astro')) {
    content = content.replace(/#10B981/ig, 'var(--accent)');
    content = content.replace(/#0a0f1c/ig, 'var(--bg-body)');
    content = content.replace(/#111827/ig, 'var(--bg-surface)');
    content = content.replace(/#F1F5F9/ig, 'var(--text-primary)');
  }

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Updated ${filepath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walkDir(p);
    } else if (p.endsWith('.astro') || p.endsWith('.md') || p.endsWith('.mdx')) {
      replaceInFile(p);
    }
  }
}

walkDir('src/content');
walkDir('src/components');
walkDir('src/layouts');
walkDir('src/pages');
