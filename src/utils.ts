export function slugifyChain(chain: string): string {
	return chain.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function slugifyTopic(topic: string): string {
	return topic.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const chainEmojis: Record<string, string> = {
	"McDonald's": '🍟',
	'Burger King': '🍔',
	"Wendy's": '🟥',
	'Taco Bell': '🌮',
	"Chick-fil-A": '🐔',
	'Subway': '🥖',
	'Starbucks': '☕',
	"Popeyes": '🍗',
	'KFC': '🪣',
	'Chipotle': '🌯',
	"Sonic": '🧊',
	"Dairy Queen": '🍦',
	"Panera Bread": '🍞',
	"Domino's": '🍕',
	"Pizza Hut": '🍕',
	"Five Guys": '🥤',
	"In-N-Out": '🌴',
	"Jack in the Box": '📦',
	"Whataburger": '🧡',
	"Arby's": '🥩',
	"Raising Cane's": '🍗',
	"Panda Express": '🐼',
	"Wingstop": '🍗',
	"Culver's": '🧈',
	"Zaxby's": '🍗',
	"Shake Shack": '🍔',
};

export function getChainEmoji(chainName: string): string {
	return chainEmojis[chainName] || '🍽️';
}

export const topicEmojis: Record<string, string> = {
	'Chicken': '🍗',
	'Burgers': '🍔',
	'Pizza': '🍕',
	'Mexican': '🌮',
	'Sandwiches': '🥪',
	'Breakfast & Coffee': '☕',
	'Other Chains': '🍽️',
	'General': '🍔'
};

export function getTopicEmoji(topicName: string): string {
	return topicEmojis[topicName] || '🍽️';
}

export function getFormattedDate(date: Date): string {
	return date.toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}
