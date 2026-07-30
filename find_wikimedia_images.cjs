const https = require('https');

const categories = {
    "generic-fryer.jpg": "commercial deep fryer",
    "generic-grill.jpg": "commercial grill kitchen",
    "generic-pos.jpg": "restaurant POS system",
    "generic-prep.jpg": "commercial kitchen prep table",
    "generic-walk-in.jpg": "walk in cooler",
    "generic-drive-thru.jpg": "drive thru window",
    "generic-coffee.jpg": "commercial espresso machine",
    "generic-baking.jpg": "commercial bakery oven",
    "generic-exterior.jpg": "fast food restaurant exterior",
    "generic-bag.jpg": "paper takeout bag"
};

function searchWikimedia(query) {
    return new Promise((resolve, reject) => {
        // gsrnamespace=6 means search only in File namespace
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&format=json`;
        
        https.get(url, { headers: { 'User-Agent': 'FastFoodGuidesBot/1.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (!json.query || !json.query.pages) {
                        resolve(null);
                        return;
                    }
                    const pages = json.query.pages;
                    // Get the first image url
                    const firstPageId = Object.keys(pages)[0];
                    const imageInfo = pages[firstPageId].imageinfo[0];
                    resolve({
                        url: imageInfo.url,
                        descriptionUrl: imageInfo.descriptionurl
                    });
                } catch(e) {
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    for (const [filename, query] of Object.entries(categories)) {
        console.log(`Searching for ${filename} (${query})...`);
        const result = await searchWikimedia(query);
        if (result) {
            console.log(`  File: ${filename}`);
            console.log(`  Download URL: ${result.url}`);
            console.log(`  Wiki Page: ${result.descriptionUrl}`);
        } else {
            console.log(`  No results for ${query}`);
        }
    }
}

run();
