# Technical SEO Audit - Round 6
**Target:** `src/layouts/BlogPost.astro` & `src/layouts/SecretMenu.astro`

## Brutal Findings: Schema & DOM Mismatches

### 1. The "Ghost Data" Violations (Hidden Frontmatter)
Google's guidelines strictly state that data presented in structured data or intended for users must be visible on the page. We have fields being pulled from frontmatter that completely disappear in the UI:
*   **`BlogPost.astro` (`isDebunk`)**: The `isDebunk` property is destructured from `Astro.props` on line 18 but is **never rendered in the visible DOM**. If an article is a debunk, users need to see that badge or notice visually.
*   **`SecretMenu.astro` (`isVerified`)**: The `isVerified` property is extracted on line 17 but is **completely missing from the template**. For secret menus, whether an item is verified to work by a kitchen manager is critical trust-building information. Hiding this is a massive missed opportunity for E-E-A-T and UX.

### 2. Breadcrumb Schema Routing Error
In `SecretMenu.astro` (lines 94-97), the breadcrumb list schema defines the chain's URL as:
```javascript
"item": Astro.site ? new URL(`/articles/chain/${slugifyChain(chain)}/`, ...)
```
However, this page is under `/secret-menus/`. Linking back to `/articles/chain/...` in the breadcrumb instead of a dedicated secret menu chain page (or the main chain category) creates a disconnected hierarchy. The breadcrumb trail in the UI and the JSON-LD should logically reflect the user's path.

### 3. Missed Schema Opportunities (Wrong Schema Type)
In `SecretMenu.astro`, you are injecting standard `Article` structured data. 
However, the page contains `ingredients`, `priceEstimate`, and `howToOrder` (instructions). By forcing this into an `Article` schema instead of a **`Recipe`** or **`HowTo`** schema, you are throwing away guaranteed Rich Results for ingredients and step-by-step instructions. Google will just treat it as a generic article.

### 4. Author Image URL Hardcoding
In both files, the `Person` schema for the author generates an image URL assuming `.jpg`:
```javascript
"image": new URL("/images/" + (...) + ".jpg", ...)
```
If the author's image is a `.webp` or `.png`, the structured data will throw a 404 image error in Google Search Console, invalidating the author profile.

## Recommendations for Immediate Fix
1. Render `<span class="verified-badge">Verified</span>` in `SecretMenu.astro` if `isVerified` is true.
2. Render a "Debunked" flag in `BlogPost.astro` if `isDebunk` is true.
3. Switch `SecretMenu.astro` schema from `Article` to `Recipe` (mapping ingredients to `recipeIngredient` and howToOrder to `recipeInstructions`).
4. Ensure image extensions for authors are dynamically resolved or standardized.
