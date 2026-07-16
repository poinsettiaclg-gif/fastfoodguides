// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import fs from 'fs';
import path from 'path';

// Pre-calculate lastmod dates and chain counts for sitemap
const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');
const articleDates = new Map();
const chainCounts = new Map();

try {
	const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
	for (const file of files) {
		const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
		const slugMatch = file.replace(/\.mdx?$/, '');
		
		// Find updatedDate or pubDate
		const updatedMatch = content.match(/updatedDate:\s*"([^"]+)"/);
		const pubMatch = content.match(/pubDate:\s*"([^"]+)"/);
		const chainMatch = content.match(/chain:\s*"([^"]+)"/);
		
		if (updatedMatch) {
			articleDates.set(slugMatch, new Date(updatedMatch[1]));
		} else if (pubMatch) {
			articleDates.set(slugMatch, new Date(pubMatch[1]));
		}

		if (chainMatch) {
			const chain = chainMatch[1];
			// Basic slugify to match Astro's logic
			const chainSlug = chain.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
			chainCounts.set(chainSlug, (chainCounts.get(chainSlug) || 0) + 1);
		}
	}
} catch (e) {
	console.error('Failed to parse article dates for sitemap', e);
}

// https://astro.build/config
export default defineConfig({
	site: 'https://fastfoodguides.com',
	trailingSlash: 'always',
	integrations: [
		mdx(), 
		sitemap({
			filter: (page) => {
				const urlPath = new URL(page).pathname;
				// Exclude utility pages
				if (['/contact/', '/disclaimer/', '/privacy/', '/terms/'].includes(urlPath)) return false;
				// Exclude articles index
				if (urlPath === '/articles/') return false;
				// Exclude all chain and topic index pages
				if (urlPath.startsWith('/articles/topic/')) return false;
				if (urlPath.startsWith('/articles/chain/')) return false;
				return true;
			},
			serialize(item) {
				// Parse URL to find the slug
				const urlPath = new URL(item.url).pathname;
				if (urlPath.startsWith('/articles/') && !urlPath.startsWith('/articles/chain/') && !urlPath.startsWith('/articles/topic/')) {
					// Extract slug from /articles/slug/
					const slug = urlPath.replace('/articles/', '').replace(/\/$/, '');
					if (articleDates.has(slug)) {
						item.lastmod = articleDates.get(slug).toISOString();
					}
				}
				return item;
			}
		})
	],
	prefetch: { defaultStrategy: 'viewport' },
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
