# Performance & Core Web Vitals Audit

## 1. Image Optimization

**Hero Images (LCP)**
- **Findings**: Both `BlogPost.astro` and `SecretMenu.astro` utilize the `astro:assets` `<Image>` component for their hero images. 
- **Configuration**: They are explicitly configured with `format="webp"`, `loading="eager"`, `fetchpriority="high"`, and `decoding="async"`. 
- **Analysis**: This is an excellent, textbook implementation for Core Web Vitals. By eagerly loading the hero image and assigning it a high fetch priority, you ensure the browser discovers and paints the Largest Contentful Paint (LCP) element as fast as possible. Using `webp` ensures a significantly smaller payload compared to JPEG/PNG.

**In-Body Images**
- **Findings**: In-body images within `.prose` are styled via CSS (`max-width: 100%`, `aspect-ratio: 16/9`), but they originate from the Markdown/MDX content. 
- **Analysis**: Astro automatically optimizes relative images in Markdown content (using the `astro:assets` pipeline) and generally applies `loading="lazy"` by default to images below the fold. 
- **Recommendation**: Ensure authors always use relative paths for images in Markdown (e.g., `../../assets/images/img.webp`) rather than placing them in the `/public` folder, which would bypass Astro's optimization pipeline.

## 2. Font Loading

**Current Implementation**
- **Findings**: `BaseHead.astro` imports `@fontsource/atkinson-hyperlegible`. 
- **Analysis**: Self-hosting fonts via npm (Fontsource) is highly recommended over using Google Fonts. It eliminates the need to resolve an external DNS (fonts.googleapis.com) and establish a new TLS connection, which speeds up font discovery.

**Opportunities for Improvement**
- **Preloading**: Currently, the font CSS is imported, but the critical `.woff2` font file itself is not explicitly preloaded. This can cause a slight delay in font rendering, leading to a Flash of Unstyled Text (FOUT) or a slight layout shift (CLS) when the web font swaps in. 
- **Recommendation**: Consider adding a `<link rel="preload">` for your primary font file in `BaseHead.astro`, or utilize an integration like `astro-font` or `Fontaine` to minimize CLS caused by font swapping.

## 3. Script Blocking (Analytics & AdSense)

**Google Analytics & Partytown**
- **Findings**: `astro.config.mjs` includes the `@astrojs/partytown` integration. In `BaseHead.astro`, Google Analytics (GTAG) is implemented using `type="text/partytown"`.
- **Analysis**: This is fantastic for performance. Moving analytics to a web worker frees up the main thread, which significantly reduces Total Blocking Time (TBT) and improves Interaction to Next Paint (INP).

**Google AdSense**
- **Findings**: The AdSense snippet in `BaseHead.astro` is currently commented out, but when active, it uses `<script async src="..."></script>`. 
- **Analysis**: While `async` prevents the script from blocking the HTML parser, AdSense is notorious for executing massive amounts of JavaScript on the main thread, which severely degrades Core Web Vitals (especially TBT). 
- **Recommendation**: Since AdSense rarely works correctly within Partytown due to DOM-access requirements, consider implementing a "lazy load" strategy for AdSense. Instead of loading it immediately on page load, inject the AdSense script only after the first user interaction (like `scroll`, `mousemove`, or `touchstart`) or delay it via a `setTimeout`. This ensures your initial page load metrics remain pristine.

**Consent Mode**
- **Findings**: The Google Consent Mode script is inline and synchronous in `BaseHead.astro`.
- **Analysis**: This is correct and necessary. Consent state must be initialized before any third-party tags fire. Keeping this script inline and small ensures it has a negligible impact on parse times.
