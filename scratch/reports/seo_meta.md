# SEO Meta & OpenGraph Tags Audit

## 1. `BaseHead.astro` (The Core Component)
The `BaseHead` component is well-structured and provides a strong foundation for SEO and OpenGraph metadata.
- **Title Tag**: Properly structures titles (`Title | Site Name`) and avoids duplicating the site title on the homepage.
- **Meta Description**: Correctly outputs the `description` prop.
- **OpenGraph & Twitter**: Outputs standard `og:title`, `og:description`, `og:image`, `og:url` and maps them to Twitter summary large image cards.
- **Article Metadata**: Conditionally renders `article:published_time`, `article:modified_time`, and `article:section` if `ogType === 'article'` and the respective dates/chains are provided.
- **Other**: Includes Canonical URLs, Breadcrumb Schema, and conditional `noindex` robots tags.

## 2. Page Layouts (`BlogPost.astro` & `SecretMenu.astro`)
- **`src/layouts/BlogPost.astro`**: Fully implements `BaseHead`. Correctly extracts and passes `title`, `description`, `heroImage.src`, `chain`, `pubDate`, and `updatedDate`. This ensures all OG Article tags are generated.
- **`src/layouts/SecretMenu.astro`**: **[ISSUE FOUND]** It correctly passes `title`, `description`, `heroImage.src`, and `chain` to `BaseHead`. However, it destructures `pubDate` and `updatedDate` from frontmatter but **fails to pass them to `BaseHead`** (around line 91). This results in missing `article:published_time` and `article:modified_time` OG tags for all secret menu pages.

## 3. Standard Pages (`index.astro`, `about.astro`, `contact.astro`, etc.)
- All standard pages correctly import and use `BaseHead.astro`.
- They pass appropriate `title` and `description` values.
- They rely on the default `ogType="website"` and default `og:image` (`og-default.png`), which is the correct fallback behavior.
- Specialized pages like `404.astro` properly pass `noindex={true}`.

## Recommendations
- **Fix `SecretMenu.astro`**: Update the `<BaseHead>` call in `src/layouts/SecretMenu.astro` to include the `pubDate={pubDate}` and `updatedDate={updatedDate}` props so that the article publish dates correctly populate the OpenGraph metadata.
