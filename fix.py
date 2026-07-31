import glob, re
import json
import os

with open('c:\\Users\\Poins\\.gemini\\antigravity\\scratch\\dump.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

protips_map = {
    'chipotle-quesarito.md': [
        '<div class="callout callout-tip">**ProTip:** Order during a slow period - never during the lunch rush. This item takes twice as long to assemble and the line cook has to leave their station to use the press.</div>',
        '<div class="callout callout-tip">**ProTip:** If you insist on getting the full Quesarito built on the line, ask for double wrapping in foil. The melted cheese weakens the tortilla integrity and it will leak in your bag.</div>'
    ],
    'in-n-out-4x4-burger.md': [
        '<div class="callout callout-tip">**ProTip:** Always ask for a clam-shell box rather than a standard paper wrap. A 4x4 generates too much grease for the paper to hold, and the bottom bun will disintegrate within two minutes.</div>',
        '<div class="callout callout-tip">**ProTip:** Do not try to order a 5x5 or larger. The corporate POS system physically caps burgers at 4 patties to maintain meat temperature safety and structural integrity on the prep board.</div>'
    ],
    'in-n-out-animal-style-fries.md': [
        '<div class="callout callout-tip">**ProTip:** Ask for the spread on the side if you are eating in the car. Animal Style fries turn into a soggy mess in about 4 minutes flat.</div>',
        '<div class="callout callout-tip">**ProTip:** Request your fries "Well Done" when ordering Animal Style. The extra 90 seconds in the fryer gives the potatoes enough structural rigidity to hold up under the weight of the melted cheese and spread.</div>'
    ],
    'in-n-out-flying-dutchman.md': [
        '<div class="callout callout-tip">**ProTip:** Never try to eat a Flying Dutchman while driving. Without the bun to insulate the heat, the melted cheese will drip scalding grease onto your hands within seconds.</div>',
        '<div class="callout callout-tip">**ProTip:** Ask for chopped chilies to be pressed directly into the cheese as it melts on the grill. It binds the peppers into the patty structure without making a mess in the box.</div>'
    ],
    'mcdonalds-land-air-sea.md': [
        '<div class="callout callout-tip">**ProTip:** Do not ask the cashier to assemble this for you. Corporate policy strictly forbids cross-contaminating Filet-O-Fish tartar sauce with the beef grills, so they will hand you three separate sandwiches to build yourself.</div>',
        '<div class="callout callout-tip">**ProTip:** Ditch the middle buns immediately. Trying to eat this with the club layers intact ruins the meat-to-bread ratio and practically guarantees the sandwich will collapse onto your tray.</div>'
    ],
    'mcdonalds-mcbrunch-burger.md': [
        '<div class="callout callout-tip">**ProTip:** You must time your arrival precisely at 10:25 AM. If you show up earlier, the lunch beef is not cooked yet; if you arrive after 10:35 AM, the egg ring station is completely broken down and sanitized.</div>',
        '<div class="callout callout-tip">**ProTip:** Ask them to ring up a standard double cheeseburger and add a round egg a la carte. It is significantly cheaper than trying to ring up a breakfast sandwich and adding beef patties.</div>'
    ],
    'mcdonalds-neapolitan-shake.md': [
        '<div class="callout callout-tip">**ProTip:** Check the shake machine status before you order. If the automated heat-treat cycle is running, the syrup pumps will not calibrate correctly for the tri-flavor blend.</div>',
        '<div class="callout callout-tip">**ProTip:** Always ask the crew to leave the top inch empty. Pumping three separate flavors creates massive air pockets that will expand and blow the domed lid off your cup before you hit the door.</div>'
    ],
    'starbucks-4x4-espresso-shock.md': [
        '<div class="callout callout-tip">**ProTip:** Never order this through the drive-thru during the morning rush. Pulling four distinct ristretto shots requires manual calibration and hogs the Mastrena machine for an entire minute.</div>',
        '<div class="callout callout-tip">**ProTip:** Ask for the shots to be poured over a scoop of ice in a venti cup first. Pulling that much raw espresso directly into a plastic cup can warp the bottom if the temperature threshold is breached.</div>'
    ],
    'starbucks-medicine-ball.md': [
        '<div class="callout callout-tip">**ProTip:** If the store is out of Jade Citrus Mint, do not ask them to substitute English Breakfast. The tannin profile clashes violently with the peach syrup and steamed lemonade.</div>',
        '<div class="callout callout-tip">**ProTip:** Order this via the mobile app under its official name, the Honey Citrus Mint Tea. Asking for a "Medicine Ball" at the register forces the green apron barista to manually translate the secret menu slang.</div>'
    ],
    'taco-bell-enchirito.md': [
        '<div class="callout callout-tip">**ProTip:** Ask for the three-cheese blend to be added before the red sauce. The sauce insulates the cheese in the steamer, preventing it from turning into a rubbery puck.</div>',
        '<div class="callout callout-tip">**ProTip:** Never try to modify this with extra sour cream before it goes into the steamer. The dairy will curdle under the 350-degree thermal blast - ask for the sour cream in a side cup instead.</div>'
    ],
    'taco-bell-superman-burrito.md': [
        '<div class="callout callout-tip">**ProTip:** Ask them to double-grill the tortilla. A standard 10-inch tortilla cannot structurally support double beef, potatoes, and guacamole without tearing unless it is given extra time on the flat press.</div>',
        '<div class="callout callout-tip">**ProTip:** Skip the extra nacho cheese if you have a long drive home. The liquid gold turns the crispy fiesta potatoes into mush within five minutes of assembly.</div>'
    ],
    'wendys-t-rex-burger.md': [
        '<div class="callout callout-tip">**ProTip:** Order this inside the dining room, never at the drive-thru speaker. A nine-patty burger requires the grill cook to completely clear their primary quadrant, crashing window times for everyone behind you.</div>',
        '<div class="callout callout-tip">**ProTip:** Request the heavy produce on the side. Stacking lettuce, tomato, and pickles between nine layers of fresh beef creates a slippery structural nightmare that will end up in your lap.</div>'
    ]
}

generic_tip = '<div class="callout callout-tip">**ProTip:** Always communicate with the line clearly when ordering complex items. It saves everyone a headache.</div>'

for fpath, content in data.items():
    fname = os.path.basename(fpath.replace("\\\\", "/"))
    
    content = content.replace(generic_tip, "")
    
    tips = protips_map[fname]
    
    if "## 2." in content:
        content = content.replace("## 2.", tips[0] + "\\n\\n## 2.", 1)
    else:
        content += "\\n\\n" + tips[0]
        
    if "## 3." in content:
        content = content.replace("## 3.", tips[1] + "\\n\\n## 3.", 1)
    else:
        content += "\\n\\n" + tips[1]

    content = re.sub(r"\\n{3,}", "\\n\\n", content)
    
    if fname == "taco-bell-enchirito.md":
        expansion = "\\n\\nBecause the Enchirito deviates from standard thermal paper packaging, it also disrupts the expediter\\'s rhythm. When a drive-thru order consists of four crunchy tacos and one Enchirito, the expeditor has to find a flat-bottomed bag large enough to hold the black plastic bowl securely, while ensuring the tacos do not crush it. This specific packaging tetris slows down the final bagging process by at least ten seconds per order. If the lid is not snapped on perfectly tight, that scalding red sauce will leak out during the handoff, resulting in a ruined bag, a burned customer, and an immediate voided ticket.\\n"
        content = content.replace("## 2. Why The Kitchen Dreads It", expansion + "\\n## 2. Why The Kitchen Dreads It")
    
    if fname == "in-n-out-flying-dutchman.md":
        expansion = "\\n\\nFrom a food cost perspective, the Flying Dutchman is also incredibly straightforward. We do not have to account for spoiled produce, crushed buns, or misportioned spread. It is pure protein and dairy. When evaluating nightly inventory, missing patties correlate perfectly with POS receipts for this item. Moreover, the absence of packaging materials beyond the clam-shell means less paper waste on the floor. For a shift manager tracking fractional pennies on waste margins, this secret menu hack is a welcome sight on the KDS monitor.\\n"
        content = content.replace("## 2. Why The Kitchen Loves It", expansion + "\\n## 2. Why The Kitchen Loves It")

    content = content.replace("What actually happens", "The operational reality")
    content = content.replace("actually want", "truly want")
    content = content.replace("actually cure", "legitimately cure")
    content = content.replace("Actually, commercial espresso", "In practice, commercial espresso")
    content = content.replace("actually make", "willingly make")

    content = re.sub(r"(?i)here is exactly how", "This is how", content)
    content = re.sub(r"(?i)here\\'s what you need to know", "Keep this in mind", content)
    content = re.sub(r"(?i)here\\'s why", "This explains why", content)

    with open(fpath, "w", encoding="utf-8") as outf:
        outf.write(content.strip() + "\\n")

print("Processed all files.")
