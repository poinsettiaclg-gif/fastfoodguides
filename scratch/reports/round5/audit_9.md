# AdSense Policy Audit 9: Miscellaneous Articles
**Date:** 2026-08-01
**Auditor:** AdSense Policy Auditor (Antigravity)
**Scope:** Review of miscellaneous articles in `src/content/articles/` (Files not tied to a specific franchise).

## Overview
A ruthless and brutally honest review was conducted on the following 5 miscellaneous articles:
1. `fast-food-beginner-tips-starting-out.md`
2. `fast-food-hacks-never-order.md`
3. `first-day-fast-food-what-to-expect.md`
4. `pizza-delivery-driver-accident.md`
5. `tiktok-hacks-ruin-drive-thru-metrics.md`

## 1. AI Writing Patterns & Banned Phrases
**Result:** **PASS**
A comprehensive grep search for banned phrases ("Here is exactly how", "Here's why", "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital", "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore") returned **zero** results across all 5 articles. The tone successfully matches the gritty, experienced "Russell Roseberry" persona without triggering common AI-classifiers.

## 2. Word Count & Structural Requirements
**Result:** **PASS** (with minor flags)
- All 5 articles comfortably exceed the 800-word minimum to avoid Thin Content penalties.
- All 5 articles successfully incorporate the required `faq` frontmatter schema containing two questions and answers.
- All 5 articles contain at least one markdown image in the body and multiple `<div class="callout callout-tip">` / ProTip callouts.

### Minor Structural Flag: `pizza-delivery-driver-accident.md`
- **Duplicate Imagery:** The exact same image and alt text (`![What Happens if a Pizza Delivery Driver Gets in an Accident?](../../assets/images/general/generic-prep.webp)`) is embedded twice in the article (lines 55 and 76). To AdSense, this appears slightly spammy or low-effort (Thin Content behavior). One of these should be removed or replaced with a different relevant image.
- **Redundant FAQ Section:** The article includes a hardcoded `## Frequently Asked Questions` markdown section at the bottom that identically duplicates the frontmatter schema. While Schema + visible text is sometimes standard SEO practice, repeating it word-for-word could be seen as padding.

## 3. Policy Violations & YMYL (Your Money or Your Life) Risk
**Result:** **CRITICAL WARNING**

### Critical YMYL Violation: `pizza-delivery-driver-accident.md`
AdSense and Google Search Quality Rater Guidelines are notoriously ruthless regarding **YMYL (Your Money or Your Life)** content. This article provides explicit advice on:
- Auto insurance policies ("call your insurance agent to discuss whether you need a Business Use Endorsement").
- Legal and liability steps after a car crash ("Only exchange the legally required information...").

**Why this is a violation:** The persona "Russell Roseberry" is established as a "Former Multi-Unit Kitchen Manager." He is **not** a licensed insurance agent or a personal injury attorney. Google aggressively flags financial, legal, and insurance advice written by authors lacking verified, formal E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) credentials in those specific fields. Even with `disclaimerType: legal` in the frontmatter, this article presents a **very high risk of site-wide AdSense rejection** for offering unverified legal/insurance advice. 

**Recommendation:** Heavily dilute the direct legal and insurance advice, frame it purely as "what managers expect you to do for the store when you crash" (reporting, dispatching a new pizza), and remove the sections advising on what personal insurance riders to purchase, or remove the article entirely.

## 4. Keyword Stuffing
**Result:** **PASS**
None of the articles exhibit keyword stuffing. Topics are handled naturally, using appropriate operational LSI (Latent Semantic Indexing) keywords like "speed of service," "cross-contamination," "KDS," and "mise en place" without unnatural repetition.

## Summary Conclusion
Four of the five articles are excellent, high-value, and perfectly aligned with AdSense guidelines. However, **`pizza-delivery-driver-accident.md` is a critical YMYL liability** that needs immediate structural and content revision to avoid dragging down the site's overall quality score during the AdSense review.
