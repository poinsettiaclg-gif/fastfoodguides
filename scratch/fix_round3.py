import os
import glob
import re

BASE_DIR_ARTICLES = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"
BASE_DIR_SECRET = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\secret_menus"

# 1. Brand safety sanitization
replacements = {
    r"kill your drive-thru times": "crush your drive-thru times",
    r"kills the yeast organisms": "destroys the yeast organisms",
    r"kill your ticket times": "crush your ticket times",
    r"Kill Your Interview": "Ruin Your Interview",
    r"kills the rise": "ruins the rise",
    r"Hesitation kills your drive-thru time": "Hesitation ruins your drive-thru time",
    r"'heat kill'": "'heat destroy'",
    r"kill bacteria": "eliminate bacteria",
    r"kill any bacteria": "eliminate any bacteria",
    r"kill any potential bacteria": "eliminate any potential bacteria",
    r"killed that": "ended that",
    r"kill the idea": "end the idea",
    r"killing speed of service metrics": "ruining speed of service metrics",
    r"kills potential bacteria": "eliminates potential bacteria",
    r"kills the drive-thru times": "ruins the drive-thru times",
    r"murders a potential tip": "destroys a potential tip",
    r"ticking time bomb": "massive liability",
    r"sticker bomb": "sticker blast",
    r"flavor bomb": "flavor burst",
    r"sugar bombs": "sugar overloads",
    r"blood flow": "circulation",
    r"blood sugar crash": "energy crash"
}

def fix_brand_safety(filepath):
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    for old, new in replacements.items():
        content = re.sub(old, new, content, flags=re.IGNORECASE)
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

for filepath in glob.glob(os.path.join(BASE_DIR_ARTICLES, "*.md")): fix_brand_safety(filepath)
for filepath in glob.glob(os.path.join(BASE_DIR_SECRET, "*.md")): fix_brand_safety(filepath)

# 2. Duplicate Content Removal
enchirito = os.path.join(BASE_DIR_SECRET, "taco-bell-enchirito.md")
quesarito = os.path.join(BASE_DIR_SECRET, "chipotle-quesarito.md")
dutchman = os.path.join(BASE_DIR_SECRET, "in-n-out-flying-dutchman.md")

duplicate_text = """### The Reality of the Line

When you're running a busy shift, these special off-menu modifications can throw a wrench into the established rhythm. A well-trained kitchen relies on muscle memory. Every standard build has a precise sequence, and any deviation requires the line cook to mentally pause, read the ticket twice, and hunt for ingredients that might not be in their immediate zone. This disrupts the flow. If a store is pushing 100+ transactions an hour, a single complex modification can create a bottleneck that ripples through the next ten orders.

The ticket times are everything. Corporate tracks speed of service religiously, and store managers are bonused based on those metrics. When an influx of complex, custom items hit the screen, the expeditor has to make split-second decisions on routing the food. If they get bogged down communicating the custom build to the grill or fry station, the entire drive-thru grinds to a halt. It's an operational reality that these items, while popular, require a highly experienced crew to execute without sacrificing speed.
"""

def replace_duplicate(filepath, new_text):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    if duplicate_text.strip() in content:
        content = content.replace(duplicate_text.strip(), new_text.strip())
    else:
        # regex fallback if whitespace is slightly different
        content = re.sub(r'### The Reality of the Line\s+When you\'re running a busy shift.*?without sacrificing speed\.', new_text.strip(), content, flags=re.DOTALL)
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

replace_duplicate(enchirito, """### The Reality of the Line at Taco Bell

When you're working the line at Taco Bell, the steamer and melter stations are designed for maximum throughput. An Enchirito completely breaks this flow. The line cook has to grab an alternate container—usually a Mexican Pizza box or a special platter—and carefully balance the red sauce and cheese. If you have three Enchiritos on the screen during a Friday night rush, the entire line backs up because the melter can only hold so many items. It's a logistical nightmare that forces the expeditor to completely rethink their routing strategy just to keep drive-thru times out of the red.""")

replace_duplicate(quesarito, """### The Reality of the Line at Chipotle

The Quesarito is infamous among Chipotle employees for a reason. Rolling a standard burrito is already a skill that requires perfectly managing the tortilla's structural integrity. A Quesarito adds an entire secondary layer of melted cheese and a second tortilla, creating a massive, structurally unstable cylinder. It slows down the press time by at least 30 seconds. In a store that processes hundreds of customers an hour, that 30-second delay per Quesarito cascades down the line, causing the salsa station to wait and frustrating customers who just want a standard bowl.""")

replace_duplicate(dutchman, """### The Reality of the Line at In-N-Out

In-N-Out grills are a masterclass in spatial efficiency. The Flying Dutchman, consisting only of two patties and cheese, seems simple but it actually disrupts the rhythm of the board. The grill cook has to properly melt the cheese between the patties without the structural support of a bun, and then transfer it to a paper sleeve or wax paper without it falling apart. It takes up valuable real estate on the grill and forces the cook to adjust their scraping and flipping cadence, which is normally perfectly tuned for standard Double-Doubles.""")

# 3. Frontmatter Integrity
def fix_frontmatter(filepath, is_secret=False):
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    
    if is_secret and "\ntopic: " not in content:
        content = re.sub(r'(---\n)', r'\1topic: "Secret Menu"\n', content, count=1)
    
    if "\nheroImage: " not in content:
        content = re.sub(r'(---\n)', r'\1heroImage: "../../assets/images/general/generic-prep.webp"\n', content, count=1)
        
    if "\nrelatedArticles:" not in content:
        # insert right before closing ---
        content = re.sub(r'(?=\n---.*)', r'\nrelatedArticles:\n  - "mcdonalds-ice-cream-machine"\n  - "wendys-fresh-never-frozen"', content, count=1)
        
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

for filepath in glob.glob(os.path.join(BASE_DIR_ARTICLES, "*.md")): fix_frontmatter(filepath, is_secret=False)
for filepath in glob.glob(os.path.join(BASE_DIR_SECRET, "*.md")): fix_frontmatter(filepath, is_secret=True)

print("Round 3 fixes applied.")
