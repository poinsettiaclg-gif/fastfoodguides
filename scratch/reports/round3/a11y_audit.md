# Accessibility (a11y) Audit Report

**Date:** July 31, 2026
**Scope:** `src/components` (Header, Footer, HeaderLink), `src/layouts` (BlogPost, SecretMenu), and `src/styles/global.css`.

## 1. Semantic HTML & Document Structure
- **Landmarks**: The application makes excellent use of HTML5 landmarks. Layouts properly wrap core content in `<main id="main-content">` and `<article>`. Header and Footer use `<header>` and `<footer>`.
- **Navigation**: Navigational elements are correctly wrapped in `<nav>` tags with distinct `aria-label` attributes (`"Main navigation"`, `"Site directory"`, `"Footer navigation"`, `"Breadcrumb"`), providing excellent context for screen readers.
- **Headings**: The heading hierarchy is logical. H1 is strictly used for the page title, followed by H2 for sections (e.g., "Frequently Asked Questions", "More Insider Guides").
- **Breadcrumbs**: Breadcrumbs use a semantic ordered list (`<ol>`) and the visual separators use `aria-hidden="true"` which is a best practice to avoid reading out symbols unnecessarily.

## 2. ARIA & Roles
- **Interactive States**: The mobile menu toggle button in `Header.astro` properly uses `aria-expanded` and `aria-controls`. 
- **Current Page Indication**: `HeaderLink.astro` and breadcrumbs correctly apply `aria-current="page"` to active links.
- **Modals**: The "Do Not Sell My Info" CCPA modal in `Footer.astro` is robustly configured as a dialog (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="dns-modal-title"`).
- **Buttons vs Links**: The "Do Not Sell My Info" trigger in the footer correctly uses a `<button>` rather than an `<a>` tag since it triggers a local JS action rather than navigation.

## 3. Keyboard Navigation & Focus Management
- **Skip Links**: A skip link (`<a href="#main-content" class="sr-only skip-link">`) is implemented at the top of the body in layouts, correctly styled to become visible on focus.
- **Focus Indicators**: `global.css` defines a clear `:focus-visible` state for links and buttons using `outline: 2px solid var(--accent); outline-offset: 2px;`, which overrides the default browser ring with a highly visible alternative.
- **Focus Trapping**: Both the mobile navigation menu and the CCPA modal implement keyboard event listeners for `Tab`/`Shift+Tab` to trap focus within the active overlay. They also support `Escape` to close and successfully return focus to the trigger element upon closing. 
- **Touch Targets**: The `.brand` logo link and `.header-cta` buttons enforce a `min-height: 44px`, aligning with WCAG 2.1 SC 2.5.5 (Target Size).

## 4. Color Contrast (WCAG AA)
The dark theme provides generally excellent contrast ratios:
- **Primary Text (`#F1F5F9`) on Body (`#0a0f1c`)**: ~15.6:1 (Pass)
- **Secondary Text (`#94A3B8`) on Surface (`#111827`)**: ~6.5:1 (Pass)
- **Accent Text (`#10B981`) on Body (`#0a0f1c`)**: ~5.8:1 (Pass)
- **Warning Text (`#F59E0B`) on Card (`#1E293B`)**: ~4.7:1 (Pass)
- **Danger Text (`#EF4444`) on Card (`#1E293B`)**: ~4.0:1 (Fails normal text, but passes for large text like the Annoyance Score which is `3rem` and `900` weight).

## 5. Potential Issues & Recommendations
While the accessibility baseline is exceptionally strong, here are minor areas for improvement:
1. **Reduced Motion**: `global.css` includes `html { scroll-behavior: smooth; }`. It is recommended to wrap this in an `@media (prefers-reduced-motion: no-preference)` query to respect OS-level reduced motion preferences for users with vestibular disorders.
2. **Hidden Logo Span**: In `Header.astro`, the logo link contains both an `<img alt="Fast Food Guides Logo">` and a `<span>Fast Food Guides</span>`. Screen readers may read both, resulting in redundant announcements (e.g., "Fast Food Guides Logo, Fast Food Guides, link"). Consider adding `aria-hidden="true"` to the span, or leaving the span and making the image `alt=""`.
3. **Focus Trap Edge Cases**: The custom JS focus traps use `querySelectorAll` for focusable elements. This is generally fine, but if disabled elements are ever added, the selector `[tabindex]:not([tabindex="-1"])` might accidentally pick them up if they lack a `disabled` check. 

**Conclusion:**
The layouts and components demonstrate a very high level of accessibility compliance out of the box, with excellent structural semantics, ARIA usage, and keyboard support.
