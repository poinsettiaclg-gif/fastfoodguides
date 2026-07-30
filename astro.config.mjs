// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	site: 'https://fastfoodguides.com',
	trailingSlash: 'always',
	adapter: cloudflare({
		imageService: 'compile',
		platformProxy: {
			enabled: true
		}
	}),
	integrations: [
		partytown({
			config: {
				forward: ['dataLayer.push', 'gtag'],
			},
		}),
		mdx(), 
		sitemap({
			filter: (page) => {
				// Exclude chain archive pages with fewer than 3 articles
				// These are noindex'd and have AdSense script stripped — feeding them
				// to Googlebot via sitemap causes "thin content" rejection
				const thinChainSlugs = [
					'applebees', 'arbys', 'auntie-annes', 'bojangles', 'buffalo-wild-wings',
					'chilis', 'crumbl-cookies', 'culvers', 'dennys', 'dunkin',
					'dutch-bros', 'firehouse-subs', 'hardees-carls-jr', 'ihop',
					'jack-in-the-box', 'jersey-mikes', 'jimmy-johns',
					'krispy-kreme', 'long-john-silvers', 'shake-shack', 'waffle-house',
					'wawa', 'whataburger', 'white-castle', 'zaxbys',
					'cava', 'dairy-queen', 'little-caesars', 'panera-bread',
					'papa-johns', 'pizza-hut', 'popeyes', 'raising-canes', 'sweetgreen', 'wingstop'
				];
				// After topic consolidation, all remaining topics will have 3+ articles
				// But keep this as a safety net for any future thin topics
				const thinTopicSlugs = [
					'salads', 'beverages', 'drive-thru-operations',
					'food-prep', 'fries', 'general',
					'kitchen-operations', 'prep', 'seafood', 'sides'
				];
				for (const slug of thinChainSlugs) {
					if (page.includes(`/articles/chain/${slug}/`)) return false;
				}
				for (const slug of thinTopicSlugs) {
					if (page.includes(`/articles/topic/${slug}/`)) return false;
				}
				return true;
			}
		})
	],
	prefetch: { defaultStrategy: 'hover' },
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
	vite: {
		ssr: {
			external: ['cloudflare:workers']
		},
		optimizeDeps: {
			exclude: ['cloudflare:workers']
		}
	}
});
