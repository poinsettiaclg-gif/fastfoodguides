/**
 * remark-affiliate-inject.mjs
 *
 * A remark plugin for Astro that automatically injects contextual affiliate
 * callout boxes into article markdown at build time.
 *
 * How it works:
 *   1. Reads the article's frontmatter from `file.data.astro.frontmatter`.
 *   2. Skips injection if `hasAffiliate` is `true` (manually placed links).
 *   3. Matches the article's `topic`, `chain`, and `title` against the rules
 *      defined in `affiliate-rules.js`.
 *   4. Picks the best-matching rule (topic+chain > topic > keyword fallback).
 *   5. Injects one raw HTML callout node before the last H2 (if one exists),
 *      otherwise at the very end of the document.
 *
 * Maximum 1 callout per article to avoid being spammy.
 */

import { affiliateRules } from './affiliate-rules.js';

console.error('[affiliate-inject] Module loaded, rules count:', affiliateRules.length);

/**
 * Score a single rule against the article's metadata.
 * Returns 0 if no match, higher numbers mean better matches.
 *
 * Scoring tiers:
 *   - topic + chain match  → 30
 *   - topic match           → 20
 *   - keyword match         → 10
 */
function scoreRule(rule, { topic, chain, title }) {
  const topicLower = (topic || '').toLowerCase();
  const chainLower = (chain || '').toLowerCase();
  const titleLower = (title || '').toLowerCase();

  const topicMatch =
    rule.topics.length > 0 &&
    rule.topics.some((t) => topicLower === t.toLowerCase());

  const chainMatch =
    rule.chains.length > 0 &&
    rule.chains.some((c) => chainLower.includes(c.toLowerCase()));

  const keywordMatch =
    rule.keywords.length > 0 &&
    rule.keywords.some((kw) => titleLower.includes(kw.toLowerCase()));

  if (topicMatch && chainMatch) return 30;
  if (topicMatch) return 20;
  if (keywordMatch) return 10;
  return 0;
}

/**
 * Find the index of the last heading node (depth 2 = ## heading) in the
 * MDAST `children` array. Returns -1 if none found.
 */
function findLastH2Index(children) {
  for (let i = children.length - 1; i >= 0; i--) {
    if (children[i].type === 'heading' && children[i].depth === 2) {
      return i;
    }
  }
  return -1;
}

/**
 * The remark plugin factory.  Returns a transformer function that Astro
 * will call for each markdown file during the build.
 */
export default function remarkAffiliateInject() {
  return function transformer(tree, file) {
    // ── 1. Read frontmatter ──────────────────────────────────────────
    // DEBUG: log once to see data shape
    if (!remarkAffiliateInject._logged) {
      remarkAffiliateInject._logged = true;
      console.log('[affiliate-inject] file.data keys:', Object.keys(file.data || {}));
      console.log('[affiliate-inject] file.data.astro:', JSON.stringify(file.data?.astro, null, 2)?.slice(0, 500));
      console.log('[affiliate-inject] file.data.frontmatter:', JSON.stringify(file.data?.frontmatter, null, 2)?.slice(0, 500));
      console.log('[affiliate-inject] file.path:', file.path);
      // Check for YAML frontmatter node in tree
      const yamlNode = tree.children.find(n => n.type === 'yaml');
      console.log('[affiliate-inject] yaml node value:', yamlNode?.value?.slice(0, 300));
    }
    const frontmatter = file.data?.astro?.frontmatter;
    if (!frontmatter) return;

    // ── 2. Skip articles that already have manual affiliate content ──
    if (frontmatter.hasAffiliate === true) return;

    const { topic, chain, title } = frontmatter;

    // ── 3. Score every rule and pick the best match ──────────────────
    let bestRule = null;
    let bestScore = 0;

    for (const rule of affiliateRules) {
      const score = scoreRule(rule, { topic, chain, title });
      if (score > bestScore) {
        bestScore = score;
        bestRule = rule;
      }
    }

    // No matching rule → nothing to inject.
    if (!bestRule) return;

    // ── 4. Build the raw HTML node ──────────────────────────────────
    const calloutNode = {
      type: 'html',
      value: bestRule.calloutHtml,
    };

    // ── 5. Inject: before the last H2 if possible, else at the end ──
    const lastH2 = findLastH2Index(tree.children);

    if (lastH2 > 0) {
      // Insert just before the last H2 so the callout appears near
      // the end of the article body but above the closing section.
      tree.children.splice(lastH2, 0, calloutNode);
    } else {
      // Fallback: append at the very end.
      tree.children.push(calloutNode);
    }
  };
}
