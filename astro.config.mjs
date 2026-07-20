// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders, passthroughImageService } from 'astro/config';
import fs from 'fs';
import path from 'path';
import cloudflare from '@astrojs/cloudflare';
import partytown from '@astrojs/partytown';

// Pre-calculate lastmod dates and chain counts for sitemap
const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');
const secretMenusDir = path.join(process.cwd(), 'src', 'content', 'secret_menus');
const articleDates = new Map();
const chainCounts = new Map();

try {
	// Parse articles
	let files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
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
	}

	// Parse secret menus
	files = fs.readdirSync(secretMenusDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
	for (const file of files) {
		const content = fs.readFileSync(path.join(secretMenusDir, file), 'utf-8');
		const slugMatch = file.replace(/\.mdx?$/, '');
		
		const updatedMatch = content.match(/updatedDate:\s*"([^"]+)"/);
		const pubMatch = content.match(/pubDate:\s*"([^"]+)"/);
		
		if (updatedMatch) {
			articleDates.set(slugMatch, new Date(updatedMatch[1]));
		} else if (pubMatch) {
			articleDates.set(slugMatch, new Date(pubMatch[1]));
		}
	}
} catch (e) {
	console.error('Failed to parse article dates for sitemap', e);
}

// https://astro.build/config
export default defineConfig({
	site: 'https://fastfoodguides.com',
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		},
		imageService: 'passthrough'
	}),
	image: {
		service: passthroughImageService(),
	},
	integrations: [
		partytown({
			config: {
				forward: ['dataLayer.push'],
			},
		}),
		mdx(), 
		sitemap({
			filter: (page) => {
				const urlPath = new URL(page).pathname;
				// Exclude utility pages
				if (['/contact/', '/disclaimer/', '/privacy/', '/terms/'].includes(urlPath)) return false;
				// Exclude articles index
				if (urlPath === '/articles/') return false;
				// Exclude topic index pages
				if (urlPath.startsWith('/articles/topic/')) return false;
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
				} else if (urlPath.startsWith('/secret-menus/')) {
					const slug = urlPath.replace('/secret-menus/', '').replace(/\/$/, '');
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
