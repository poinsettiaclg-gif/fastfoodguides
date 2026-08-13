# Advanced Integration Guidelines: Google AdSense, Privacy Compliance, and Core Web Vitals in Astro

## Executive Summary
Integrating complex third-party monetization systems (Google AdSense, affiliate tracking, IAB TCF v2.2 CMPs) into Astro introduces architectural friction, especially when using View Transitions (SPA routing). Native loading threatens Core Web Vitals (CWV) and risks Invalid Traffic (IVT) account suspensions. This guide provides the technical blueprint for conditional ad loading, off-main-thread execution, zero-CLS layouts, and SPA ad regeneration.

## 1. Consent Management Platform (CMP) Integration
To comply with the Digital Markets Act (DMA) and GDPR, the site must use Google Consent Mode v2 (GCM v2) and an IAB TCF v2.2 certified CMP (e.g., Cookiebot, Didomi). 

### Implementation Rules:
- The default consent state must be set to `denied` for `ad_storage`, `ad_user_data`, `ad_personalization`, and `analytics_storage` in the `<head>` of `BaseLayout.astro` **before** any Google tag executes.
- **`pauseAdRequests` Directive**: Initialize `window.adsbygoogle.pauseAdRequests = 1` globally before AdSense executes to prevent non-personalized ad requests from firing before the user interacts with the CMP banner.
- An event listener must wait for the CMP (`__tcfapi`) to resolve. If consent is granted (Vendor ID 755, Purpose 1), set `requestNonPersonalizedAds = 0`. If denied, set to `1`. Finally, unpause requests (`pauseAdRequests = 0`).

## 2. Core Web Vitals: Script Execution Strategies
- **The Partytown Paradox**: Do NOT use Partytown for programmatic ad networks like AdSense. AdSense requires deep, synchronous DOM access for container sizing and viewability tracking. Isolating it in a Web Worker causes fatal CORS errors, DOM latency, and violates Google policies. (Use Partytown safely for GA4).
- **Optimal AdSense Pattern (Deferred IntersectionObserver)**: Use native script deferral combined with programmatic lazy loading via the `IntersectionObserver` API. Inject `adsbygoogle.js` only when the user scrolls within 400px of an ad slot (`rootMargin: "400px 0px"`). This protects LCP and INP metrics.

## 3. Zero-CLS Ad Layouts in Tailwind
Responsive AdSense units cause massive Cumulative Layout Shifts (CLS) when they inject an iframe.
- **Deterministic CSS Constraints**: Wrap the `<ins>` tag in a strictly defined Tailwind container that reserves space:
  - Mobile: `min-h-[250px]` (Medium Rectangle)
  - Desktop: `md:min-h-[90px]` (Leaderboard Banner)
- **Graceful Degradation**: If Google returns an unfilled status (no ad available), collapse the space to prevent empty voids. Use the `:has()` pseudo-class in global CSS:
  ```css
  .ad-wrapper:has(ins.adsbygoogle[data-ad-status="unfilled"]) {
    display: none !important;
    min-height: 0 !important;
  }
  ```

## 4. View Transitions (SPA Routing) and Ad Lifecycle
When Astro View Transitions are enabled, AdSense breaks because it expects a full page reload. Attempting to push new ads without sanitizing the DOM causes `TagError` exceptions or hidden impressions that trigger Invalid Traffic (IVT) bans.

### The `astro:page-load` Solution:
- Create a centralized script that listens to the `astro:page-load` event.
- Systematically identify all `<ins class="adsbygoogle">` tags.
- **Sanitize the DOM**: If an `<ins>` tag has `data-adsbygoogle-status="done"`, cleanly destroy the old iframe by resetting `innerHTML = ''` and removing the status attributes.
- Use a micro-delay (`setTimeout` for 150ms) to allow the DOM to settle post-swap.
- Re-query fresh ad slots and individually push them to the AdSense queue.
- **Auto Ads Restriction**: Google Auto Ads do not support SPA routing. Rely on manual `<ins>` ad unit placements for internal pages.

## 5. Affiliate Tracking and Server-Side Mitigations
Client-side affiliate scripts (like Skimlinks) suffer from the same SPA breakage. Furthermore, 30% of users use ad blockers that intercept client-side affiliate scripts.
- **Server-Side Rendering (SSR)**: The elite-level architecture migrates affiliate link transformation off the client. Use Astro MDX plugins or remark/rehype plugins during the build step to hardcode affiliate parameters directly into the HTML. This achieves absolute ad-blocker immunity and zero performance impact.
