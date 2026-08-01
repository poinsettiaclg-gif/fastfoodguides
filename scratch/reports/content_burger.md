# Burger Chains Content Audit Report

## 1. Structural and Length Requirements
- All 24 audited articles for McDonald's, Wendy's, and Burger King meet the minimum length requirement (approximately 800+ words, generally ranging from 6.5KB to 15KB).
- All required structural elements are present: frontmatter `faq` schema, markdown headings (`##`), `<div class="callout callout-tip">` ProTip components, and in-body markdown images.

## 2. Spun Content & AI Footprint (CRITICAL)
While the generator successfully avoided the explicitly banned phrases ("Delve into", "Tapestry", etc.), it inadvertently created a new AI footprint by copying the prompt's suggested "gritty" examples verbatim. 
- The exact phrases `"The reality of the line is..."`, `"What actually happens..."`, and `"Step by step, this is the workflow..."` were injected into multiple articles as exact matches (e.g., in `burger-king-whopper-build-process.md`, `mcdonalds-round-egg-process.md`, and `wendys-baked-potato-process.md`).
- Repetitive transitional phrases like `"A good kitchen manager watches..."` and `"A good manager uses..."` are overused across different chain articles.
This formulaic repetition of phrases constitutes "spun" paragraphs and risks triggering AI classifiers.

## 3. Original Insight
- The content itself contains excellent, specific operational insights (e.g., the McDonald's "Blue Glove Rule" for fresh beef, the 2.5-minute steam dome timing for round eggs, Wendy's 60-minute baked potato lead time, and the Burger King PHU holding pan logistics).
- There is no lack of original insight; the issue lies entirely in the repetitive sentence structures wrapping those insights.
