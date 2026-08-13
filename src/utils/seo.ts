export function slugifyChain(c: string): string {
	return c.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

interface GenerateSchemasParams {
	title: string;
	description: string;
	pubDate?: Date;
	updatedDate?: Date;
	heroImage?: string;
	author?: string;
	authorTitle?: string;
	chain?: string;
	slug?: string;
	hasChainPage: boolean;
	urlOrigin: string;
	urlHref: string;
	faq?: { question: string; answer: string }[];
}

export function generateArticleSchemas({
	title,
	description,
	pubDate,
	updatedDate,
	heroImage,
	author,
	authorTitle,
	chain,
	slug,
	hasChainPage,
	urlOrigin,
	urlHref,
	faq
}: GenerateSchemasParams) {
	const schemas: any[] = [
		{
			"@type": "Article",
			"headline": title,
			"description": description,
			"datePublished": pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
			"dateModified": updatedDate ? new Date(updatedDate).toISOString() : (pubDate ? new Date(pubDate).toISOString() : new Date().toISOString()),
			...(chain && { "articleSection": chain }),
			"image": heroImage ? [new URL(heroImage, urlOrigin).href] : [`${urlOrigin}/og-default.png`],
			"inLanguage": "en",
			"author": {
				"@type": "Person",
				"name": author || "Russell Roseberry",
				"jobTitle": authorTitle || "Multi-Unit Kitchen Manager",
				"url": new URL("/author/" + (author ? author.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-') : "russell-roseberry"), urlOrigin).href,
				"image": new URL("/images/" + (author ? author.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-') : "russell-roseberry") + ".jpg", urlOrigin).href
			},
			"publisher": {
				"@type": "Organization",
				"name": "Fast Food Guides",
				"url": urlOrigin || "https://fastfoodguides.com",
				"logo": {
					"@type": "ImageObject",
					"url": new URL("/og-default.png", urlOrigin).href,
					"width": 1200,
					"height": 630
				}
			},
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": urlHref
			}
		}
	];

	schemas.push({
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": new URL("/", urlOrigin).href
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Guides",
				"item": new URL("/articles/", urlOrigin).href
			},
			...(hasChainPage && chain ? [{
				"@type": "ListItem",
				"position": 3,
				"name": chain,
				"item": new URL(`/articles/chain/${slugifyChain(chain)}/`, urlOrigin).href
			}] : []),
			{
				"@type": "ListItem",
				"position": hasChainPage && chain ? 4 : 3,
				"name": title,
				"item": urlHref
			}
		]
	});

	if (faq && faq.length > 0) {
		schemas.push({
			"@type": "FAQPage",
			"mainEntity": faq.map(q => ({
				"@type": "Question",
				"name": q.question,
				"acceptedAnswer": {
					"@type": "Answer",
					"text": q.answer
				}
			}))
		});
	}

	return schemas;
}
