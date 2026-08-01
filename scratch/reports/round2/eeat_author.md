# E-E-A-T Persona Audit: Russell Roseberry

## Overview
This report audits the Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) signals implemented for the "Russell Roseberry" persona in the Fast Food Guides project. The primary files reviewed are `src/pages/author/russell-roseberry.astro` and `src/components/AuthorBylineBottom.astro`.

## 1. Structured Data (Schema.org)
- **Implementation**: The author page (`src/pages/author/russell-roseberry.astro`) includes a robust `Person` JSON-LD schema.
- **E-E-A-T Signals**:
  - `jobTitle`: "Former Multi-Unit Kitchen Manager" establishes immediate operational authority.
  - `knowsAbout`: Contains highly specific, technical industry terms which signal deep expertise to search engines, including:
    - "Quick Service Restaurant Operations"
    - "Food Safety and HACCP"
    - "Drive-Thru Efficiency"
    - "Commercial Kitchen Equipment"
    - "EcoSure Audits"
    - "Restaurant Staff Training"
  - `worksFor`: Associates the persona with "Fast Food Guides Media LLC", adding legitimacy.

## 2. Experience Narrative and Biography
- The bio establishes a credible progression from entry-level ("Crew Member making minimum wage") to senior management ("Multi-Unit Kitchen Manager").
- Mentions direct experience with major brands: Wendy's, Domino's, and Panera Bread.
- Highlights specific operational realities rather than generic corporate speak (e.g., "burning myself on a flat-top grill", "when the POS system crashes mid-rush").

## 3. Detailed Career Timeline
The timeline reinforces the narrative with specific dates and operational metrics:
- **Multi-Unit Kitchen Manager (2021 - Present)**: Mentions passing corporate Operational Assessment scores and maintaining sub-2% food cost variance.
- **General Manager (2018 - 2021)**: Mentions managing a $2.5M/year drive-thru and focusing on SOS (Speed of Service) times.
- **Shift Supervisor (2015 - 2018)**: Details early morning 4:00 AM prep shifts and raw protein processing.
- **Crew Member (2014 - 2015)**: Mentions foundational grill and fryer station experience.

## 4. On-Page Byline Integration
- **Implementation**: The `AuthorBylineBottom.astro` component displays at the bottom of articles.
- **E-E-A-T Signals**: 
  - Reinforces the 10-year experience claim and the "crew member to multi-unit kitchen manager" journey on every post.
  - Explicitly states: "Every guide on this site comes from direct operational experience."
  - Provides an editorial link to "View Russell's full career timeline", directing users (and crawlers) back to the authoritative author page.

## Conclusion
The Russell Roseberry persona is configured with strong E-E-A-T signals. The combination of detailed JSON-LD schema, a believable and highly specific career progression timeline, and consistent integration across the site's articles via the author byline component effectively positions the persona as an authoritative and experienced voice in the QSR space.
