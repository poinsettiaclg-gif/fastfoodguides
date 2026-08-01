# Mobile UX & AdSense Audit: global.css

## 1. Mobile Readability
*   **Font Sizing:** The body font size elegantly scales down from `18px` on desktop to `16px` at `max-width: 720px`. This `16px` baseline is the golden standard for mobile readability and prevents iOS Safari from auto-zooming on form inputs.
*   **Line Spacing:** The line-height is set to `1.7` globally and `1.8` inside `.prose p`. This generous whitespace greatly enhances readability on small screens and reduces eye strain.
*   **Text Wrapping:** Using `word-wrap: break-word;` and `overflow-wrap: break-word;` globally is a fantastic defensive measure to ensure long strings (like URLs or unspaced words) don't trigger horizontal scrolling.
*   **Heading Scaling:** Headings effectively scale down at both the `720px` and `480px` breakpoints, preventing them from dominating the entire mobile viewport.

## 2. Contrast & Accessibility
*   **Background / Foreground:** The primary text (`#F1F5F9`) against the very dark background (`#0a0f1c`) provides excellent contrast, easily passing WCAG AAA standards.
*   **Secondary Text:** The secondary text (`#94A3B8`) also provides sufficient contrast against the background and surface colors, keeping it legible while maintaining visual hierarchy.
*   **Focus States:** Excellent inclusion of visible focus states (`outline: 2px solid var(--accent)`) on links and buttons, which is crucial for accessibility.

## 3. Responsive Design Execution
*   **Media Handling:** Images are correctly set to `max-width: 100%; height: auto;`, ensuring they fluidly fit their containers on mobile.
*   **Horizontal Scrolling Prevention:** Critical elements like `pre` (code blocks) and `table` are explicitly set to `overflow-x: auto`. The `table` is set to `display: block;` to allow this scrolling, which is a standard and effective responsive table pattern.
*   **Padding Adjustments:** The `main` container padding smartly reduces on smaller screens (`3em 1em` -> `2em 1em` -> `1.5em 0.75em`), maximizing usable screen real estate for content.

## 4. AdSense & Core Web Vitals Considerations
*   **Accidental Clicks Prevention:** The generous margins on paragraphs (`1.75em`), headings, and structural elements help prevent users from accidentally clicking ads when trying to scroll—a major compliance issue for AdSense.
*   **No Horizontal Overflow:** Because tables and images are contained, the page won't horizontally scroll. Horizontal scrolling often breaks ad placements and is penalized by Google.
*   **Layout Shifts (CLS):** To further optimize for AdSense, consider adding explicit CSS classes for ad slots (e.g., `.ad-slot-inline`) with `min-height` defined. This reserves space for the ad before it loads, preventing Cumulative Layout Shift (CLS), which directly impacts page experience signals and AdSense revenue.
*   **Anchor Links:** The `scroll-margin-top: 5rem;` on headings is a great touch. If you implement sticky ad units (like a bottom or top anchor ad), this prevents the ad from obscuring the heading when a user clicks a Table of Contents link.

## Summary
The `global.css` file provides a very solid foundation for a mobile-first, readable, and AdSense-friendly site. The responsive scaling is well thought out, and the contrast ratios are strong. To further bulletproof it for monetization, reserving space for asynchronous ad slots would be the next best step.
