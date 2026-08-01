# UX & Ad Placement Audit Report

**Date:** 2026-08-01
**Target:** `src/components/AdPlaceholder.astro`, `src/layouts/BlogPost.astro`, `src/layouts/SecretMenu.astro`

## 1. Cumulative Layout Shift (CLS) Analysis

**Findings:**
* **Excellent Base Defenses:** The `AdPlaceholder.astro` component uses solid modern CSS techniques to prevent CLS. It applies `contain: layout;`, `contain-intrinsic-size: 250px;`, and strict `min-height` rules (250px mobile, 280px desktop bottom, 600px desktop sidebar). This effectively reserves space before the AdSense JS executes.
* **Potential Risk - Responsive Behavior:** The AdSense snippet includes `data-full-width-responsive="true"`. While this is standard, AdSense sometimes dynamically resizes ad blocks vertically based on the exact ad served, which can still cause minor layout shifts if the injected ad exceeds the predefined `min-height`. 

**Recommendation:**
Monitor Core Web Vitals. If CLS is detected on ad load, consider adding `overflow: hidden;` to `.ad-slot-placeholder` or using explicit ad sizes rather than auto-responsive if it becomes problematic.

## 2. Google AdSense Policy Compliance

**A. Accidental Clicks (High Risk)**
* **Issue:** In `AdPlaceholder.astro`, the `.ad-container` class applies `margin: 1.5rem 0;` (approx 24px). In both `BlogPost.astro` and `SecretMenu.astro`, the ad slots (`post-bottom` and `secret-menu-bottom`) are placed immediately above the "Related Articles" section, which consists of densely packed clickable cards. 
* **Violation Risk:** 24px is a very tight margin. Google strictly penalizes layouts that encourage accidental clicks. On mobile devices, users scrolling or attempting to tap a related article could easily misclick the ad.
* **Recommendation:** Increase the buffer zone around ads. Change `.ad-container` margins to at least `3rem 0;` (approx 48px) to clearly separate ad inventory from interactive site elements.

**B. Sticky Sidebar Ads (Medium Risk)**
* **Issue:** In `BlogPost.astro`, an ad is placed inside `<aside class="article-sidebar">`, which is styled with `position: sticky; top: 6rem;`. 
* **Violation Risk:** AdSense permits sticky ads, but they have strict rules. The ad must never overlap with other content or navigation items at any point during scrolling. If a user's browser window is shorter than the sticky offset + the ad height (e.g., `6rem` + `600px` = ~696px), the bottom of the ad could be cut off or overlap the footer, which is a policy violation.
* **Recommendation:** Wrap the sticky ad with a media query that checks for viewport height (e.g., `@media (min-height: 800px)`) to ensure the sticky ad only renders or stays sticky on tall enough screens.

**C. Content Push / Above the Fold (Compliant)**
* **Status:** Good. Neither layout places ads at the top of the content body. Mobile users will immediately see the headline, hero image, and content. This successfully avoids the "ad-heavy above the fold" penalty.

**D. Clear Labeling (Compliant)**
* **Status:** Good. The component uses `<span class="ad-label">Advertisement</span>`. This perfectly complies with AdSense rules regarding distinguishing ad units from organic content.

## Conclusion
The technical implementation for CLS prevention is strong. However, the vertical spacing (margins) around the ad blocks must be increased to prevent accidental clicks and policy violations. The sticky sidebar ad also requires a height-based media query safeguard.
