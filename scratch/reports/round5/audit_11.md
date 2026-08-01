# Interactive Tool UX & AdSense Audit
**Target Files:**
- `src/components/MacroCalculator.astro`
- `src/pages/tools/macro-calculator.astro`

## 1. Logic & UX Bugs

**BUG: Ghost Modifiers when selecting "None"**
In `MacroCalculator.astro`, there is a logic bug that occurs when a user switches back to the default "Select an item..." (`none`) after selecting an item and checking some modifiers.
- When an item is selected and modifiers are checked, switching to another valid item works fine because `renderModifiers(itemKey)` is called, which clears `modList.innerHTML`.
- However, if the user switches to `none`, the code simply hides the modifiers section (`modSection.style.display = 'none'`) and resets `currentBase` to zero, but **fails to clear the HTML of `modList`**.
- Because the checkboxes are only hidden and not removed from the DOM, `updateTotals()` still loops over the hidden checked inputs via `querySelectorAll('input[type="checkbox"]:checked')` and adds their nutritional values to the base 0. This results in the calculator showing phantom calories and prices when no item is selected.

*Fix Recommendation:* Add `modList.innerHTML = '';` inside the `if (itemKey === 'none')` block before resetting the base values.

## 2. AdSense Compliance Issues

**Thin Content / Low Value Content Flag**
The page `src/pages/tools/macro-calculator.astro` only has about 130 words of text. Google AdSense's automated reviewers are notoriously strict about "Thin Content." While this is an interactive tool, AdSense crawlers primarily read text depth and schema to determine page value. A standalone tool page with minimal text is at high risk of being flagged as low value content.

*Fix Recommendation:* 
Bulk up the page to meet the 800-word minimum outlined in the `AGENTS.md` guidelines.
- Add a detailed guide below the tool explaining how fast food macros are calculated.
- Include the required **FAQ schema** in the page's structure and frontmatter.
- Add insider insights from the "Russell Roseberry" persona using the required `<div class="callout callout-tip">` or `<ProTip>` components.
- Include relevant in-body images to satisfy the rich-content structural requirements.
