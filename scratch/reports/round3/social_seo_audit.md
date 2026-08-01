# Social SEO Audit: Fast Food Guides

**Date:** July 31, 2026
**Scope:** Review `BaseHead.astro` and article frontmatter to verify formatting for social sharing (`og:image`, `og:title`, and `twitter:card`).

## Findings

### 1. `BaseHead.astro` Implementation
The global meta tags are configured perfectly for social sharing with zero syntax errors.
*   **`og:title` & `twitter:title`**: Uses a dynamic `displayTitle` variable that correctly appends the `SITE_TITLE` only if it isn't already present, ensuring clean titles (e.g., `Article Title | Fast Food Guides`).
*   **`og:image` & `twitter:image`**: The `ogImageUrl` is correctly calculated using `new URL(image, Astro.site)` to guarantee an absolute URL, which is strictly required by platforms like Facebook and Twitter. A fallback to `/og-default.png` is correctly set if an image isn't provided.
*   **`twitter:card`**: Properly set to `summary_large_image`, enabling full-width image previews on Twitter.
*   **Twitter Handles**: Both `twitter:site` and `twitter:creator` are statically set to `@fastfoodguides`.
*   **Structured Data**: Uses robust conditional logic to include rich BreadcrumbList and WebSite JSON-LD schemas.

### 2. Layout Integration (`BlogPost.astro`)
The way frontmatter properties are passed to `BaseHead.astro` is correct.
*   Astro's `image()` schema in `content.config.ts` parses the markdown `heroImage` path into an image object.
*   `BlogPost.astro` correctly passes `image={heroImage?.src}` into `<BaseHead />`, allowing `BaseHead` to process the path into an absolute URL perfectly. 

### 3. Article Frontmatter
Reviewed several articles including `mcdonalds-ice-cream-machine.md` and `wendys-fresh-never-frozen.md`.
*   **Format**: The frontmatter is formatted in clean YAML without syntax errors.
*   **Properties**: Both `title` and `description` are correctly structured string values (with appropriate quoting where single quotes exist in the title).
*   **Images**: The `heroImage` correctly uses relative paths (e.g., `../../assets/images/general/generic-fryer.webp`), which Astro properly resolves at build time.

## Conclusion
The current implementation requires **no code changes**. All Open Graph and Twitter card meta tags are properly optimized for social media indexing and sharing.
