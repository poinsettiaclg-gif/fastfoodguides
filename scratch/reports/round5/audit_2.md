# AdSense Policy Audit Report: Burger King Articles

**Date:** 2026-08-01
**Target Directory:** `src/content/articles/` (Filtered for "Burger King" chain)

## Executive Summary
The text length and explicit formatting requirements (Word count > 800, H2 structural tags, and ProTip components) are generally being met. However, the audit revealed **Critical Violations** regarding Google's Structured Data guidelines, specifically involving hidden or mismatched FAQ schemas, as well as manipulative metadata tags. These issues pose a high risk of AdSense rejection or Google Search Console manual penalties.

---

## 1. CRITICAL VIOLATION: Hidden Schema & FAQ Mismatch
Google's Structured Data guidelines explicitly mandate that JSON-LD FAQ schema must identically match the visible content rendered to the user. All four audited articles fail this requirement.

*   **Mismatch in Body Content:** `burger-king-broiler.md`, `burger-king-broiler-closing.md`, and `burger-king-expeditor-role.md` contain exactly two FAQ entries in their YAML frontmatter. However, their markdown bodies contain a `## Frequently Asked Questions` section featuring **three completely different questions**.
*   **Completely Hidden Schema:** `burger-king-whopper-build-process.md` contains the required two FAQ questions in its frontmatter, but **lacks an FAQ section entirely** in the markdown body. Injecting schema that is hidden from the user is a direct violation of Google's spam policies and will result in penalties.

## 2. POLICY VIOLATION: Manipulative/Incorrect Metadata (YMYL Risk)
Misusing metadata can cause algorithmic classifiers to flag the site.
*   **Evidence:** `burger-king-broiler-closing.md` contains `disclaimerType: medical` in its frontmatter. A guide about scrubbing a 600-degree grease broiler is not medical content. This error could trigger Google's strict YMYL (Your Money or Your Life) filters, leading to immediate algorithmic suppression or AdSense rejection.

## 3. QUALITY ISSUE: Repetitive Visual Assets (Thin Content Signals)
While the articles meet the 800-word minimum, they rely heavily on identical, repeated generic assets, which can trigger "Low-Value Content" signals.
*   **Evidence:** The image `generic-walk-in-2.webp` is used in three separate Burger King articles, and `generic-prep.webp` is reused across multiple articles. The lack of unique visual media across closely related pages lowers the overall page quality score.

## 4. QUALITY ISSUE: Unprofessional Formatting & Typos
Basic grammatical errors detract from the authentic "veteran kitchen manager" persona.
*   **Evidence:** 
    *   `burger-king-broiler.md` (Frontmatter Line 21): "...holding cabinet. during busy drive-thru rushes..."
    *   `burger-king-expeditor-role.md` (Body Line 87): "...mid-afternoon lulls. during a peak dinner or lunch rush..."

## Recommendations for Immediate Remediation:
1.  **Sync FAQ Data:** Either update the Astro template to dynamically render the frontmatter `faq` array directly into the HTML body, or manually rewrite the body `## Frequently Asked Questions` sections to perfectly match the frontmatter questions.
2.  **Strip the Medical Disclaimer:** Remove `disclaimerType: medical` from the broiler closing article immediately.
3.  **Fix Typos:** Capitalize the errant "during" instances to maintain editorial standards.
