const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        if (f === 'node_modules' || f === '.git' || f === '.astro') continue;
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    }
}

const mdFiles = [];
walkDir(projectRoot, (filePath) => {
    if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
        mdFiles.push(filePath);
    }
});

let report = '# Broken Media and Links Audit\n\n';
let hasBroken = false;

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-')         
        .replace(/^-+/, '')             
        .replace(/-+$/, '');            
}

mdFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);
    let fileReport = '';
    
    // Check heroImage
    const heroMatch = content.match(/heroImage:\s*"?([^"\n]+)"?/);
    if (heroMatch) {
        let imgPath = heroMatch[1].trim(); // FIX: trim \r and whitespace
        let fullPath = path.resolve(dir, imgPath);
        if (!fs.existsSync(fullPath)) {
            fileReport += `- Broken heroImage path: \`${imgPath}\` (Resolved to: ${fullPath})\n`;
        }
    }
    
    // Check inline images ![alt](url)
    const imgRegex = /!\[.*?\]\((.*?)\)/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(content)) !== null) {
        let imgPath = imgMatch[1].trim(); // FIX: trim
        if (imgPath.startsWith('http') || imgPath.startsWith('data:')) continue;
        
        // Strip off any fragments or queries just in case
        imgPath = imgPath.split('#')[0].split('?')[0];

        let fullPath = path.resolve(dir, imgPath);
        if (!fs.existsSync(fullPath)) {
            fileReport += `- Broken inline image path: \`${imgPath}\` (Resolved to: ${fullPath})\n`;
        }
    }
    
    // Check HTML images <img src="url">
    const htmlImgRegex = /<img[^>]+src="([^">]+)"/g;
    let htmlImgMatch;
    while ((htmlImgMatch = htmlImgRegex.exec(content)) !== null) {
        let imgPath = htmlImgMatch[1].trim();
        if (imgPath.startsWith('http') || imgPath.startsWith('data:')) continue;
        
        imgPath = imgPath.split('#')[0].split('?')[0];
        let fullPath = path.resolve(dir, imgPath);
        if (!fs.existsSync(fullPath)) {
            fileReport += `- Broken HTML image path: \`${imgPath}\` (Resolved to: ${fullPath})\n`;
        }
    }

    // Anchor links [text](#anchor)
    const anchorRegex = /\[.*?\]\(#(.*?)\)/g;
    let anchorMatch;
    const anchors = [];
    while ((anchorMatch = anchorRegex.exec(content)) !== null) {
        anchors.push(anchorMatch[1].trim());
    }
    
    if (anchors.length > 0) {
        // Collect headings
        const headings = [];
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        let headingMatch;
        while ((headingMatch = headingRegex.exec(content)) !== null) {
            headings.push(slugify(headingMatch[2]));
        }
        
        // Also look for id="anchor" or <a name="anchor">
        const idRegex = /id="([^"]+)"/g;
        let idMatch;
        while ((idMatch = idRegex.exec(content)) !== null) {
            headings.push(idMatch[1].trim());
        }
        const nameRegex = /name="([^"]+)"/g;
        let nameMatch;
        while ((nameMatch = nameRegex.exec(content)) !== null) {
            headings.push(nameMatch[1].trim());
        }
        
        anchors.forEach(anchor => {
            if (!headings.includes(anchor)) {
                fileReport += `- Broken intra-page anchor link: \`#${anchor}\`\n`;
            }
        });
    }
    
    if (fileReport) {
        hasBroken = true;
        const relFile = path.relative(projectRoot, file).replace(/\\/g, '/');
        report += `## ${relFile}\n${fileReport}\n`;
    }
});

if (!hasBroken) {
    report += 'No broken images or anchor links found!\n';
}

const outDir = path.join(projectRoot, 'scratch', 'reports', 'round3');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'media_audit.md');
fs.writeFileSync(outPath, report);
console.log('Report generated at ' + outPath);
