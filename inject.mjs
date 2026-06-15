import fs from 'fs';
import path from 'path';

const tasks = JSON.parse(fs.readFileSync('image-tasks.json', 'utf-8'));

// Group tasks by slug
const tasksBySlug = {};
for (const t of tasks) {
  if (!tasksBySlug[t.slug]) tasksBySlug[t.slug] = [];
  tasksBySlug[t.slug].push(t);
}

for (const [slug, slugTasks] of Object.entries(tasksBySlug)) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'articles', `${slug}.md`);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  for (const t of slugTasks) {
    const h2Line = `## ${t.h2}`;
    const imageTag = `\n\n![Blueprint illustration of ${t.h2}](/images/${t.slug}/${t.imageName}.png)\n\n`;
    
    if (content.includes(h2Line) && !content.includes(`${t.imageName}.png`)) {
      content = content.replace(h2Line, h2Line + imageTag);
    }
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Injected into ${slug}`);
}
