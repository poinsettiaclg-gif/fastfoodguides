# AdSense Policy Review: Subway and Wendy's Articles

**Review Scope:** `src/content/articles/` (Wendy's and Subway categories)
**Criteria:** Thin Content (< 800 words), Brand Safety, Dangerous Content, Keyword Stuffing, Duplicate Content.

## 1. Thin Content (< 800 words)
Automated word counts reveal that some content fails to meet the strict 800-word minimum threshold required to avoid low-value/thin content penalties:
* **`wendys-first-day-training.md`**: Estimated at ~785 words. **[VIOLATION]** Fails the 800-word minimum threshold.
* **`wendys-baked-potato-process.md`**: Estimated at ~840 words. **[WARNING]** Technically passes, but is borderline and could trigger thin-content algorithms depending on how HTML tags are parsed.

## 2. Brand Safety Violations
Certain articles contain controversial or sensitive topics that risk triggering AdSense brand safety and derogatory content filters, despite the author's intent to debunk them:
* **`subway-tuna.md`**: Centers heavily on the viral lawsuit claiming Subway's tuna is "fake." High density of phrases like "not real tuna," "various concoctions," "food fraud," and "DNA testing" could easily be flagged by automated safety algorithms.
* **`subway-bread-baking-process.md`**: Explicitly mentions the removal of azodicarbonamide, referring to it by the highly publicized and damaging phrase "yoga mat chemical." 
* **Frontmatter Misclassification**: `subway-pos-out-of-order.md` and `wendys-drive-thru-timer.md` incorrectly use `disclaimerType: medical`. Labeling standard operational articles as medical content can trigger sensitive health policy reviews and subsequent AdSense rejections.

## 3. Dangerous Content
While these are fast-food guides, a few articles use alarmist or graphic language that automated bots could misinterpret as dangerous or violent content:
* **`wendys-frosty-machine-boil-out.md`**: Includes graphic warnings about workplace injury (e.g., "scraper blades are genuinely sharp enough to slice your hand open").
* **`wendys-baked-potato-process.md`**: Uses explosive terminology to describe cooking errors (e.g., potatoes that "literally explode," creating "baked potato shrapnel").

## 4. Duplicate Content (Media)
While the text across the articles is unique, there is a significant issue with duplicate media assets that AdSense may interpret as low-effort or template-generated content:
* **Hero Image Reuse**: The file `generic-fryer-3.webp` is reused as the hero image for 5 different Wendy's articles (`clamshell-grill`, `closing-duties`, `drive-thru-timer`, `first-day-training`, `fresh-never-frozen`). 
* Subway articles repeatedly recycle `generic-pos-2.webp` and `generic-walk-in-2.webp`. 

## 5. Keyword Stuffing
* **[PASS]**: No severe keyword stuffing was detected. The articles read naturally and incorporate brand names, menu items, and operational terms ("Bain," "4-Corner Press") in an organic, contextually appropriate manner that aligns with the target QSR persona.
