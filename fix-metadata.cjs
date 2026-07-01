const fs = require('fs');
const path = require('path');

// Map of file -> corrected title and description
const fixes = {
  'applebees-microwave-reality.md': {
    title: "Applebee's Microwave: What Gets Reheated",
    desc: "Applebee's uses microwaves for some dishes. Here's exactly which items get reheated and how it affects the final meal you're served."
  },
  'bojangles-biscuit-process.md': {
    title: "Bojangles Biscuit Process: Made From Scratch",
    desc: "Bojangles bakes biscuits from scratch every 20 minutes. Here is what the prep cook does at 4 AM before the store ever opens."
  },
  'buffalo-wild-wings-sauce-tossing.md': {
    title: "Buffalo Wild Wings Sauce Tossing: The Real Process",
    desc: "Buffalo Wild Wings sauces every wing to order. Learn the exact tossing method, sauce ratios, and why over-coating ruins the wing."
  },
  'chick-fil-a-breading-process.md': {
    title: "Chick-fil-A Breading Process: The Pressure Cooker",
    desc: "Chick-fil-A hand-breads every filet to order. Here is how the breading station works and what makes the coating stick perfectly every time."
  },
  'chick-fil-a-core-4.md': {
    title: "Chick-fil-A Core 4: The Service Model Explained",
    desc: "Chick-fil-A trains every employee on four specific behaviors. Here's what Core 4 means and how it shapes every customer interaction."
  },
  'chick-fil-a-drive-thru-tablets.md': {
    title: "Chick-fil-A Drive-Thru Tablets: Face-to-Face Ordering",
    desc: "Chick-fil-A employees walk the drive-thru line with tablets during rush hours. Here's exactly how the system works and why it speeds up service."
  },
  'chick-fil-a-lemonade.md': {
    title: "Chick-fil-A Lemonade: Made Fresh Every Day",
    desc: "Chick-fil-A squeezes real lemons every single day. Here's the prep process, the exact ratio, and what separates it from fountain lemonade."
  },
  'chick-fil-a-peanut-oil-filtration.md': {
    title: "Chick-fil-A Peanut Oil: Why They Filter It Daily",
    desc: "Chick-fil-A filters their peanut oil multiple times a day. Here's the filtration process and why oil quality controls the taste of every filet."
  },
  'chilis-baby-back-ribs.md': {
    title: "Chili's Baby Back Ribs: How They Are Actually Made",
    desc: "Chili's baby back ribs are slow-cooked and finished on a grill. Here's the full multi-step prep process behind their signature rib rack."
  },
  'chipotle-fajita-veggie-cut.md': {
    title: "Chipotle Fajita Veggies: The Specific Cut Required",
    desc: "Chipotle requires a precise knife cut for their fajita peppers and onions. Here is the prep standard and why consistency matters for cooking time."
  },
  'chipotle-grill-validation.md': {
    title: "Chipotle Grill Validation: The 165°F Rule",
    desc: "Every Chipotle grill cook runs a validation test each morning. Here's what it involves and why the process exists to protect food safety."
  },
  'chipotle-guacamole.md': {
    title: "Chipotle Guacamole: Made From Scratch Daily",
    desc: "Chipotle makes guacamole in-house every day. Here's the exact recipe, the prep process, and why it takes a skilled hand to hit the right texture."
  },
  'culvers-butterburger.md': {
    title: "Culver's ButterBurger: Fresh Beef, Real Butter",
    desc: "Culver's uses fresh beef and real butter on every burger. Here's exactly how the ButterBurger gets made and what separates it from the competition."
  },
  'dairy-queen-blizzard-flip.md': {
    title: "Dairy Queen Blizzard Flip: Why They Flip It Upside Down",
    desc: "Dairy Queen flips every Blizzard before handing it over. Here's the consistency standard behind the flip and what happens when a store skips it."
  },
  'dairy-queen-perfect-cone-curl.md': {
    title: "Dairy Queen Cone Curl: The Standard for Soft Serve",
    desc: "Dairy Queen trains every crew member to pull a perfect curl on soft-serve cones. Here's the exact technique and pressure required to nail it."
  },
  'dennys-grand-slam-build.md': {
    title: "Denny's Grand Slam: How the Kitchen Builds It",
    desc: "Denny's Grand Slam requires precise timing across four components. Here's how the kitchen coordinates eggs, pancakes, and sides to plate at once."
  },
  'dominos-dough-stretching.md': {
    title: "Domino's Dough Stretching: The Hand-Toss Technique",
    desc: "Domino's hand-toss requires a specific stretch to hit the right crust thickness. Here's the technique cooks are trained to use every single order."
  },
  'dominos-gas.md': {
    title: "Domino's Gas Reimbursement: How Driver Pay Works",
    desc: "Domino's delivery drivers are paid a mileage reimbursement, not a gas allowance. Here's exactly how driver compensation is structured per delivery."
  },
  'dominos-super-bowl-pulse-system.md': {
    title: "Domino's Super Bowl Pulse System Explained",
    desc: "Domino's uses a real-time order monitoring system during peak events. Here's how the Pulse system manages thousands of simultaneous orders."
  },
  'dunkin-flavor-shot-vs-swirl.md': {
    title: "Dunkin' Flavor Shot vs. Swirl: What's the Difference",
    desc: "Dunkin' offers two types of flavor add-ins and most customers don't know the difference. Here's what separates a shot from a swirl in the cup."
  },
  'dutch-bros-drive-thru.md': {
    title: "Dutch Bros Drive-Thru: The Walk-Up Model",
    desc: "Dutch Bros employees walk up to your car window instead of using a speaker box. Here's how the model works and why it creates faster service times."
  },
  'firehouse-subs-steaming-process.md': {
    title: "Firehouse Subs Steaming: How Every Sub Gets Made",
    desc: "Firehouse Subs steams their meats and cheeses before building the sandwich. Here's the exact process and why the steam makes a measurable difference."
  },
  'five-guys-burger-build.md': {
    title: "Five Guys Burger Build: How It's Assembled",
    desc: "Five Guys builds every burger fresh to order with no heat lamps. Here's the exact assembly sequence and why the build order affects the final bite."
  },
  'ihop-pancake-batter.md': {
    title: "IHOP Pancake Batter: What's Actually In It",
    desc: "IHOP uses a proprietary batter mix that arrives in powdered form. Here's how the batter is prepped each morning and what gives their pancakes the signature flavor."
  },
  'jimmy-johns-freaky-fast.md': {
    title: "Jimmy John's Freaky Fast: How They Do It",
    desc: "Jimmy John's speed comes from a highly specific prep and assembly system. Here's the exact process that allows them to make a sub in under 30 seconds."
  },
  'kfc-gravy-crackling-process.md': {
    title: "KFC Gravy: How Cracklings Make the Difference",
    desc: "KFC gravy isn't just a powder packet. Cooks harvest cracklings from the pressure fryer to give the gravy its signature deep flavor and color."
  },
  'kfc-original-vs-extra-crispy.md': {
    title: "KFC Original vs. Extra Crispy: How They Differ",
    desc: "KFC's Original Recipe and Extra Crispy use different cooking methods entirely. Here's exactly how each style is prepared and why the texture differs."
  },
  'krispy-kreme-hot-light.md': {
    title: "Krispy Kreme Hot Light: What It Actually Means",
    desc: "The Krispy Kreme Hot Light signals fresh glazed donuts coming off the line. Here's how the production schedule works and what triggers the light."
  },
  'little-caesars-hot-n-ready-system.md': {
    title: "Little Caesars Hot-N-Ready: How the System Works",
    desc: "Little Caesars keeps pizzas ready without a customer order. Here's the production cadence and what happens when demand outpaces supply."
  },
  'little-caesars-sheetout-machine.md': {
    title: "Little Caesars Sheet-Out Machine: Press and Go",
    desc: "Little Caesars uses a mechanical press to standardize every pizza dough round. Here's how the machine works and what the specs are per crust size."
  },
  'mcdonalds-abs-system.md': {
    title: "McDonald's ABS System: Made-for-You Explained",
    desc: "McDonald's ABS (Assembly Board System) coordinates every made-to-order burger. Here's how the screen system works behind the counter."
  },
  'mcdonalds-fresh-beef-grill-process.md': {
    title: "McDonald's Fresh Beef: The Grill Process",
    desc: "McDonald's fresh beef Quarter Pounder is never frozen. Here's how the Blue Glove protocol and clamshell grill process works on every cook."
  },
  'mcdonalds-fry-station.md': {
    title: "McDonald's Fry Station: Inside the Operation",
    desc: "McDonald's fry station runs on a precise basket rotation and timer system. Here's how fry cooks manage oil quality and output during peak hours."
  },
  'mcdonalds-ice-cream-machine.md': {
    title: "McDonald's Ice Cream Machine: Why It's Broken",
    desc: "McDonald's ice cream machines require a nightly heat cycle that locks them for hours. Here's exactly why the machine breaks and what the cleaning cycle involves."
  },
  'mcdonalds-nugget-process.md': {
    title: "McDonald's Nuggets: The Full Production Process",
    desc: "McDonald's Chicken McNuggets follow a strict fry time and basket rotation system. Here's how the nugget station is managed during a busy lunch rush."
  },
  'panda-express-steam-table-calling.md': {
    title: "Panda Express Steam Table: How 'Calling Food' Works",
    desc: "Panda Express doesn't use digital screens for their wok chefs. Front-of-house staff call batch sizes verbally to keep the steam table stocked."
  },
  'panera-overnight-baker.md': {
    title: "Panera Overnight Baker: The 4 AM Bread Shift",
    desc: "Panera bakes all their bread overnight in-store. Here's what the overnight baker does from 4 AM to opening and how the schedule is structured."
  },
  'popeyes-slow-kitchen.md': {
    title: "Popeyes Slow Kitchen: Why the Wait Is That Long",
    desc: "Popeyes chicken takes longer than competitors because it's marinated and hand-battered. Here's how the prep process creates the notorious wait time."
  },
  'raising-canes-sauce.md': {
    title: "Raising Cane's Sauce: The Recipe and Prep Process",
    desc: "Raising Cane's sauce is made in-house daily. Here's what goes into it, the mixing process, and why every location has to get it exactly right."
  },
  'shake-shack-smash-burger.md': {
    title: "Shake Shack Smash Burger: The Grill Technique",
    desc: "Shake Shack smashes every patty to order on a flat-top grill. Here's how the pressing and crust technique creates their signature burger flavor."
  },
  'sonic-carhops-roller-skate.md': {
    title: "Sonic Carhops on Roller Skates: How It Works",
    desc: "Not every Sonic carhop skates, but the ones who do follow a specific training program. Here's how the skating program is structured at the drive-in."
  },
  'sonic-nugget-ice.md': {
    title: "Sonic Nugget Ice: Why Customers Love It",
    desc: "Sonic's nugget ice is softer and more chewable than standard ice cubes. Here's the machine that makes it and why the ice type changes how drinks taste."
  },
  'starbucks-cold-bar-frappuccino.md': {
    title: "Starbucks Cold Bar: How Frappuccinos Are Built",
    desc: "Starbucks Frappuccinos require a specific layering and blending sequence. Here's how the cold bar station is set up and timed during peak hours."
  },
  'starbucks-mastrena-espresso-calibration.md': {
    title: "Starbucks Mastrena II: Espresso Calibration",
    desc: "The Mastrena II auto-calibrates grind size throughout the day. Here's how the 18-23 second extraction window is maintained and what throws it off."
  },
  'starbucks-morning-rush.md': {
    title: "Starbucks Morning Rush: How the Bar Stays Afloat",
    desc: "Starbucks morning rush requires specific bar positioning and drink routing. Here's how a well-run store manages 200+ drinks in the first hour of service."
  },
  'starbucks-secret-menu.md': {
    title: "Starbucks Secret Menu: The Truth From Behind the Bar",
    desc: "The Starbucks secret menu doesn't officially exist. Here's why baristas dread it, how they handle custom orders, and what actually goes into making them."
  },
  'subway-pos-out-of-order.md': {
    title: "Subway POS Down: How Staff Handle a Cash-Only Shift",
    desc: "When Subway's POS system goes offline, everything shifts to manual entry. Here's how staff manage orders, cash, and the receipt printer during an outage."
  },
  'subway-tuna.md': {
    title: "Subway Tuna: How It's Actually Made In-Store",
    desc: "Subway tuna arrives in sealed pouches and is mixed with mayo in-store daily. Here's exactly how the prep process works and what controls the ratio."
  },
  'sweetgreen-mixing-station.md': {
    title: "Sweetgreen Mixing Station: Portion Control at Scale",
    desc: "Sweetgreen mixes every salad to order using a precise portion and toss technique. Here's how the mixing station is structured to handle a lunch rush."
  },
  'sweetgreen-morning-prep.md': {
    title: "Sweetgreen Morning Prep: What Happens Before Open",
    desc: "Sweetgreen's morning prep crew chops, roasts, and portions every ingredient before the store opens. Here's the full prep schedule from open to close."
  },
  'taco-bell-baja-blast.md': {
    title: "Taco Bell Baja Blast: The PepsiCo Partnership",
    desc: "Baja Blast is a Mountain Dew flavor made exclusively for Taco Bell. Here's the history of the partnership and why it stays off shelves at other chains."
  },
  'taco-bell-chalupa-shell.md': {
    title: "Taco Bell Chalupa Shell: How It's Fried Fresh",
    desc: "Taco Bell fries their Chalupa shells to order. Here's how the fryer mold works and why the dough requires a specific hydration to fry properly."
  },
  'waffle-house-hash-brown-system.md': {
    title: "Waffle House Hash Brown System: All Nine Mods",
    desc: "Waffle House hash browns have nine official modification options. Here's how the ticket system tracks each order and how the grill cook executes them."
  },
  'wawa-hoagie-build.md': {
    title: "Wawa Hoagie Build: The Touchscreen Assembly Line",
    desc: "Wawa hoagies are ordered via touchscreen and built to a specific sequence. Here's how the assembly line works and what separates a great Wawa hoagie."
  },
  'wendys-chili-leftover-hamburgers.md': {
    title: "Wendy's Chili Is Made From Leftover Hamburgers",
    desc: "Wendy's chili is made from burger patties that sat on the grill too long. Here's how the meat is stored, chopped, and added to the chili base."
  },
  'wendys-closing-duties.md': {
    title: "Wendy's Closing Duties: A Full Night Breakdown",
    desc: "Wendy's closing crew has a strict checklist that takes 90+ minutes. Here's how the kitchen is broken down and what gets done before the last lock-up."
  },
  'wendys-frosty-machine-boil-out.md': {
    title: "Wendy's Frosty Machine Boil-Out: How It Works",
    desc: "Wendy's Frosty machine requires a full boil-out cleaning cycle every week. Here's what the process involves and why it takes the machine offline overnight."
  },
  'whataburger-patty-melt.md': {
    title: "Whataburger Patty Melt: Texas Toast on the Grill",
    desc: "Whataburger's Patty Melt uses Texas Toast grilled in butter on a flat-top. Here's how the sandwich is built and what makes the cook so specific."
  },
  'white-castle-slider-steam-grill.md': {
    title: "White Castle Slider: The Steam Grill Method",
    desc: "White Castle steams every slider on a bed of onions. Here's why the five-hole patty exists and how the steam-grill method creates the signature taste."
  },
  'wingstop-sauce-process.md': {
    title: "Wingstop Sauce Process: Toss, Coat, and Serve",
    desc: "Wingstop sauces every wing to order using a toss-and-coat method. Here's how the process works and why the plain-fry-first rule affects every flavor."
  },
  'zaxbys-sauce-recipe.md': {
    title: "Zaxby's Sauce: What's Actually In Zax Sauce",
    desc: "Zax Sauce is a proprietary blend that Zaxby's guards closely. Here's what the sauce contains, how it's portioned, and why getting the ratio right matters."
  }
};

const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
let totalFixed = 0;

for (const [file, { title, desc }] of Object.entries(fixes)) {
  const filePath = path.join(articlesDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Replace title
  content = content.replace(/title:\s*"[^"]*"/, `title: "${title}"`);
  // Replace description
  content = content.replace(/description:\s*"[^"]*"/, `description: "${desc}"`);
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
  }
}

console.log(`Fixed metadata in ${totalFixed} articles.`);
