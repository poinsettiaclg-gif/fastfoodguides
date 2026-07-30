const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src/content/articles');
const secretMenusDir = path.join(__dirname, 'src/content/secret_menus');

function getAllFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

let allFiles = [];
allFiles = allFiles.concat(getAllFiles(articlesDir));
allFiles = allFiles.concat(getAllFiles(secretMenusDir));

function assignCategory(title, content) {
    const t = (title + " " + content).toLowerCase();
    let base = 'generic-prep';
    if (t.includes('fry') || t.includes('chicken') || t.includes('crispy') || t.includes('nugget')) base = 'generic-fryer';
    else if (t.includes('grill') || t.includes('burger') || t.includes('patty') || t.includes('steak')) base = 'generic-grill';
    else if (t.includes('pos ') || t.includes('register') || t.includes('dispatch') || t.includes('ticket')) base = 'generic-pos';
    else if (t.includes('drive thru') || t.includes('drive-thru') || t.includes('window') || t.includes('headset')) base = 'generic-drive-thru';
    else if (t.includes('coffee') || t.includes('latte') || t.includes('espresso') || t.includes('frappuccino') || t.includes('barista')) base = 'generic-coffee';
    else if (t.includes('bake') || t.includes('oven') || t.includes('dough') || t.includes('bread') || t.includes('pizza') || t.includes('biscuit')) base = 'generic-baking';
    else if (t.includes('cooler') || t.includes('walk-in') || t.includes('freezer') || t.includes('inventory')) base = 'generic-walk-in';
    else if (t.includes('delivery') || t.includes('bag') || t.includes('takeout') || t.includes('uber')) base = 'generic-bag';
    else if (t.includes('exterior') || t.includes('parking') || t.includes('sign')) base = 'generic-exterior';
    
    // Pick a random variant (base.jpg, base-2.jpg, base-3.jpg)
    const rand = Math.floor(Math.random() * 3) + 1;
    if (rand === 1) return `${base}.jpg`;
    else return `${base}-${rand}.jpg`;
}

let updatedCount = 0;

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const titleMatch = content.match(/^title:\s*"(.*?)"/m);
    const title = titleMatch ? titleMatch[1] : "";
    
    const assignedImage = assignCategory(title, content);
    const newHeroPath = `../../assets/images/general/${assignedImage}`;

    // Replace heroImage in frontmatter
    let newContent = content.replace(/^heroImage:\s*".*?"/m, `heroImage: "${newHeroPath}"`);

    // Replace all inline markdown images with generic ones too
    let imageCount = 0;
    newContent = newContent.replace(/!\[.*?\]\((.*?)\)/g, (match, p1) => {
        imageCount++;
        // If it's already a generic image, let's also randomize it
        if (p1.includes('general/')) {
             // We can just swap it with another random image from the pool to be safe
             const fallback = Math.floor(Math.random() * 3) + 1;
             const imgName = fallback === 1 ? 'generic-prep.jpg' : (fallback === 2 ? 'generic-walk-in-2.jpg' : 'generic-drive-thru-3.jpg');
             return `![Operational reference](../../assets/images/general/${imgName})`;
        }
        return match;
    });

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated images in ${updatedCount} markdown files with random distribution.`);
