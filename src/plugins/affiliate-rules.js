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
        'Don\'t wait until you slip on grease or blow out your knees. A real pair of non-slip shoes is the single best investment you can make for your safety. Get a pair before your next shift.',
      link: 'https://www.amazon.com/dp/B072Q5QRF8?tag=fastfoodguides-20',
      buttonText: 'Get Yours on Amazon Now',
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
        'Stop risking an EcoSure shutdown or foodborne illness with a broken dial thermometer. Grab a reliable 3-second digital read right now before it costs you your store.',
      link: 'https://www.amazon.com/dp/B07XXSYLL8?tag=fastfoodguides-20',
      buttonText: 'Secure Yours on Amazon',
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
        'Breaking down frozen cases with a dull blade means you are one slip away from a major workers\u2019 comp claim. Ditch the dangerous blades and order a self-retracting safety knife today.',
      link: 'https://www.amazon.com/dp/B00002X201?tag=fastfoodguides-20',
      buttonText: 'Protect Yourself on Amazon',
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
        'Quarry tile destroys the cartilage in your knees faster than you think. Stop the damage before it is permanent \u2014 invest in a pair of heavy-duty insoles before your next close.',
      link: 'https://www.amazon.com/dp/B009R9E9XU?tag=fastfoodguides-20',
      buttonText: 'Save Your Knees on Amazon',
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
        'Constant sanitizer exposure will crack your skin open in days. Do not wait until you are bleeding on the line \u2014 order heavy-duty hand cream right now to protect your most important tools.',
      link: 'https://www.amazon.com/dp/B00N3WAOUQ?tag=fastfoodguides-20',
      buttonText: 'Fix Your Hands on Amazon',
      readMoreLink: '/articles/best-hand-creams-food-service/',
    }),
  },
];
