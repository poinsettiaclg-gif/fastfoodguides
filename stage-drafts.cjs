const fs = require('fs');
const path = require('path');

const draftsDir = path.join(__dirname, 'src/content/drafts');
if (!fs.existsSync(draftsDir)) {
  fs.mkdirSync(draftsDir, { recursive: true });
}

const articles = [
  // Cluster 1
  {
    slug: 'chick-fil-a-apple-pay',
    title: 'Does Chick-fil-A Take Apple Pay? (And How Their Drive-Thru Tablets Process It)',
    description: 'A detailed look at Chick-fil-A payment policies, how their custom POS tablets process Apple Pay in the drive-thru, and tips for moving through the line faster.',
    chain: 'Chick-fil-A',
    topic: 'Logistics'
  },
  {
    slug: 'wendys-breakfast-hours',
    title: "What Time Does Wendy's Stop Serving Breakfast? (The Kitchen Switchover Explained)",
    description: "Exactly when Wendy's stops serving breakfast, and the chaotic 30-minute operational switchover process required to move the kitchen from eggs to burgers.",
    chain: "Wendy's",
    topic: 'Breakfast & Coffee'
  },
  {
    slug: 'mcdonalds-ebt-snap',
    title: "Does McDonald's Take EBT/SNAP? (Franchise Policies Explained)",
    description: "The complete guide to whether McDonald's accepts EBT or SNAP benefits, how the Restaurant Meals Program works, and why policies vary by state and franchise.",
    chain: "McDonald's",
    topic: 'Logistics'
  },
  {
    slug: 'mcdonalds-lunch-hours',
    title: "McDonald's Lunch Hours: When Exactly Can You Order a Big Mac?",
    description: "The definitive answer on when McDonald's starts serving lunch, why the 10:30 AM transition is so strict, and the operational reasons behind the cutoff.",
    chain: "McDonald's",
    topic: 'Burgers'
  },
  {
    slug: 'taco-bell-breakfast-hours',
    title: "Taco Bell Breakfast Hours: When Does the Morning Shift Actually Start?",
    description: "Everything you need to know about Taco Bell's breakfast hours, when they switch to the lunch menu, and how the morning prep shift operates.",
    chain: "Taco Bell",
    topic: 'Breakfast & Coffee'
  },
  
  // Cluster 2
  {
    slug: 'highest-protein-fast-food-breakfast',
    title: 'The 5 Highest Protein Fast Food Breakfasts Under 500 Calories',
    description: 'A manager-verified breakdown of the highest protein, lowest calorie fast food breakfast options, including exact macros and ordering strategies.',
    chain: 'Multi-Chain',
    topic: 'Healthy Options'
  },
  {
    slug: 'taco-bell-keto',
    title: 'Eating Keto at Taco Bell: The Ultimate Drive-Thru Survival Guide',
    description: 'How to successfully order keto at Taco Bell. We break down the Power Bowls, custom macro tweaks, and what to avoid to stay under 20g net carbs.',
    chain: "Taco Bell",
    topic: 'Healthy Options'
  },
  {
    slug: 'mcdonalds-gluten-free',
    title: "McDonald's Gluten-Free Options: Cross-Contamination Risks Explained",
    description: "An honest look at eating gluten-free at McDonald's. A former manager explains the severe cross-contamination risks in the kitchen and what is actually safe.",
    chain: "McDonald's",
    topic: 'Healthy Options'
  },
  {
    slug: 'chipotle-lowest-calorie-bowl',
    title: "Chipotle's Lowest Calorie Bowl: Exact Macros and Ordering Strategy",
    description: "The mathematical breakdown of the absolute lowest calorie bowl you can order at Chipotle without sacrificing flavor, verified against corporate recipe cards.",
    chain: "Chipotle",
    topic: 'Healthy Options'
  },
  {
    slug: 'diabetic-fast-food-guide',
    title: "The Best Fast Food Options for Diabetics: Managing Spikes on the Road",
    description: "A practical guide to diabetic-friendly fast food orders that minimize blood sugar spikes, focusing on protein-heavy, low-glycemic index options across major chains.",
    chain: 'Multi-Chain',
    topic: 'Healthy Options'
  },

  // Cluster 3
  {
    slug: 'mcdonalds-mcgangbang',
    title: "How to Order the McDonald's McGangBang (And Why Employees Hate It)",
    description: "The history of the legendary secret menu item, how to properly order it to assemble yourself, and why asking the kitchen to build it will get you rejected.",
    chain: "McDonald's",
    topic: 'Secret Menus'
  },
  {
    slug: 'wendys-biggie-bag-calories',
    title: "The Wendy's Biggie Bag Breakdown: Maximizing Your Calories Per Dollar",
    description: "A mathematical analysis of Wendy's Biggie Bag value meals, analyzing which combination offers the absolute most caloric bang for your buck.",
    chain: "Wendy's",
    topic: 'Value Deals'
  },
  {
    slug: 'chipotle-portion-hacks',
    title: "Chipotle Portion Hacks: How 'The Nod' Actually Works on the Line",
    description: "The psychology and operational reality of Chipotle portion sizes. Learn how to successfully execute 'The Nod' to get extra rice and beans without being charged.",
    chain: "Chipotle",
    topic: 'Secret Menus'
  },
  {
    slug: 'starbucks-secret-menu-ordering',
    title: "Starbucks Secret Menu: How to Order Without Annoying Your Barista",
    description: "The right (and wrong) way to order from the Starbucks Secret Menu. Learn how the POS system works so you can order custom Frappuccinos flawlessly.",
    chain: "Starbucks",
    topic: 'Secret Menus'
  },
  {
    slug: 'dominos-super-bowl-delivery',
    title: "Domino's Delivery Logistics: How to Get Your Pizza Faster During the Super Bowl",
    description: "An inside look at Domino's dispatch routing on their busiest day of the year, with operational tips on how to guarantee your pizza arrives before kickoff.",
    chain: "Domino's",
    topic: 'Pizza'
  },

  // Cluster 4
  {
    slug: 'impossible-whopper-vs-beyond-famous-star',
    title: "Burger King Impossible Whopper vs. Beyond Famous Star: A Grill Cook's Perspective",
    description: "A technical comparison of how Burger King and Carl's Jr cook their plant-based burgers, highlighting the difference between the automated broiler and the flat top.",
    chain: "Multi-Chain",
    topic: 'Burgers'
  },
  {
    slug: 'chick-fil-a-peanut-oil',
    title: "Chick-fil-A Peanut Oil Frying: Why It Tastes Different (And Allergy Facts)",
    description: "The science behind why Chick-fil-A fries entirely in highly refined peanut oil, how it changes the flavor profile of the chicken, and the FDA allergy exemption.",
    chain: "Chick-fil-A",
    topic: 'Chicken'
  },
  {
    slug: 'mcdonalds-coke-syrup-system',
    title: "McDonald's Coke vs. Bottled Coke: The Science Behind the Syrup System",
    description: "Why does McDonald's Sprite and Coke taste so much better? A breakdown of their proprietary stainless steel syrup tanks, water filtration, and wider straws.",
    chain: "McDonald's",
    topic: 'Beverages'
  },
  {
    slug: 'shake-shack-vs-in-n-out-smash',
    title: "Shake Shack vs. In-N-Out: The Ultimate Smash Burger Technique Showdown",
    description: "A head-to-head culinary breakdown of the griddle techniques, proprietary meat blends, and crust formation of Shake Shack and In-N-Out.",
    chain: "Multi-Chain",
    topic: 'Burgers'
  },
  {
    slug: 'panera-broccoli-cheddar-soup-thermalizer',
    title: "The Secret to Panera's Broccoli Cheddar Soup: The Thermalizer Process",
    description: "How Panera Bread prepares its famous Broccoli Cheddar Soup. A look inside the thermalizer water bath system and the logistics of holding soup at temperature.",
    chain: "Panera Bread",
    topic: 'Soups & Salads'
  }
];

let created = 0;

articles.forEach(article => {
  const filepath = path.join(draftsDir, `${article.slug}.md`);
  
  const content = `---
title: "${article.title.replace(/"/g, '\\"')}"
description: "${article.description.replace(/"/g, '\\"')}"
pubDate: "2026-06-25"
author: "Russell Roseberry"
authorTitle: "Former Multi-Unit Kitchen Manager"
chain: "${article.chain}"
topic: "${article.topic}"
---

[CONTENT GOES HERE]

## FAQ

## [FAQ Question 1]?
[FAQ Answer 1]

## [FAQ Question 2]?
[FAQ Answer 2]

## [FAQ Question 3]?
[FAQ Answer 3]
`;

  fs.writeFileSync(filepath, content, 'utf-8');
  created++;
});

console.log(`Staged ${created} drafts in src/content/drafts/`);
