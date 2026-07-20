const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const clientPath = path.join(distPath, 'client');
const serverPath = path.join(distPath, 'server');
const workerDirPath = path.join(distPath, '_worker.js');

// 1. Rename dist/server to dist/_worker.js
if (fs.existsSync(serverPath)) {
  fs.renameSync(serverPath, workerDirPath);
}

// 2. Rename entry.mjs to index.js
const entryPath = path.join(workerDirPath, 'entry.mjs');
const indexPath = path.join(workerDirPath, 'index.js');
if (fs.existsSync(entryPath)) {
  fs.renameSync(entryPath, indexPath);
}

// 3. Move everything from dist/client to dist/
if (fs.existsSync(clientPath)) {
  const files = fs.readdirSync(clientPath);
  for (const file of files) {
    fs.renameSync(path.join(clientPath, file), path.join(distPath, file));
  }
  fs.rmdirSync(clientPath);
}

console.log('Prepared dist/ for Cloudflare Pages Advanced Mode!');
