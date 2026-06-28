const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir);

let count = 0;
files.forEach(f => {
  if (f.endsWith('.md')) {
    const p = path.join(dir, f);
    let c = fs.readFileSync(p, 'utf-8');
    if (c.includes('" description: "')) {
      c = c.replace(/" description: "/g, '"\ndescription: "');
      fs.writeFileSync(p, c, 'utf-8');
      count++;
    }
  }
});
console.log('Fixed ' + count + ' files.');
