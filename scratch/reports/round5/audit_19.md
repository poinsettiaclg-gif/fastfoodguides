# Core Web Vitals & AdSense Optimization Audit

This audit reviews `astro.config.mjs` and `global.css` for Core Web Vitals optimizations (LCP, CLS, FID/INP), specifically in the context of running Google AdSense.

## 1. `astro.config.mjs` Analysis

*   **Partytown Integration (Positive Impact on FID/INP):** 
    The configuration includes `@astrojs/partytown`. This is an excellent architectural choice for AdSense. By offloading heavy third-party scripts (like Google Ads and Analytics) to a Web Worker, you keep the main thread free, ensuring First Input Delay (FID) and Interaction to Next Paint (INP) remain optimal.
*   **Unused Font Providers Import:** 
    `fontProviders` is imported from `astro/config` but isn't used in the configuration block. If custom fonts (like Atkinson Hyperlegible) are rendering via external stylesheets, consider configuring an Astro font provider or using `font-display: swap` to prevent Flash of Invisible Text (FOIT), which can negatively impact Largest Contentful Paint (LCP).

## 2. CSS Analysis (`global.css`)

*   **Cumulative Layout Shift (CLS) Risks:**
    *   **Missing Ad Slot Placeholders:** AdSense is notorious for causing CLS when ads pop into the page after the content loads. The global CSS lacks reserved space for ad units. 
        *   **Recommendation:** Add reserved wrappers (e.g., `.ad-slot { min-height: 250px; text-align: center; display: flex; justify-content: center; }`) to ensure space is pre-allocated before the ad renders.
    *   **Image Dimensions:** Images are styled with `max-width: 100%; height: auto;`. While responsive, if explicit `width` and `height` attributes aren't provided in the HTML, they will cause layout shifts as they load.
*   **Largest Contentful Paint (LCP) Considerations:**
    *   **Lazy Load Animations:** The fade-in animation applied to `.prose img[loading="lazy"]` is visually pleasing and cleanly implemented. 
        *   **Recommendation:** Ensure hero images (which are often the LCP element) are loaded with `loading="eager"` (the default) so they bypass this lazy selector and render instantly to keep LCP scores low.
