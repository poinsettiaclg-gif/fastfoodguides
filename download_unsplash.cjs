const https = require('https');
const fs = require('fs');
const path = require('path');

const categories = {
    "generic-fryer": "deep fryer kitchen",
    "generic-grill": "flat top grill restaurant",
    "generic-pos": "restaurant pos system screen",
    "generic-prep": "commercial kitchen stainless steel table",
    "generic-walk-in": "walk in cooler restaurant",
    "generic-drive-thru": "drive thru window",
    "generic-coffee": "espresso machine coffee shop",
    "generic-baking": "commercial oven baking",
    "generic-exterior": "fast food restaurant exterior",
    "generic-bag": "brown paper takeout bag food"
};

const outputDir = path.join(__dirname, 'src/assets/images/general');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function getUnsplashImages(query, maxCount) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'unsplash.com',
            path: '/napi/search/photos?query=' + encodeURIComponent(query) + '&per_page=10',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        };
        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const results = json.results || [];
                    const urls = results.slice(0, maxCount).map(r => r.urls.regular);
                    resolve(urls);
                } catch(e) {
                    resolve([]); // Don't crash
                }
            });
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    for (const [prefix, query] of Object.entries(categories)) {
        console.log(`Searching for ${prefix} (${query})...`);
        const urls = await getUnsplashImages(query, 3);
        if (urls.length === 0) {
            console.log(`  No images found or blocked for ${prefix}`);
            continue;
        }
        for (let i = 0; i < urls.length; i++) {
            const dest = path.join(outputDir, `${prefix}-${i + 1}.webp`); // saving as webp (actually jpg but extension webp is fine for sharp later or we can just leave it as .jpg)
            // Wait, unsplash urls return jpeg. Let's just save as .jpg
            const destJpg = path.join(outputDir, `${prefix}-${i + 1}.jpg`);
            await downloadImage(urls[i], destJpg);
            console.log(`  Saved ${prefix}-${i + 1}.jpg`);
        }
    }
}

run();
