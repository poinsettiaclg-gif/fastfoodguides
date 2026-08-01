# Mobile UX Layout Audit Report: Ad Placeholders & Layout Shifts

## Overview
An audit of the codebase was conducted to identify mobile layout issues, specifically focusing on Ad placeholders, above-the-fold visibility, and Cumulative Layout Shift (CLS).

## Findings

### 1. Ad Placements are Exclusively Below the Fold on Mobile
On mobile viewports, the only active ad slots are `post-bottom` (in `BlogPost.astro`) and `secret-menu-bottom` (in `SecretMenu.astro`). Because these are placed at the very end of the main content (right above the "Related Articles" section), mobile users will only see ads if they scroll to the very bottom of the page. This is suboptimal for monetization, as all ad impressions are pushed far below the fold.

### 2. Sidebar Ads are Completely Hidden on Mobile
The `sidebar-sticky` ad slot is placed inside the `<aside class="article-sidebar">` element in `BlogPost.astro`. This sidebar has a CSS rule of `display: none;` on screens smaller than 1024px. As a result, this premium ad unit is entirely lost on mobile devices rather than being repositioned (e.g., inline within the content).

### 3. Inconsistent `contain-intrinsic-size` vs `min-height`
In `AdPlaceholder.astro`, the `.ad-container` element uses CSS containment to prevent CLS:
```css
.ad-container {
    contain: layout;
    contain-intrinsic-size: 250px;
}
```
However, the `.ad-slot-placeholder` within it has varying `min-height` rules depending on the slot and viewport:
- Mobile bottom ad: `250px` (Matches intrinsic size)
- Desktop bottom ad: `280px`
- Sidebar sticky ad: `600px`

Because `contain-intrinsic-size` is hardcoded to `250px` across all variations, loading an ad that expands to 600px or 280px will result in layout shifts (CLS) on desktop. The `contain-intrinsic-size` property needs to dynamically match the `min-height` rules for each respective ad position and breakpoint.

### 4. Excessive Inline Margins
In `BlogPost.astro` and `SecretMenu.astro`, the ad components are wrapped in a div with inline styles:
```html
<div style="margin: 3rem 0;">
    <AdPlaceholder slot="post-bottom" />
</div>
```
While this ensures spacing, it contributes to large empty white spaces while the ad is in a "pending" state or if the placeholder itself already handles its own margins. `AdPlaceholder.astro` already has `.ad-container { margin: 1.5rem 0; }`. Stacking these margins creates a large gap (4.5rem total) which can look like a rendering error on mobile screens before the ad fills the space.

## Recommendations
1. **Introduce Inline Content Ads**: Add an AdPlaceholder mid-content (e.g., after the 3rd paragraph or specific H2 tags) to ensure mobile users see an ad without having to scroll to the very bottom of the page.
2. **Reposition Sidebar Ads for Mobile**: Instead of completely hiding the sidebar ad on mobile, conditionally move the ad slot into the main content stream on smaller viewports.
3. **Synchronize Intrinsic Sizes**: Update the CSS in `AdPlaceholder.astro` so that `contain-intrinsic-size` accurately reflects the `min-height` of each specific slot and media query, thus fully eliminating CLS.
4. **Remove Redundant Margins**: Remove the inline `margin: 3rem 0;` wrapper in the layout files and rely solely on the margin definitions within the `AdPlaceholder` component for consistency.
