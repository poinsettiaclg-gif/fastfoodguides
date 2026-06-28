const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');

const titleRewrites = {
  'dutch-bros-drive-thru.md': {
    oldTitle: 'Dutch Bros Drive-Thru: The Organized Chaos of the Linebusters',
    newTitle: 'How Does Dutch Bros Make Drinks So Fast? (The Linebuster System)',
    newDesc: 'How Dutch Bros Coffee processes hundreds of custom drinks an hour using linebusters, specialized drink codes, and a dual-lane drive-thru system that feels casual but runs like a military operation.'
  },
  'cava-assembly-line.md': {
    oldTitle: 'The Cava Assembly Line: How They Push 300 Bowls an Hour',
    newTitle: 'How Is Cava Food Made? Inside the Bowl Assembly Line',
    newDesc: 'A deep dive into how Cava builds hundreds of custom bowls an hour, covering the three-zone assembly line layout, strict portion control math, and the hidden Digital Make Line.'
  },
  'long-john-silvers-fryer.md': {
    oldTitle: "Long John Silver's Fryers: The Mechanics of Perfect Batter",
    newTitle: "How Does Long John Silver's Make Their Fish? (The Batter Process)",
    newDesc: "How Long John Silver's uses specialized deep fryers and a unique swim-and-drop technique to achieve their signature crispy, flaky fish batter without it sticking to the basket."
  },
  'sweetgreen-mixing-station.md': {
    oldTitle: "Sweetgreen's Mixing Station: The Science Behind the Perfect Toss",
    newTitle: 'How Does Sweetgreen Make Their Salads? (The Mixing Station)',
    newDesc: 'Inside the high-volume salad mixing station at Sweetgreen, detailing the specialized tongs, the vortex toss technique, and how they prevent cross-contamination during a 150-salad-per-hour rush.'
  }
};

Object.entries(titleRewrites).forEach(([file, { oldTitle, newTitle, newDesc }]) => {
  const filepath = path.join(dir, file);
  if (!fs.existsSync(filepath)) {
    console.log(`SKIP: ${file} not found`);
    return;
  }
  let content = fs.readFileSync(filepath, 'utf-8');
  
  // Replace title
  content = content.replace(
    `title: "${oldTitle}"`,
    `title: "${newTitle}"`
  );
  
  // Replace description
  const descMatch = content.match(/^description: "(.+?)"/m);
  if (descMatch && newDesc) {
    content = content.replace(
      `description: "${descMatch[1]}"`,
      `description: "${newDesc}"`
    );
  }
  
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`Rewrote: ${file}`);
});

console.log('Done.');
