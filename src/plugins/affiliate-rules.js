/**
 * Affiliate callout rules configuration.
 *
 * Each rule defines the match criteria (topics, chains, keywords) and
 * the callout HTML to inject into matching articles at build time.
 *
 * Matching priority:
 *   1. topic + chain  (most specific)
 *   2. topic only
 *   3. keyword only   (fallback)
 *
 * Only ONE callout is injected per article (the best-matching rule wins).
 * Articles with `hasAffiliate: true` in frontmatter are skipped entirely
 * to avoid duplicating manually-placed affiliate content.
 */

/**
 * Build the shared HTML wrapper used by every callout rule.
 * Keeps the template in one place so future design changes are trivial.
 */
function buildCalloutHtml({ title, body, link, buttonText, readMoreLink }) {
  return `<div class="callout callout-gear">
  <div class="callout-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
  </div>
  <div class="callout-content">
    <strong>${title}</strong>
    <p>${body} <a href="${link}" target="_blank" rel="noopener noreferrer nofollow">${buttonText} <span>&rarr;</span></a></p>
    <p style="font-size:0.85em;margin-top:0.5em;"><a href="${readMoreLink}">Read the full gear review &rarr;</a></p>
  </div>
</div>`;
}

/** @type {Array<import('./remark-affiliate-inject.mjs').AffiliateRule>} */
export const affiliateRules = [
  // ── Rule 1: Non-Slip Shoes ──────────────────────────────────────────
  {
    id: 'non-slip-shoes',
    topics: ['Gear', 'Training', 'Operations'],
    chains: [],
    keywords: ['closing', 'floor', 'mopping', 'clean', 'shift'],
    calloutHtml: buildCalloutHtml({
      title: "Russell\u2019s Gear Pick: Non-Slip Shoes",
      body:
        'After 10 years of mopping grease traps and running the line, the single best investment you can make is a real pair of non-slip shoes. Your knees, your back, and your ankles will thank you after year three.',
      link: 'https://www.amazon.com/s?k=Shoes+for+Crews+Non-Slip+Work+Shoes&tag=fastfoodguides-20',
      buttonText: 'Check Prices on Amazon',
      readMoreLink: '/articles/best-non-slip-shoes-fast-food-workers/',
    }),
  },

  // ── Rule 2: Pocket Thermometer ──────────────────────────────────────
  {
    id: 'pocket-thermometer',
    topics: ['Burgers', 'Chicken', 'Operations', 'Cooking Operations'],
    chains: [],
    keywords: ['grill', 'fryer', 'temp', 'thermometer', 'cook', 'broiler'],
    calloutHtml: buildCalloutHtml({
      title: "Russell\u2019s Gear Pick: Digital Pocket Thermometer",
      body:
        'Stop relying on the broken dial thermometer corporate sent you in 2019. A 3\u2011second digital read can save you from serving undercooked chicken and getting your store shut down during an EcoSure audit.',
      link: 'https://www.amazon.com/s?k=ThermoPro+TP19H+Digital+Meat+Thermometer&tag=fastfoodguides-20',
      buttonText: 'Check Prices on Amazon',
      readMoreLink: '/articles/top-pocket-thermometers-grill-line/',
    }),
  },

  // ── Rule 3: Box Cutters ─────────────────────────────────────────────
  {
    id: 'box-cutters',
    topics: ['Operations', 'Prep', 'Prep Operations'],
    chains: [],
    keywords: ['prep', 'receiving', 'walk-in', 'cases', 'inventory', 'box'],
    calloutHtml: buildCalloutHtml({
      title: "Russell\u2019s Gear Pick: Safety Box Cutter",
      body:
        'If you are breaking down 30 cases of frozen product in the walk-in every morning with a dull blade, you are one slip away from a workers\u2019 comp claim. Get a self-retracting safety knife.',
      link: 'https://www.amazon.com/s?k=OLFA+SK-4+Safety+Knife&tag=fastfoodguides-20',
      buttonText: 'Check Prices on Amazon',
      readMoreLink: '/articles/best-box-cutters-safety-knives-kitchen-prep/',
    }),
  },

  // ── Rule 4: Insoles ─────────────────────────────────────────────────
  {
    id: 'insoles',
    topics: ['Training', 'Closing'],
    chains: [],
    keywords: ['shift', 'standing', 'hours', 'fatigue', 'feet', 'closing'],
    calloutHtml: buildCalloutHtml({
      title: "Russell\u2019s Gear Pick: Anti-Fatigue Insoles",
      body:
        'Standing on quarry tile for 8 hours destroys the cartilage in your knees faster than you think. A $30 pair of insoles extends your career by years. That is not an exaggeration.',
      link: 'https://www.amazon.com/s?k=Timberland+PRO+Anti-Fatigue+Insole&tag=fastfoodguides-20',
      buttonText: 'Check Prices on Amazon',
      readMoreLink: '/articles/best-insoles-restaurant-workers/',
    }),
  },

  // ── Rule 5: Hand Cream ──────────────────────────────────────────────
  {
    id: 'hand-cream',
    topics: ['Operations', 'Cleaning'],
    chains: [],
    keywords: ['dish', 'sanitation', 'sanitizer', 'handwashing', 'wash'],
    calloutHtml: buildCalloutHtml({
      title: "Russell\u2019s Gear Pick: Heavy-Duty Hand Cream",
      body:
        'Constant handwashing and sanitizer exposure will crack your skin open by week two. Keep a tube of this in your locker. Your hands are your tools \u2014 protect them.',
      link: 'https://www.amazon.com/s?k=O%27Keeffe%27s+Working+Hands+Hand+Cream&tag=fastfoodguides-20',
      buttonText: 'Check Prices on Amazon',
      readMoreLink: '/articles/best-hand-creams-food-service/',
    }),
  },
];
