# JSON-LD Schema Audit Report (Google Rich Snippets)

## Overview
This report reviews the JSON-LD implementations in `BlogPost.astro` and `SecretMenu.astro` for Google Rich Snippets validity. Both layouts utilize the `@graph` structure to include `Article`, `BreadcrumbList`, and conditionally `FAQPage` schemas.

## General Validity
- **Graph Structure**: The use of `@graph` array under a single `@context: "https://schema.org"` is highly recommended and perfectly valid for combining multiple entity types on a single page.
- **FAQ Schema**: The `FAQPage` implementation matches Google's exact requirements (`mainEntity` -> `Question` -> `acceptedAnswer` -> `Answer`). This perfectly aligns with the `AGENTS.md` instructions requiring an FAQ schema for Helpful Content signals.
- **BreadcrumbList Schema**: Correctly constructed using `ListItem` with sequential `position`, `name`, and valid `item` URLs.

## Issues & Recommendations

### 1. `Astro.site` Undefined Error Risk (High Priority)
In both `BlogPost.astro` and `SecretMenu.astro`, URLs are constructed using `new URL(path, Astro.site)`.
```javascript
"image": heroImage ? [new URL(heroImage.src, Astro.site).href] : ["https://fastfoodguides.com/og-default.png"],
"url": new URL("/author/...", Astro.site).href
```
**Issue**: If `site` is not explicitly defined in `astro.config.mjs`, `Astro.site` is `undefined`. Passing `undefined` as the base URL to `new URL()` with a relative path will throw a `TypeError: Invalid URL` during the build or dev process.
**Fix**: Provide a fallback to `Astro.url.origin` or the domain explicitly.
```javascript
const siteUrl = Astro.site || Astro.url.origin;
new URL(path, siteUrl).href
```

### 2. SecretMenu.astro Schema Type (Opportunity)
Currently, `SecretMenu.astro` uses the `Article` schema. While this is valid, secret menu items often describe a custom food item with ingredients and instructions on how to order it. 
**Opportunity**: Consider augmenting or replacing the `Article` schema with a `Recipe` or `HowTo` schema.
- **Why?**: You have `ingredients`, `priceEstimate`, and `howToOrder`. A `Recipe` schema (using ingredients) or `HowTo` schema (using `howToOrder` as instructions) can trigger specialized rich results with images and steps directly in the SERP.

### 3. Image Sizing for Articles
Google's Article rich snippets guidelines recommend that the `image` URL provided in the schema should be at least 1200 pixels wide. Ensure that the `heroImage` generated via `Astro.assets` meets these dimensions when outputted to the `image` array in the schema.

### 4. Publisher Logo
The publisher logo points to `https://fastfoodguides.com/og-default.png`. Google recommends publisher logos to be a rectangular image, not a generic open graph image, preferably 600x60, or a square image. Ensure `og-default.png` is appropriate or swap it for a dedicated logo.

## Conclusion
The schema structure is highly compliant with Google's Rich Snippet requirements and effectively supports the "Russell Roseberry" persona and FAQ strategy. The only critical, immediate fix required is adding a fallback for `Astro.site` in `new URL()` instantiations to prevent potential build crashes.
