const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Poins/.gemini/antigravity/scratch/fastfoodguides.com/src/content/articles';
const files = fs.readdirSync(dir).filter(f => {
  return f.startsWith('raising-canes') || f.startsWith('shake-shack') || f.startsWith('sonic') || f.startsWith('starbucks');
});

const bannedPhrases = ["Here is exactly how", "Here's what you need to know", "Here's why", "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital", "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore", "I've seen", "I can tell you"];

const report = [];

files.forEach(f => {
  const p = path.join(dir, f);
  const content = fs.readFileSync(p, 'utf8');
  
  const bodyContent = content.replace(/---[\s\S]*?---/, '');
  
  const words = bodyContent.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;
  
  const protips = (bodyContent.match(/callout-tip|ProTip/gi) || []).length;
  
  const images = (bodyContent.match(/!\[.*?\]\(.*?\)/g) || []).length;
  
  const hasFaq = /faq:/i.test(content);
  
  const foundBanned = {};
  bannedPhrases.forEach(bp => {
    const regex = new RegExp(`\\b${bp}\\b`, 'gi');
    const matches = bodyContent.match(regex);
    if (matches) {
      foundBanned[bp] = matches.length;
    }
  });

  report.push({
    file: f,
    wordCount,
    protips,
    images,
    hasFaq,
    banned: foundBanned
  });
});

console.log(JSON.stringify(report, null, 2));
