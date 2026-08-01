# Performance Optimization Review

## 1. Image Loading (Lazy/Eager & Optimization)
- **Hero Images**: High-priority images in `BlogPost.astro` and `SecretMenu.astro` use Astro's `<Image>` component with `loading="eager"`, `fetchpriority="high"`, and `decoding="async"`. This is fully optimized for Largest Contentful Paint (LCP).
- **Markdown Images**: Standard markdown images (e.g., `![alt](../../assets/...)`) are automatically processed by Astro's asset pipeline, converting them to optimized formats (WebP) with `width`, `height`, and `loading="lazy"` attributes out of the box. 
- **CSS Transitions**: The site includes a smart `animation: fadeIn 0.4s` in `global.css` for `.prose img[loading="lazy"]` to eliminate abrupt visual jumping as images load.
- **Component Images**: `AuthorBylineBottom.astro` explicitly and correctly assigns `width="56"`, `height="56"`, and `loading="lazy"` to its `<img>` tag.
- **Opportunity for Improvement**: The site logo in `Header.astro` (`<img src="/favicon.svg" class="brand-icon" />`) is missing explicit `width` and `height` attributes, which can cause minor Cumulative Layout Shift (CLS) on the initial render. 

## 2. Font Loading
- **Local Font Hosting**: The site uses `@fontsource/atkinson-hyperlegible` imported in `BaseHead.astro`. This means fonts are bundled and hosted locally via Vite, removing external blocking requests to `fonts.googleapis.com` and bypassing DNS lookups.
- **Font Display**: Fontsource enforces `font-display: swap` by default, which ensures text is instantly visible (preventing FOIT - Flash of Invisible Text) while the web font loads.
- **System Fallbacks**: Robust system fallbacks (`system-ui`, `sans-serif`) are used universally in `global.css`.

## 3. CSS Optimization
- **Custom Properties & Scope**: The design relies heavily on modern CSS custom properties (`var(--bg-body)`) defined in `global.css`. Component-specific CSS is natively scoped by Astro (e.g., in `index.astro`, `AuthorBylineTop.astro`), significantly reducing global CSS bloat and preventing collisions.
- **Request Chaining**: There are zero `@import` statements inside the CSS files, preventing render-blocking request chaining.
- **Animation Performance**: CSS transitions target composable properties (like `transform` and `opacity` on `.btn` and `.card:hover`) avoiding expensive layout recalculations.

## 4. Third-Party Script Optimization (Bonus)
- **Partytown Integration**: The site uses `@astrojs/partytown` to offload third-party scripts. Google Tag Manager and Analytics scripts in `BaseHead.astro` are loaded with `type="text/partytown"`. This executes these scripts in a Web Worker, ensuring they do not block the main thread, resulting in a significantly faster Time to Interactive (TTI).
