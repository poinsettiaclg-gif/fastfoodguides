const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

let modifiedFiles = 0;
let totalReplacements = 0;

const badPhrases = [
    { regex: /\bIn conclusion,\s*/gi, replacement: '' },
    { regex: /\bIn summary,\s*/gi, replacement: '' },
    { regex: /\bUltimately,\s*/gi, replacement: '' },
    { regex: /\bFurthermore,\s*/gi, replacement: '' },
    { regex: /\bMoreover,\s*/gi, replacement: '' },
    { regex: /\bIt'?s important to note that\s*/gi, replacement: 'Critically, ' },
    { regex: /\bIt is important to note that\s*/gi, replacement: 'Critically, ' },
    { regex: /\bdelve into\b/gi, replacement: 'examine' },
    { regex: /\ba testament to\b/gi, replacement: 'proof of' },
    { regex: /\belevate your\b/gi, replacement: 'improve your' },
    { regex: /\bgame-changer\b/gi, replacement: 'major operational shift' },
    { regex: /\bIn today'?s fast-paced world\b/gi, replacement: 'In high-volume operations' },
    { regex: /\bseamlessly\b/gi, replacement: 'efficiently' },
    { regex: /\bleverage\b/gi, replacement: 'use' },
    { regex: /\btransformative\b/gi, replacement: 'significant' },
    { regex: /\bunleash\b/gi, replacement: 'deploy' },
    { regex: /\bnavigate the\b/gi, replacement: 'manage the' },
    { regex: /\bnot merely\b/gi, replacement: 'not just' },
    { regex: /\bcrucial aspect\b/gi, replacement: 'critical step' }
];

for (const file of files) {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fileReplacements = 0;

    for (const { regex, replacement } of badPhrases) {
        const matches = content.match(regex);
        if (matches) {
            fileReplacements += matches.length;
            totalReplacements += matches.length;
            content = content.replace(regex, replacement);
        }
    }

    if (content !== originalContent) {
        // Fix capitalization if the replacement left a lowercase letter at the start of a sentence
        content = content.replace(/([.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
        
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedFiles++;
    }
}

console.log(`AI Scrub Complete. Made ${totalReplacements} replacements across ${modifiedFiles} files.`);
