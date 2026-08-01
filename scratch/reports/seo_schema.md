# SEO & JSON-LD Schema Validation Report

## 1. AdSense Compliance & Schema Abuse (Critical)
* **Recipe Schema Spam (`SecretMenu.astro`)**: The layout uses `@type: "Recipe"` for secret menu items and places the "Exactly What to Say at the Speaker" text into the `recipeInstructions` property. Google's Structured Data Guidelines strictly state: *"Don't use Recipe markup for non-food items, or for items that are not a recipe (e.g. 'how to order')."* This is considered structured data abuse and can trigger a manual action penalty, removing rich results and risking AdSense compliance issues for "Misrepresentative Content".
* **Hardcoded Fake Data (`SecretMenu.astro`)**: The `totalTime` property is hardcoded to `"PT5M"` for all items to satisfy Recipe schema requirements. Falsifying metadata is a violation of Google's spam policies.

## 2. Missing Fields & Data Loss
* **Missing Author Configuration (`SecretMenu.astro`)**: The file attempts to read `author` and `authorTitle` from `Astro.props`. However, these fields are missing from the `secretMenus` Zod schema in `src/content.config.ts`. Because Astro strictly strips unknown frontmatter, these variables will *always* be undefined, forcing all Secret Menu pages to falsely default to the author "Russell Roseberry". 
* **Missing `mainEntityOfPage` (`SecretMenu.astro`)**: The Recipe schema lacks the `mainEntityOfPage` property, which is present in the `BlogPost.astro` schema and recommended by Google to explicitly link the schema to the page URL.

## 3. Syntax Risks & Bugs
* **Broken Author URLs (`BlogPost.astro` & `SecretMenu.astro`)**: The author URL and image paths are generated using a naive replacement: `author.toLowerCase().replace(/ /g, '-')`. If an author's name contains punctuation (e.g., "O'Connor"), this will output invalid paths like `o'connor`. It should use the proper regex slugification already present for chains: `replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-')`.
* **Inconsistent Base URLs (`BlogPost.astro`)**: The `image` property uses `Astro.url` as the base (`new URL(heroImage.src, Astro.url)`). `Astro.site` (used correctly in `SecretMenu.astro`) should be used instead to prevent local/internal IPs or incorrect protocols from leaking into canonical schema during SSR.
* **Redundant Date Parsing (`SecretMenu.astro`)**: The schema parses `pubDate` using `new Date(pubDate).toISOString()`. This is redundant because `pubDate` is already coerced to a Date object by `z.coerce.date()` in the config, so `pubDate.toISOString()` is sufficient (as done in `BlogPost.astro`).
