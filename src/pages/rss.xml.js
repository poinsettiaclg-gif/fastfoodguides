import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const articles = await getCollection('articles');
	const secretMenus = await getCollection('secretMenus');
	const posts = [...articles.map(p => ({ ...p, urlPrefix: 'articles' })), ...secretMenus.map(p => ({ ...p, urlPrefix: 'secret-menus' }))];
	
	posts.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: `<language>en-us</language>`,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.updatedDate ? post.data.updatedDate : post.data.pubDate,
			description: post.data.description,
			link: `/${post.urlPrefix}/${post.id}/`,
		})),
	});
}
