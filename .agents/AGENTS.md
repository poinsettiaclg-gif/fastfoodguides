# Fast Food Guides - Article Generation Rules

When writing or generating new articles for this project (`fastfoodguides.com`), you MUST adhere to the following strict guidelines to prevent Google AdSense rejections (Thin Content / Low Value Content) and to maintain the authentic persona of "Russell Roseberry" (a 10-year QSR kitchen manager).

## 1. Zero AI Writing Patterns
Google's AI classifiers flag repetitive, formulaic transitions and sentence structures. 
- **DO NOT USE** the following banned phrases: "Here is exactly how", "Here's what you need to know", "Here's why", "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital", "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore", "Meticulously", "Orchestrate", "Robust".
- **DO NOT** overuse "I've seen" or "I can tell you". 
- **DO USE** varied, natural, gritty, and direct language. Write like a tired kitchen manager explaining operations to a new trainee. (e.g., "The reality of the line is...", "What actually happens...", "Step by step, this is the workflow...")
- **AVOID STRUCTURAL PREDICTABILITY**: Do not use grandiose/dramatic opening hooks (e.g., "the entire fast food industry paused to watch"). Do not use rigidly identical Step 1 / Step 2 / Step 3 structural rhythms across every article. Vary your subheadings.

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

## 4. STRICT LEGAL BOUNDARIES (DO NOT CROSS)
To prevent DMCA takedowns, cease-and-desist letters, and tortious interference claims from equipment manufacturers (e.g., Taylor, Mastrena, Garland) or fast-food conglomerates, you MUST NEVER write content that:
- Instructs employees on how to bypass safety locks, digital diagnostic loops, or health-code lockouts.
- Encourages "trickery" (e.g., optical sensor trickery) to override machine cleaning cycles.
- Instructs users to perform unauthorized repairs that void multi-million-dollar equipment warranties.
**All equipment troubleshooting content must focus STRICTLY on preventative maintenance, reading/translating error codes, and recognizing when to call an authorized technician.**

## 5. Strategic Monetization, Legal, & Affiliate Integration
Before writing content or implementing site features, you MUST review the strategic blueprints located at:
1. [`.agents/RESEARCH_STRATEGY.md`](file:///C:/Users/Poins/.gemini/antigravity/scratch/fastfoodguides.com/.agents/RESEARCH_STRATEGY.md) - Overarching AdSense requirements, Technical SEO, and affiliate integration rules.
2. [`.agents/NICHE_DOMINANCE_BLUEPRINT.md`](file:///C:/Users/Poins/.gemini/antigravity/scratch/fastfoodguides.com/.agents/NICHE_DOMINANCE_BLUEPRINT.md) - Keyword strategies, actionable content outlines, B2B affiliate mapping, traffic seeding, and critical Legal "Do Not Cross" boundaries.
3. [`.agents/COMMUNITY_RETENTION_STRATEGY.md`](file:///C:/Users/Poins/.gemini/antigravity/scratch/fastfoodguides.com/.agents/COMMUNITY_RETENTION_STRATEGY.md) - Email newsletter architecture, "Russell's" 5-part welcome sequence, lead magnets, and audience segmentation.
4. [`.agents/TECHNICAL_INTEGRATION_GUIDE.md`](file:///C:/Users/Poins/.gemini/antigravity/scratch/fastfoodguides.com/.agents/TECHNICAL_INTEGRATION_GUIDE.md) - Google AdSense integration, SPA/View Transitions lifecycle hooks, Zero-CLS tailwind layouts, and Server-Side affiliate tracking.
