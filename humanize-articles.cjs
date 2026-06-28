const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const russellNotes = [
  "> **Russell's Note:** When your KDS screen is going red on a Friday night, the last thing you want is a broken line. You have to run a 120-second window or you're dead in the water.",
  "> **Russell's Note:** I've got faded burn scars from exactly this kind of setup. If you aren't communicating with 'Behind!' and 'Hot!', you're going to get someone hurt.",
  "> **Russell's Note:** Forget the fancy gadgets. Give me a sharp 8-inch chef's knife and a 32oz deli container labeled with blue painter's tape, and I can run any station.",
  "> **Russell's Note:** People always ask why this tastes different at home. Simple. We aren't afraid of butter, salt, and keeping the clamshell grill screaming hot.",
  "> **Russell's Note:** The Sysco truck being late will ruin a prep shift faster than anything else. You learn to pivot immediately or the lunch rush will crush you.",
  "> **Russell's Note:** Any BOH veteran will tell you: the walk-in cooler is the only soundproof place to take a 30-second mental break when you're getting slammed and holding on drops.",
  "> **Russell's Note:** You don't know true panic until a 15-item catering order drops right in the middle of a Sunday brunch shift. It instantly backs you up to the window.",
  "> **Russell's Note:** Time to lean, time to clean. It's an annoying cliché, but when the health inspector (the ultimate clipboard warrior) shows up unannounced, you'll be glad you wiped down the low-boys."
];

let processed = 0;

files.forEach(f => {
  const filepath = path.join(dir, f);
  let content = fs.readFileSync(filepath, 'utf-8');
  
  // 1. Purge Symmetrical Conclusions
  content = content.replace(/^##\s+Conclusion\s*$/gm, '## Final Thoughts');
  content = content.replace(/^##\s+In Conclusion\s*$/gm, '## The Verdict');
  content = content.replace(/\bIn conclusion,\s*/gi, '');
  content = content.replace(/\bTo summarize,\s*/gi, '');
  content = content.replace(/\bMoreover,\s*/gi, '');
  content = content.replace(/\bFurthermore,\s*/gi, '');

  // 2. Eradicate Buzzwords
  const buzzwords = ['delve', 'crucial', 'tapestry', 'paradigm', 'synergize'];
  buzzwords.forEach(word => {
    // Replace "crucial" with "important"
    if (word === 'crucial') content = content.replace(/\bcrucial\b/gi, 'critical');
    // Replace "delve" with "jump"
    if (word === 'delve') content = content.replace(/\bdelve\b/gi, 'dive');
    // Replace "tapestry" with "landscape" or remove
    if (word === 'tapestry') content = content.replace(/\btapestry\b/gi, 'system');
  });

  // 3. Inject Russell's Note
  // We'll try to find the first H2 heading (##) and inject it right after the paragraph following it.
  // Regex to match the first H2 and its following text block
  const match = content.match(/^(##\s+.*?)\n+([^#\n]+(?:\n[^#\n]+)*)\n+/m);
  if (match) {
    const randomNote = russellNotes[Math.floor(Math.random() * russellNotes.length)];
    const insertion = `${match[1]}\n\n${match[2]}\n\n${randomNote}\n\n`;
    content = content.replace(match[0], insertion);
  }
  // 4. Purge intrusive inline italic links
  content = content.replace(/\*\s*\(Related guide:.*?\)s*\*/gi, '');
  content = content.replace(/\*\(Related.*?\)*/gi, '');

  fs.writeFileSync(filepath, content, 'utf-8');
  processed++;
});

console.log(`Successfully humanized ${processed} articles.`);
