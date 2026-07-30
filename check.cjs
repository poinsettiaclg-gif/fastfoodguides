const https = require('https');
https.get('https://fastfoodguides.com/articles/mcdonalds-round-egg-process/?bust=1', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log("Status: " + res.statusCode);
    const images = data.match(/_astro\/[^"'\s]+/g);
    console.log(images ? [...new Set(images)].slice(0, 10) : 'No images found');
  });
});
