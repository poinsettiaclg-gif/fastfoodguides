# Fast Food Guides

The internet's most comprehensive insider resource for fast food operations — written by a 10-year QSR veteran.

**Live site:** [fastfoodguides.com](https://fastfoodguides.com)

## Tech Stack

- **Framework:** [Astro](https://astro.build/) v6.4 (static site generator)
- **Hosting:** Cloudflare Pages (auto-deploys on push to `master`)
- **Analytics:** Google Analytics 4 (GA4)
- **Monetization:** Google AdSense

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable Astro components (Header, Footer, AuthorBylines)
├── content/articles/ # Markdown articles (81 articles across 40 chains)
├── layouts/          # BlogPost layout
├── pages/            # Route pages (index, about, contact, articles, chain/[chain])
└── consts.ts         # Site-wide constants
public/
├── images/           # Article images (WebP format)
├── ads.txt           # AdSense authorized sellers
├── robots.txt        # Crawler directives
└── favicon.svg       # Site favicon
```

## Adding a New Article

1. Create a new `.md` file in `src/content/articles/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Article Title"
   description: "Short description for SEO"
   pubDate: "2026-06-15"
   author: "Russell Roseberry"
   authorTitle: "Former Multi-Unit Kitchen Manager"
   chain: "Chain Name"
   ---
   ```
3. Write your article content in Markdown
4. Add images to `public/images/your-article-slug/`
5. Push to `master` to deploy

## Deployment

Push to `master` triggers automatic deployment via Cloudflare Pages:

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

## Author

**Russell Roseberry** — Founder & Head Writer
Former Multi-Unit Kitchen Manager · 10-Year QSR & Culinary Veteran
