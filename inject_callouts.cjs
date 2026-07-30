const fs = require('fs');
const path = require('path');

const callouts = {
  'mcdonalds-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  Look, the biggest mistake I saw new hires make wasn't messing up a burger build. It was showing up in canvas Vans when I explicitly told them to buy non-slips. I had to send them home because if corporate drops in or the Ecolab guy shows up and sees canvas shoes near the fry vats, that's a massive health and safety violation on my shift. Go to Walmart, spend the $25 on TredSafe shoes, and save your manager the headache.
</div>
`,
  'chick-fil-a-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  You think saying "my pleasure" is a joke until you get put on front counter during a Saturday lunch rush. The operator is watching you. If you slip up and say "no problem" to a guest, you will absolutely get pulled off register and sent to bag fries. They drill the Core 4 into you because secret shoppers literally dock the store's monthly score if the cashier doesn't make eye contact and smile. Take it seriously.
</div>
`,
  'dominos-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  If you're hired as an insider, your entire first week is going to be folding boxes. I'm not kidding. During Friday rush, a good box folder is literally what keeps the makeline from collapsing. We'd have races in the back to see who could fold a stack of 50 the fastest. Don't complain about it—if you prove you can fold fast without tearing the cardboard, the GM will love you.
</div>
`,
  'five-guys-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  Five Guys doesn't mess around with their fries. The hardest part of the job isn't the grill, it's morning prep. You have to cut hundreds of pounds of potatoes and wash them until the water runs completely clear. If a manager catches you skipping a wash cycle, they'll make you dump the entire bin and start over. The starch ruins the peanut oil in the fryers, and that oil is incredibly expensive.
</div>
`,
  'starbucks-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  When I was training green beans (new baristas), the biggest hurdle was the pump ratios. Don't try to memorize every single drink. Memorize the base rules: 3 pumps for tall, 4 for grande, 5 for venti hot, 6 for venti iced. If you know the base rules, you can figure out 90% of the menu. And please, don't put hot water in an iced americano. You'd be surprised how often that happens under pressure.
</div>
`,
  'subway-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  The Bain (the chilled prep area where all the meats and veggies sit) is your whole world. If you're opening, your manager is going to be paranoid about the temperature logs. If the health inspector walks in and the tuna is sitting at 45 degrees instead of 40, the store gets dinged hard. Always make sure the lids are closed when there are no customers. It's annoying, but it saves the food cost.
</div>
`,
  'taco-bell-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  The line at Taco Bell moves faster than any other fast food kitchen because there's barely any actual cooking—it's all assembly. The hardest station is the steamer/griller position. If you drop a Crunchwrap on the floor during the dinner rush, it throws the entire KDS (Kitchen Display System) out of sync. Just stay calm, communicate with your linebackers, and keep the line moving.
</div>
`,
  'wendys-first-day-training': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  Wendy's is brutal on the grill because the meat is fresh. You can't just drop frozen patties on a timer and walk away. You have to learn the 4-corner press technique, and if you press too hard, you squeeze all the juice out and ruin the burger. A bad grill operator kills the drive-thru times. You won't be put on grill on your first day, but watch how the veterans handle the spatulas.
</div>
`,
  'mcdonalds-ice-cream-machine-truth': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  People always think we're lying when we say the machine is down. We're not. The Taylor C602 machine goes into a daily "heat cycle" to pasteurize the dairy mix. If someone accidentally overfills the hopper or doesn't clean the agitator pin correctly, the heat cycle fails, and the machine locks us out for 4 hours. We literally cannot dispense ice cream even if we wanted to. It's an absolute nightmare for the shift manager.
</div>
`,
  'wendys-chili-leftover-hamburgers': `
<div class="callout callout-tip">
  <strong>Manager's Insight</strong>
  This is the most famous fast food "secret" on the internet, but let me clear it up. Yes, the chili meat comes from unsold hamburger patties. But they aren't scraped off the floor. If a patty sits on the grill past its hold time, it gets immediately transferred to a dedicated chili meat pan, chilled, and then boiled for hours. It's perfectly safe, and honestly, boiling the roasted patties is what gives Wendy's chili that specific depth of flavor.
</div>
`
};

const dir = path.join(__dirname, 'src', 'content', 'articles');

for (const [slug, calloutHtml] of Object.entries(callouts)) {
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('Manager\'s Insight')) {
    console.log(`Skipping ${slug}, already has callout`);
    continue;
  }
  
  // Find a good place to inject it.
  // After the first paragraph after the frontmatter is usually a good spot.
  const parts = content.split('---');
  if (parts.length >= 3) {
    const frontmatter = parts.slice(0, 3).join('---');
    let body = parts.slice(3).join('---');
    
    // Find the first blank line after the first paragraph
    const pMatch = body.match(/^[^\n#].*?\n\n/m);
    if (pMatch) {
      body = body.replace(pMatch[0], `${pMatch[0]}${calloutHtml}\n`);
    } else {
      body = `\n${calloutHtml}\n` + body;
    }
    
    fs.writeFileSync(filePath, frontmatter + '---' + body, 'utf8');
    console.log(`Updated ${slug} with Manager's Insight`);
  }
}
