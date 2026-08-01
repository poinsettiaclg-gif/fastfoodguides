# AdSense Policy Audit - McDonald's Articles

## Overview
An automated and manual review of the 11 McDonald's articles in `src/content/articles/` was conducted to check for Thin Content, Keyword Stuffing, and Policy Violations (including banned AI phrases and structural requirements).

## Critical Violations (AdSense Red Flags)

**1. Duplicate Content / Keyword Cannibalization (High Risk)**
- `mcdonalds-ice-cream-machine.md`
- `mcdonalds-ice-cream-machine-truth.md`
**Violation:** These two articles are virtually identical in topic and structure. Both target the exact same search intent ("why is the McDonald's ice cream machine always broken," the Taylor C709/C602 machine, heat pasteurization cycles, and the Kytch controversy). 
**Impact:** AdSense reviewers will ruthlessly flag this as **Thin Content / Low Value Content** due to redundancy across the domain. You cannot have two articles competing for the exact same granular topic. One must be deleted or merged into the other.

**2. Near-Match Banned Phrase**
- `mcdonalds-ice-cream-machine.md`
**Violation:** In the frontmatter description, it contains the phrase `"Here is why it breaks..."` which is a direct variant of the banned AI phrase `"Here's why"`. This needs to be rewritten to sound more direct and gritty per the persona guidelines.

## Verified Compliance
- **Word Count:** All 11 articles comfortably exceed the 800-word minimum (ranging from ~1,000 to ~2,300 words), meaning no single article is flagged as Thin Content based on length.
- **FAQ Schema:** All articles correctly implement the strict 2-question `faq` array in their frontmatter.
- **ProTips & Images:** All articles include at least two `callout-tip` ProTip components and at least one in-body markdown image.
- **Keyword Stuffing:** `mcdonalds-fry-station.md` uses the term "McDonald's" 26 times, which initially triggered a heuristic flag. However, given the 2,355-word length of the article, this is a ~1.1% keyword density and perfectly natural. No keyword stuffing violations were found.

## Recommendation
Immediately delete or merge `mcdonalds-ice-cream-machine-truth.md` into `mcdonalds-ice-cream-machine.md` to resolve the duplicate content violation before AdSense review, and slightly adjust the description in `mcdonalds-ice-cream-machine.md` to avoid the banned phrase.
