# Technical SEO Growth Strategy for Fastfoodguides.com (Astro)
**Goal:** Exponentially increase search footprint to reach 50k sessions.

## 1. Programmatic SEO (pSEO) Expansion
Leverage Astro's dynamic routing (e.g., `src/pages/[chain]/[menu-item].astro` or `[chain]/[topic].astro`) to generate hundreds of highly specific, long-tail landing pages.
*   **Menu Item Deep-Dives:** Create a JSON dataset of popular fast food menu items and their operational nuances. Generate pages targeting "[Menu Item] how it's made" or "[Chain] [Item] ingredients".
*   **Comparison Pages:** Programmatically generate "[Chain A] vs [Chain B] kitchen operations" using structured data points.
*   **Astro Implementation:** Use `getStaticPaths()` to fetch data from your JSON/headless CMS and pre-render these pages for maximum speed and SEO crawlability.

## 2. Automated Internal Linking Engine
Astro can read local files efficiently using `import.meta.glob`.
*   **Contextual Links:** Create a utility script that runs during the build process. It parses the Markdown content and automatically injects internal links for specific keywords (e.g., linking "fryer calibration" to the specific fryer guide) without requiring manual author input.
*   **Related Articles Component:** Utilize the `relatedArticles` frontmatter (mandated by the AGENTS.md rules) to render a "Related Operational Guides" widget at the bottom of every article.
*   **Breadcrumbs:** Implement automated BreadcrumbList JSON-LD and UI breadcrumbs on all programmatic and standard pages to improve site architecture and crawl depth.

## 3. Long-Tail FAQ Aggregation & Schema
The site rules already mandate a `faq` array in the frontmatter of every article.
*   **Global/Chain FAQ Pages:** Create an Astro page that maps over all Markdown files, extracts the `faq` arrays, and generates a massive, categorized `/faqs/` directory or `/[chain]/faqs/` pages. 
*   **FAQPage JSON-LD:** Ensure these aggregated pages implement standard `FAQPage` structured data. This helps capture "People Also Ask" (PAA) rich snippets in Google for granular operational questions.

## 4. Enhanced Structured Data (JSON-LD)
Go beyond basic FAQ schema to build topical authority.
*   **Author Schema:** Solidify the "Russell Roseberry" persona by using `Person` schema linked to an author bio page, demonstrating E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) as a 10-year QSR kitchen manager.
*   **Article Schema:** Ensure all Markdown posts use `Article` or `HowTo` schema (for step-by-step kitchen procedures), mapping the `pubDate` and `heroImage` frontmatter fields to the schema properties.

## 5. Core Web Vitals & Crawl Budget Optimization
*   **Image Optimization:** Mandate the use of Astro's native `<Image />` component or `astro:assets` for the `heroImage` and in-body images to ensure they are served in WebP/AVIF with automated width/height attributes (preventing Cumulative Layout Shift).
*   **Sitemap Generation:** Use `@astrojs/sitemap` configured to pull the `pubDate` as `<lastmod>` to signal fresh content to Googlebot. If pSEO expands the site beyond 10,000 URLs, implement sitemap indexing (splitting into multiple sitemaps).
