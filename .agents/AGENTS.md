# Fast Food Guides - Article Generation Rules

When writing or generating new articles for this project (`fastfoodguides.com`), you MUST adhere to the following strict guidelines to prevent Google AdSense rejections (Thin Content / Low Value Content) and to maintain the authentic persona of "Russell Roseberry" (a 10-year QSR kitchen manager).

## 1. Zero AI Writing Patterns
Google's AI classifiers flag repetitive, formulaic transitions and sentence structures. 
- **DO NOT USE** the following banned phrases: "Here is exactly how", "Here's what you need to know", "Here's why", "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital", "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore".
- **DO NOT** overuse "I've seen" or "I can tell you". 
- **DO USE** varied, natural, gritty, and direct language. Write like a tired kitchen manager explaining operations to a new trainee. (e.g., "The reality of the line is...", "What actually happens...", "Step by step, this is the workflow...")

## 2. Required Markdown Structure (Avoiding Thin Content)
Every article must be **at least 800 words** and contain the following structural elements to satisfy rich-content requirements:
- **Table of Contents**: Astro handles this automatically based on H2/H3 tags. Ensure you use proper Markdown headings (`## `).
- **ProTip Components**: Inject at least 2-3 `<div class="callout callout-tip">...</div>` or `<ProTip>` components to highlight insider operational tips.
- **In-Body Images**: You MUST include at least one markdown image `![alt text](path/to/image.webp)` in the body text. Do not rely solely on the `heroImage`. If you lack an image, use a relevant generic image from `src/assets/images/general/`.

## 3. Strict Frontmatter & FAQ Schema
Every article MUST include a `faq` array in the frontmatter containing exactly two operational questions and answers. This data is rendered as JSON-LD schema which boosts Helpful Content signals.

**Example Valid Frontmatter:**
```yaml
---
title: "Title Here"
description: "Description here."
pubDate: "2026-07-20"
author: "Russell Roseberry"
authorTitle: "Former Multi-Unit Kitchen Manager"
chain: "ChainName"
topic: "Category"
heroImage: "../../assets/images/chain/image.webp"
relatedArticles:
  - "article-slug-1"
  - "article-slug-2"
faq:
  - question: "Operational question 1?"
    answer: "Detailed operational answer."
  - question: "Operational question 2?"
    answer: "Detailed operational answer."
---
```
