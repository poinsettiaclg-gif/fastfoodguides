# Pageviews Optimization Strategy: Road to 50k Sessions

To reach our 50k sessions goal, we must dramatically improve our pages-per-session metric. By capturing users on their initial visit and guiding them deeper into the site, we maximize ad impressions and engagement signals. Here is a three-pronged approach for Fast Food Guides:

## 1. UX Changes for Seamless Discovery
- **Sticky Table of Contents & Sidebar:** Implement a sticky sidebar for desktop that features the TOC alongside a dynamic "Trending QSR Guides" widget. As users scroll, they constantly see other high-value articles.
- **In-Content Content Blocks (Interlinks):** Avoid saving all related links for the end of the post. Inject stylized `<RelatedReading>` components midway through the 800+ word articles, mimicking major publishers.
- **Frictionless Reading (Infinite Scroll / Auto-Load):** Instead of a hard stop at the bottom of an article, auto-load the next chronologically or thematically related guide.

## 2. 'Related Articles' Algorithm Improvements
Currently, we rely on a manual `relatedArticles` array in the Markdown frontmatter. To scale engagement, we need an automated, smarter approach:
- **Topic & Chain Clustering:** Use Astro's content collections to dynamically filter and surface articles that share both the `chain` and `topic` (e.g., matching a McDonald's Prep guide with a McDonald's Closing guide).
- **Recency + Popularity Weighting:** Modify the related posts logic to weight highly trafficked "cornerstone" articles (like "Ultimate Wendy's Grill Guide") alongside the newest releases, preventing users from bouncing on obscure content.
- **Semantic/Vector Search (Future State):** Introduce embeddings-based related articles if the corpus grows beyond simple tags, recommending articles with overlapping operational techniques.

## 3. Gamification: Quizzes and Interactivity
Leveraging the "Russell Roseberry" persona, we can make the site feel like authentic kitchen training:
- **"Test Your Fast Food Knowledge" Widgets:** At the bottom of guides, embed simple, 3-question interactive quizzes using a custom Astro `<Quiz>` component (e.g., "What temp does the fry vat need to be?").
- **"Survive the Shift" Scenarios:** Mini choose-your-own-adventure style prompts at the end of YMYL/Safety articles. (e.g., "A health inspector walks in during the lunch rush. What do you check first?")
- **Scores & Easter Eggs:** Allow users to see a "Kitchen Rank" (e.g., Trainee -> Line Cook -> Kitchen Manager) based on quiz performance, encouraging them to click through more articles to "level up."

## Implementation Next Steps
1. Create and style the `<Quiz>` Astro component.
2. Refactor the `[slug].astro` layout to support dynamic, taxonomy-based related posts instead of relying solely on manual frontmatter.
3. Deploy a sticky sidebar in the main layout.
