import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const missingArticles = [
  { slug: 'raising-canes-sauce', chain: "Raising Cane's" },
  { slug: 'dennys-grand-slam-build', chain: "Denny's" },
  { slug: 'wawa-hoagie-build', chain: 'Wawa' },
  { slug: 'firehouse-subs-steaming-process', chain: 'Firehouse Subs' },
  { slug: 'ihop-pancake-batter', chain: 'IHOP' },
  { slug: 'chick-fil-a-drive-thru-tablets', chain: 'Chick-fil-A' },
  { slug: 'culvers-butterburger', chain: "Culver's" },
  { slug: 'jimmy-johns-freaky-fast', chain: "Jimmy John's" },
  { slug: 'krispy-kreme-hot-light', chain: 'Krispy Kreme' },
  { slug: 'mcdonalds-fry-station', chain: "McDonald's" },
  { slug: 'mcdonalds-nugget-process', chain: "McDonald's" },
  { slug: 'shake-shack-smash-burger', chain: 'Shake Shack' },
  { slug: 'starbucks-secret-menu', chain: 'Starbucks' },
  { slug: 'taco-bell-baja-blast', chain: 'Taco Bell' },
  { slug: 'waffle-house-hash-brown-system', chain: 'Waffle House' },
  { slug: 'wendys-fresh-never-frozen', chain: "Wendy's" },
  { slug: 'whataburger-patty-melt', chain: 'Whataburger' },
  { slug: 'white-castle-slider-steam-grill', chain: 'White Castle' },
  { slug: 'wingstop-sauce-process', chain: 'Wingstop' },
  { slug: 'zaxbys-sauce-recipe', chain: "Zaxby's" }
];

const turndownService = new TurndownService({ headingStyle: 'atx' });

async function scrapeArticle({ slug, chain }) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'articles', `${slug}.md`);
  if (fs.existsSync(filePath)) {
    console.log(`Already exists: ${slug}`);
    return;
  }

  try {
    const res = await fetch(`https://fastfoodguides.com/articles/${slug}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract metadata
    const title = $('h1').first().text().trim() || $('title').text().replace(' | Fast Food Guides', '');
    const description = $('meta[name="description"]').attr('content') || '';
    
    // Default publication date to keep it simple, since the live site might not have it strictly formatted in the DOM
    const pubDate = '2026-06-09'; 
    const author = 'Russell Roseberry';
    const authorTitle = 'Former Multi-Unit Kitchen Manager';

    // Get article body html
    const contentHtml = $('.article-content').html() || '';
    if (!contentHtml) {
      console.log(`Warning: no .article-content found for ${slug}`);
    }

    // Convert HTML to Markdown
    const markdownBody = turndownService.turndown(contentHtml);

    // Build markdown file content
    const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
pubDate: "${pubDate}"
author: "${author}"
authorTitle: "${authorTitle}"
chain: "${chain}"
---

${markdownBody}
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`✅ Saved: ${slug}`);
  } catch (err) {
    console.error(`❌ Failed: ${slug}`, err.message);
  }
}

async function run() {
  for (const article of missingArticles) {
    await scrapeArticle(article);
  }
}

run();
