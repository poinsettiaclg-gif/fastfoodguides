# FTC Compliance Audit: Affiliate Disclosure

**Date**: July 31, 2026
**Auditor**: FTC Compliance Auditor

## Findings
1. **Disclaimer Page (`disclaimer.astro`)**:
   - An "Advertising Disclosure" section exists, but it only mentions Google AdSense and third-party advertising networks ("Fast Food Guides may display advertisements through Google AdSense and other advertising networks...").
   - It **does not** contain any specific FTC-compliant affiliate disclosure wording (e.g., "As an Amazon Associate I earn from qualifying purchases").

2. **Footer (`Footer.astro`)**:
   - The footer contains links to the Disclaimer and Privacy policies, but it lacks any site-wide affiliate disclosure statement. FTC guidelines generally require affiliate disclosures to be clear and conspicuous, often recommended in the footer or near the affiliate links themselves.

3. **Content Mentions**:
   - **Amazon**: Mentioned in `src/content/articles/panda-express-wok-chef.md` regarding purchasing welding sleeves.
   - **Kytch**: Mentioned in `src/content/articles/mcdonalds-ice-cream-machine-truth.md` and `src/content/articles/mcdonalds-ice-cream-machine.md`. 
   - *Note*: If any links to these or other products are affiliate links, an explicit disclosure is strictly required by the FTC.

## Conclusion
**Fail / Missing Disclosure.**
There is no explicit FTC Affiliate Disclosure present on the site. 

## Recommendation
If the site uses (or plans to use) affiliate links for Amazon products, Kytch equipment, or other vendors, you must add an explicit Affiliate Disclosure. 

Example addition for `Footer.astro` or `disclaimer.astro`:
> "Fast Food Guides is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We may earn a commission for purchases made through our links at no extra cost to you."
