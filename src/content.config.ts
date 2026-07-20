import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
	// Load Markdown and MDX files in the `src/content/articles/` directory.
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			author: z.string().optional(),
			authorTitle: z.string().optional(),
			chain: z.string().optional(),
			topic: z.string().optional(),
			relatedArticles: z.array(z.string()).optional(),
			isDebunk: z.boolean().optional(),
			faq: z.array(z.object({
				question: z.string(),
				answer: z.string()
			})).optional(),
		}),
});

const secretMenus = defineCollection({
	loader: glob({ base: './src/content/secret_menus', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			chain: z.string(),
			operationalAnnoyanceScore: z.number().min(1).max(10),
			isVerified: z.boolean(),
			ingredients: z.array(z.string()),
			howToOrder: z.string(),
			priceEstimate: z.string().optional(),
			faq: z.array(z.object({
				question: z.string(),
				answer: z.string()
			})).optional(),
		}),
});

export const collections = { articles, secretMenus };
