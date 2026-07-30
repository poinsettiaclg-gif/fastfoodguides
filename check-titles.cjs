const https = require('https');

https.get('https://project-planner-seo-hq.poinsettia-clg.workers.dev/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<h3 class="card-title"[^>]*>(.*?)<\/h3>/g);
    if (match) {
      console.log('Worker First 3 Articles:');
      match.slice(0, 3).forEach(m => console.log(m));
    } else {
      console.log('No articles found or 404');
    }
  });
});

https.get('https://fastfoodguides.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<h3 class="card-title"[^>]*>(.*?)<\/h3>/g);
    if (match) {
      console.log('Live Site First 3 Articles:');
      match.slice(0, 3).forEach(m => console.log(m));
    } else {
      console.log('No articles found or 404');
    }
  });
});
