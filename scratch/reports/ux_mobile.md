# Mobile UX Review Findings

## 1. Touch Targets
- **Header CTA**: The "Secret Menus" button (`.header-cta`) forces `padding: 0.4rem 1rem !important;`. On mobile, this creates an interactive height of ~36px, which falls below the WCAG recommended 44x44px minimum touch target size.
- **Header Logo**: The `.brand` link doesn't have explicit vertical padding. Its height is constrained to its content (~32px), which is smaller than the 44px target.
- *(Note: General navigation links in the header and footer correctly exceed the 44px threshold due to sufficient padding).*

## 2. Font Sizes
- **General Mobile Text**: `global.css` correctly reduces the base `font-size` from `18px` to `16px` for screens `< 720px`, which aligns with standard readability guidelines.
- **Small Text Issues**:
  - Footer links (`.footer-col a`, `.footer-nav a`) drop to `0.875rem` (14px) and `0.85rem` (13.6px). 
  - The footer tagline uses `0.825rem` (13.2px). 
  - On extra-small screens (`< 480px`), table content and `<pre>` elements are scaled down to `0.85em` (13.6px). While common for dense data, this can cause readability strain on small screens.

## 3. Viewport Meta Tags
- **Current Tag**: `BaseHead.astro` includes a standard and correct tag: `<meta name="viewport" content="width=device-width,initial-scale=1" />`. 
- **Accessibility**: It correctly allows user zoom by omitting restrictions like `maximum-scale=1` or `user-scalable=no`.
- **Recommendation**: Consider adding `viewport-fit=cover` to better handle edge-to-edge screens with notches (e.g. modern iPhones), ensuring `env(safe-area-inset-*)` padding is applied in the CSS where necessary.
