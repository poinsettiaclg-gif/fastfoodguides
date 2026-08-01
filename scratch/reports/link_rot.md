### Link Rot & Malformed Links Report

**1. Nested / Broken Link Syntax**
* **File**: `src/content/articles/firehouse-subs-steaming-process.md` (Line 83)
  * **Issue**: Mismatched/nested link brackets breaking the markdown parser.
  * **Content**: `[bread baking process](/articles/[subway](/articles/chain/subway)-bread-baking-process)`
  * **Fix**: Remove the nested link and point directly to the valid slug: `[bread baking process](/articles/subway-bread-baking-process)`

**2. Orphaned Formatting Characters**
Several files contain trailing `))*` characters immediately following a valid link, which breaks markdown compilation or renders poorly on the site:
* **File**: `src/content/articles/firehouse-subs-steaming-process.md` (Line 28)
  * **Content**: `[Chick-fil-A Breading Process: The Pressure Cooker](/articles/chick-fil-a-breading-process/))*`
* **File**: `src/content/articles/jersey-mikes-hot-sub-grill.md` (Line 24)
  * **Content**: `[Mike's Way](/articles/jersey-mikes-mikes-way/))*`
* **File**: `src/content/articles/wendys-frosty-machine-boil-out.md` (Line 25)
  * **Content**: `[Wendy's Closing Duties: A Full Night Breakdown](/articles/wendys-closing-duties/))*`

**3. Contextual/Semantic Link Errors**
* **File**: `src/content/articles/culvers-butterburger.md` (Line 76)
  * **Issue**: The anchor text says "McDonald's UHC", but the link points to `/articles/mcdonalds-ice-cream-machine-truth` instead of the correct article.
  * **Fix**: Update the URL to `/articles/mcdonalds-uhc-cabinet`

* **File**: `src/content/articles/mcdonalds-abs-system.md` (Line 77)
  * **Issue**: Awkwardly placed text/link boundary affecting readability.
  * **Content**: `the drive-[How Does the Taco Bell Drive-Thru Timer Actually Work?](/articles/taco-bell-drive-thru-timer/)—the number that corporate watches...`

*(Note: Standard internal links pointing to `/articles/[slug]`, `/secret-menus/[slug]`, and dynamic routes like `/articles/chain/[chain]` were verified against the existing 153 markdown files and resolve correctly aside from the syntax errors noted above).*
