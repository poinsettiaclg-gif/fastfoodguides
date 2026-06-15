import fs from 'fs';
import path from 'path';

const newArticles = [
  'popeyes-slow-kitchen', 'raising-canes-sauce', 'dennys-grand-slam-build',
  'wawa-hoagie-build', 'firehouse-subs-steaming-process', 'ihop-pancake-batter',
  'chick-fil-a-drive-thru-tablets', 'culvers-butterburger', 'jimmy-johns-freaky-fast',
  'krispy-kreme-hot-light', 'mcdonalds-fry-station', 'mcdonalds-nugget-process',
  'shake-shack-smash-burger', 'starbucks-secret-menu', 'taco-bell-baja-blast',
  'waffle-house-hash-brown-system', 'wendys-fresh-never-frozen', 'whataburger-patty-melt',
  'white-castle-slider-steam-grill', 'wingstop-sauce-process', 'zaxbys-sauce-recipe'
];

const tasks = [];

for (const slug of newArticles) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'articles', `${slug}.md`);
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all H2s (e.g. "## The Truth About the Meat")
  const h2Matches = [...content.matchAll(/^##\s+(.+)$/gm)];
  
  // Take up to 2 H2s
  const selectedH2s = h2Matches.slice(0, 2).map(m => m[1]);
  
  for (let i = 0; i < selectedH2s.length; i++) {
    const h2 = selectedH2s[i];
    // Create a safe, short image name
    const imageName = `${slug}-${h2.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 30)}`;
    const prompt = `A clean, professional technical blueprint illustration of: ${h2} for the fast food chain related to ${slug.replace(/-/g, ' ')}. Dark background, precise white and cyan technical lines, schematic aesthetic, no text.`;
    
    tasks.push({
      slug,
      h2,
      imageName,
      prompt
    });
  }
}

fs.writeFileSync('image-tasks.json', JSON.stringify(tasks, null, 2));
console.log(`Generated ${tasks.length} image tasks.`);
