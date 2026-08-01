# UGC Footprint Audit Report: Giscus Integration

## Overview
An audit was conducted on the Giscus comments integration within the `BlogPost.astro` and `SecretMenu.astro` layout files to ensure correct placement and compliance with Google AdSense User-Generated Content (UGC) policies.

## Findings

### 1. Integration and Placement
- **`BlogPost.astro`**: The `<GiscusComments />` component is correctly imported and placed near the bottom of the layout, specifically below the main content, newsletter CTA, FAQ section, AdPlaceholder, and the "More Insider Guides" (Related Articles) section.
- **`SecretMenu.astro`**: Similar to the blog layout, `<GiscusComments />` is correctly imported and positioned at the bottom of the layout, following the main content, newsletter CTA, FAQ, AdPlaceholder, and Related Articles.

### 2. AdSense Policy Compliance (UGC)
Google AdSense holds publishers responsible for all content on pages where ads appear, including comments.
- **Visual Separation**: In both layouts, the `<AdPlaceholder>` components (`post-bottom` and `secret-menu-bottom`) are placed well above the comments section, separated by the "Related Articles" section. This is excellent practice as it creates a clear physical demarcation between monetized publisher content and unmoderated User-Generated Content.
- **Moderation Requirements**: Because Giscus loads comments via a GitHub Discussions iframe, the actual comment content is hosted externally. However, AdSense still considers this part of the user experience. The publisher must ensure that the GitHub repository's discussion board is actively moderated to prevent hate speech, harassment, adult content, or other AdSense policy violations from appearing on the site.

## Conclusion and Recommendations
The Giscus integration is **correctly placed and well-structured** to minimize AdSense policy risks regarding ad proximity to UGC. 

**Actionable Recommendations:**
1. **Maintain Active Moderation**: Ensure the GitHub repository linked to Giscus is monitored regularly for inappropriate content.
2. **UGC Disclaimer (Optional)**: If comment volume increases significantly, consider adding a brief disclaimer above the comments section stating that comments are user-generated and do not reflect the views of Fast Food Guides.
