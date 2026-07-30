const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const articlesDir = path.join(__dirname, 'src', 'content', 'articles');

async function convertImages() {
    console.log('Starting image conversion...');
    const filesToProcess = [];

    // Recursively find all PNG/JPG files
    function findImages(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                findImages(fullPath);
            } else if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
                filesToProcess.push(fullPath);
            }
        }
    }
    
    findImages(imagesDir);

    let convertedCount = 0;
    
    for (const imgPath of filesToProcess) {
        const dir = path.dirname(imgPath);
        const ext = path.extname(imgPath);
        const baseName = path.basename(imgPath, ext);
        const newPath = path.join(dir, `${baseName}.webp`);

        try {
            await sharp(imgPath)
                .webp({ quality: 80 })
                .toFile(newPath);
            
            // Delete original
            fs.unlinkSync(imgPath);
            convertedCount++;
            console.log(`Converted: ${baseName}${ext} -> .webp`);
        } catch (err) {
            console.error(`Failed to convert ${imgPath}:`, err);
        }
    }
    
    console.log(`Successfully converted ${convertedCount} images to WebP.`);
}

function updateMarkdownReferences() {
    console.log('Updating markdown references...');
    let updatedCount = 0;
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
        const filePath = path.join(articlesDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        let originalContent = content;
        
        // Update heroImage frontmatter and standard markdown images
        content = content.replace(/\.(png|jpg|jpeg)/gi, '.webp');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            updatedCount++;
        }
    }
    
    console.log(`Updated image references in ${updatedCount} articles.`);
}

async function run() {
    await convertImages();
    updateMarkdownReferences();
}

run();
