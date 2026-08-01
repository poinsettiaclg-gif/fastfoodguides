# AdSense Policy & Rules Audit: Wendy's Articles

**Date:** 2026-08-01
**Target:** `src/content/articles/wendys-*.md`
**Auditor:** AntiGravity Agent (Ruthless Audit Mode)

## 1. Structural & Rule Compliance (Pass)
* **Word Count (Thin Content Check):** All nine Wendy's articles easily pass the 800-word minimum threshold (ranging from ~1,200 to ~2,200 words).
* **FAQ Schema:** Every article correctly implements the strict `faq` array in the frontmatter with exactly two operational questions and answers.
* **ProTip Components:** Every article successfully injects at least 2-3 `<div class="callout callout-tip">` elements.
* **In-Body Images:** Every article contains at least one markdown image in the body.
* **Banned Phrases:** Zero instances of the banned phrases ("Here is exactly how", "Here's what you need to know", "Here's why", "In conclusion", "Delve into", "Tapestry", etc.) were detected. 

## 2. Low Value Content & Formatting Glitches (Critical Flags)
AdSense reviewers are ruthless regarding auto-generated or poorly formatted content. The following issues must be fixed immediately:
* **Severe Alt-Text Truncation:** The markdown images contain lazily truncated, nonsensical alt text that screams "AI-generated". 
  * Examples: `![What is the Wendy]`, `![How Wendy]`, `![Does Wendy]`, `![Wendy]`. This is terrible for SEO and accessibility.
* **Excessive Whitespace:** Several articles (e.g., `wendys-4-corner-press.md`, `wendys-chili-leftover-hamburgers.md`) have 4 to 5 consecutive blank lines inserted directly after images. This looks like a formatting glitch and degrades the reading experience.
* **Repetitive Media:** `wendys-chili-leftover-hamburgers.md` uses the exact same generic image (`generic-prep.webp`) twice within the body text.

## 3. Potential Policy Violations (Restricted/Shocking Content)
While the persona is gritty and authentic, AdSense reviewers can be overly sensitive to content describing intentional health code violations or unsafe practices. Proceed with caution on these points:
* **Serving Expired Food:** `wendys-baked-potato-process.md` explicitly describes "frugal General Managers" intentionally using expired, unsafe baked potatoes as a chili thickener. Even though it notes this is "frowned upon," describing intentional food safety violations in food service can trigger automated flags.
* **Spoiled Dairy Consumption:** `wendys-frosty-machine-boil-out.md` describes a scenario where customers are served spoiled, sour Frosty mix due to skipped cleaning.
* **Workplace Hazards:** `wendys-first-day-training.md` describes the kitchen floors as "notoriously slick" with ambient grease, presenting a massive safety hazard.

## 4. Keyword Stuffing Check
* **Status: Acceptable.** The keyword "Wendy's" appears ~46 times in the longest article (`wendys-fresh-never-frozen.md`), resulting in a keyword density of roughly 2%. This is perfectly acceptable for a branded focus piece and does not cross the threshold into keyword stuffing. Other articles show similar or lower densities.

## Recommendations for Remediation
1. Rewrite all image alt texts to be descriptive and natural (e.g., `![Wendy's employee prepping the clamshell grill]`).
2. Remove all excessive consecutive blank lines from the markdown bodies.
3. Replace the duplicate image in the chili article with a different asset (e.g., `generic-fryer.webp`).
4. Consider softening the language around intentional food safety violations (like the expired potato thickener) to ensure it doesn't trigger AdSense restricted content filters.
