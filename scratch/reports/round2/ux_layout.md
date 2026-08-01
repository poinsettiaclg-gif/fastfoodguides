# UX Layout Audit: Ad Placement Review

## 1. `src/layouts/BlogPost.astro`
- **Sidebar Sticky Ad (`slot="sidebar-sticky"`)**:
  - **Location**: Inside `<aside class="article-sidebar">`, placed right below `<TableOfContents />` with a 2rem top margin.
  - **Potential Issue (Below Fold / Viewability)**: The entire `.article-sidebar` is styled with `position: sticky; top: 2rem;`. If a blog post has a long Table of Contents, the ad placeholder will be pushed down below the browser's viewport fold. Users would not see the ad because the sticky container locks its top position and won't let the user scroll down to the bottom of the sidebar if it exceeds the viewport height.
  - **Potential Issue (Accidental Clicks)**: The ad is positioned near a dense, interactive list of navigation links (the TOC). If the ad is loaded dynamically and causes a layout shift, or if a user attempts to click a bottom TOC link just as the ad renders, it could result in an accidental click.
- **Post-Bottom Ad (`slot="post-bottom"`)**:
  - **Location**: Below the FAQ section and above the "More Insider Guides" related articles grid.
  - **Status**: It uses `<div style="margin: 3rem 0;">`, providing generous spacing. This minimizes the risk of accidental clicks when users navigate between the content and related articles. No content is pushed below the fold.

## 2. `src/layouts/SecretMenu.astro`
- **Bottom Ad (`slot="secret-menu-bottom"`)**:
  - **Location**: Below the FAQ section and before the Related Articles grid.
  - **Status**: Like `BlogPost.astro`, this ad placeholder is well-spaced (`margin: 3rem 0;`). It safely avoids causing layout shifts that push primary content below the fold since it is positioned at the very end of the page.
- **General Layout Considerations**:
  - There are no top-of-page or in-body ads hardcoded in the layout, which effectively avoids pushing the primary hero image or introductory content below the fold.

## Summary Recommendations
1. **Prevent Sidebar Cut-off**: To ensure the sidebar ad remains visible and doesn't fall below the fold on average screens, consider restricting the max height of the TOC (e.g., `overflow-y: auto; max-height: 50vh;`) or adding a `max-height: calc(100vh - 4rem); overflow-y: auto;` to the `.article-sidebar`.
2. **Prevent Accidental Clicks**: Add an "Advertisement" label above the AdPlaceholder components, especially in the sidebar, to create a clear visual distinction between interactive site navigation (TOC) and external ads.
3. **Pre-allocate Space**: Ensure `<AdPlaceholder>` components or their wrapper `div`s have minimum heights defined in CSS so that ads loading asynchronously do not cause Cumulative Layout Shifts (CLS), which can inadvertently cause accidental clicks.
