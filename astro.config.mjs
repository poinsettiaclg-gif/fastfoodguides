import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';
import fs from 'node:fs';
import matter from 'gray-matter';
import remarkAffiliateInject from './src/plugins/remark-affiliate-inject.mjs';

// Parse actual chain names from frontmatter instead of naive filename splitting
const articleFiles = fs.readdirSync('src/content/articles').filter(f => f.endsWith('.md'));
const chainCounts = {};
const topicCounts = {};
for (const file of articleFiles) {
	try {
		const raw = fs.readFileSync(`src/content/articles/${file}`, 'utf-8');
		const { data } = matter(raw);
		if (data.chain) {
			const slug = data.chain.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
			chainCounts[slug] = (chainCounts[slug] || 0) + 1;
		}
		if (data.topic) {
			const slug = data.topic.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
			topicCounts[slug] = (topicCounts[slug] || 0) + 1;
		}
	} catch {}
}
const excludedChains = Object.entries(chainCounts)
	.filter(([, count]) => count < 3)
	.map(([slug]) => slug);

const thinTopicSlugs = Object.entries(topicCounts)
	.filter(([, count]) => count < 3)
	.map(([slug]) => slug);

export default defineConfig({
	trailingSlash: 'always',
	site: 'https://fastfoodguides.com',
	markdown: {
		remarkPlugins: [remarkAffiliateInject],
	},
	integrations: [
		tailwind(),
		partytown({
			config: {
				forward: ["dataLayer.push", "gtag"]
			}
		}),
		mdx(), 
		sitemap({
			filter: (page) => {
				const url = new URL(page);
				const pathParts = url.pathname.split('/').filter(Boolean);
				if (pathParts[0] === '404' || pathParts[0] === 'dmca') return false;
				if (pathParts[0] === 'articles' && pathParts[1] === 'chain' && excludedChains.includes(pathParts[2])) return false;
				if (pathParts[0] === 'articles' && pathParts[1] === 'topic' && thinTopicSlugs.includes(pathParts[2])) return false;
				return true;
			}
		})
	],
	image: {
		domains: ['m.media-amazon.com', 'images-na.ssl-images-amazon.com'],
	}
});
