const fs = require('fs');
const path = require('path');

function walk(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach(file => {
		file = path.join(dir, file);
		const stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(file));
		} else if (file.endsWith('.astro')) {
			results.push(file);
		}
	});
	return results;
}

walk('src/pages').forEach(f => {
	let content = fs.readFileSync(f, 'utf8');
	let changed = false;
	if (content.includes('<body>') && !content.includes('skip-link')) {
		content = content.replace('<body>', '<body>\n\t\t<a href="#main-content" class="sr-only skip-link">Skip to main content</a>');
		changed = true;
	}
	if (content.includes('<main>') && !content.includes('id="main-content"')) {
		content = content.replace('<main>', '<main id="main-content">');
		changed = true;
	}
	if (changed) {
		fs.writeFileSync(f, content);
		console.log('Fixed', f);
	}
});
