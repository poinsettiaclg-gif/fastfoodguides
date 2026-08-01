# Desktop UX Layout Audit Report (Round 5 - Audit 16)

## Findings & Resolutions

### 1. Sticky Sidebar overlapping with Header
**Issue:** The `.article-sidebar` in `BlogPost.astro` was configured with `position: sticky; top: 2rem;`. However, the `<Header>` component is also configured as sticky with a fixed height of `4rem` and `z-index: 9999;`. As a result, when a user scrolled down, the sticky sidebar (including the Table of Contents and the Ad Placeholder) would slide *underneath* the sticky header, obscuring the top 2rem of the sidebar content.
**Resolution:** Updated `.article-sidebar` in `src/layouts/BlogPost.astro` to use `top: 6rem;` (4rem for the header + 2rem padding). Also adjusted its `max-height` from `calc(100vh - 4rem)` to `calc(100vh - 8rem)` to maintain correct bounds.

### 2. Missing Sticky Sidebar on Smaller Desktop Displays
**Issue:** The media query activating the desktop sticky sidebar in `BlogPost.astro` was set to `@media (min-width: 1024px) and (min-height: 800px)`. On standard laptop resolutions (e.g., 1366x768) or unmaximized browser windows, the sidebar was entirely hidden (`display: none`), meaning the Table of Contents and the Sidebar Ad were completely missing for those users.
**Resolution:** Removed the `(min-height: 800px)` constraint. The `.article-sidebar` already has `overflow-y: auto;`, allowing users on shorter vertical screens to scroll within the sidebar independently. This ensures ads and navigation remain accessible to all desktop users regardless of viewport height.

### 3. Scroll Margin Alignment
**Issue/Check:** Verified if anchors from the Table of Contents land appropriately relative to the sticky header.
**Resolution:** Confirmed that `src/styles/global.css` correctly sets `scroll-margin-top: 5rem;` on all headings (`h1`-`h6`), meaning anchors will clear the 4rem sticky header seamlessly without being obscured.

### 4. Layout Grid Blowout Prevention
**Issue/Check:** Verified if CSS Grid layout was vulnerable to blowout from non-wrapping content.
**Resolution:** Confirmed `.article-content` correctly utilizes `min-width: 0;` alongside the desktop `grid-template-columns: 1fr 300px;`, ensuring wide preformatted code blocks or tables do not break the 1024px+ grid structure.

## Summary
The desktop layout issues involving the sticky sidebar ad overlapping with the header and missing entirely on shorter desktop viewports have been addressed and resolved. The ad slot layout is now fully visible and functional across all desktop displays.
