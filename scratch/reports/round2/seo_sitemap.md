# SEO Sitemap & RSS Audit Report

## 1. Sitemap Configuration (`astro.config.mjs`)
- **Integration**: The `@astrojs/sitemap` integration is installed and properly configured in `astro.config.mjs`.
- **Dynamic Filtering**: The configuration leverages a custom `filter` function that programmatically excludes certain dynamic category/topic paths.
- **Thin Content Protection**: It parses the markdown files in `src/content/articles/` using `fs` and `gray-matter` at build time to calculate how many articles belong to each `chain` and `topic`. 
- **Exclusion Rule**: Any chain or topic that has fewer than 3 associated articles is excluded from the sitemap (i.e. paths like `/articles/chain/[slug]` or `/articles/topic/[slug]`). This is an excellent SEO strategy to prevent indexing "Thin Content" pages.

## 2. RSS Configuration (`src/pages/rss.xml.js`)
- **Collections Aggregation**: The RSS feed correctly aggregates posts from both the `articles` and `secretMenus` content collections.
- **Sorting**: Feed items are properly sorted in descending order by `pubDate`.
- **Date Handling**: The feed smartly uses `updatedDate` for the item's `pubDate` property if it exists, falling back to `pubDate`. This ensures feed readers see when an article was actually last updated.
- **Links & Routing**: Link mappings correctly distinguish the collections by prefixing the URLs appropriately (`/articles/[id]/` vs `/secret-menus/[id]/`).
- **Language**: Includes custom XML data `<language>en-us</language>`, which is good for feed accessibility and localization signals.

## Conclusion
Both the Sitemap and RSS configurations are set up thoughtfully. The sitemap in particular demonstrates advanced configuration to adhere to Google's quality guidelines regarding thin aggregator pages.
