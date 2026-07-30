import { defineConfig, fontProviders, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import partytown from '@astrojs/partytown';
import fs from 'node:fs';

const articles = fs.readdirSync('src/content/articles').filter(f => f.endsWith('.md'));
const chains = [...new Set(articles.map(f => f.split('-')[0]))];
const excludedChains = chains.filter(chain => articles.filter(f => f.startsWith(chain + '-')).length < 3);
const thinTopicSlugs = ['hacks', 'salads', 'beverages', 'drive-thru-operations', 'food-prep', 'fries', 'general', 'kitchen-operations', 'prep', 'seafood', 'sides'];

export default defineConfig({
	trailingSlash: 'always',
	image: {
		service: passthroughImageService(),
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		}
	}),
	site: 'https://fastfoodguides.com',
	integrations: [
		tailwind(),
		partytown(),
		mdx(), 
		sitemap({
			filter: (page) => {
				const url = new URL(page);
				const pathParts = url.pathname.split('/').filter(Boolean);
				if (pathParts[0] === 'articles' && pathParts[1] === 'chain' && excludedChains.includes(pathParts[2])) return false;
				if (pathParts[0] === 'articles' && pathParts[1] === 'topic' && thinTopicSlugs.includes(pathParts[2])) return false;
				return true;
			}
		})
	]
});
