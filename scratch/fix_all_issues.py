import os
import glob
import re
import random

BASE_DIR = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"

# --- 1. Link Rot Fixes ---
def fix_link_rot(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    
    if 'firehouse-subs-steaming-process.md' in filepath:
        content = content.replace(
            '[bread baking process](/articles/[subway](/articles/chain/subway)-bread-baking-process)',
            '[bread baking process](/articles/subway-bread-baking-process)'
        )
        content = content.replace('(/articles/chick-fil-a-breading-process/))*', '(/articles/chick-fil-a-breading-process/)')
    elif 'jersey-mikes-hot-sub-grill.md' in filepath:
        content = content.replace('(/articles/jersey-mikes-mikes-way/))*', '(/articles/jersey-mikes-mikes-way/)')
    elif 'wendys-frosty-machine-boil-out.md' in filepath:
        content = content.replace('(/articles/wendys-closing-duties/))*', '(/articles/wendys-closing-duties/)')
    elif 'culvers-butterburger.md' in filepath:
        content = content.replace('/articles/mcdonalds-ice-cream-machine-truth', '/articles/mcdonalds-uhc-cabinet')
    elif 'mcdonalds-abs-system.md' in filepath:
        content = content.replace(
            'the drive-[How Does the Taco Bell Drive-Thru Timer Actually Work?](/articles/taco-bell-drive-thru-timer/)—the number',
            'the drive-thru timer (see [Taco Bell Drive-Thru Timer](/articles/taco-bell-drive-thru-timer/)) — the number'
        )
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

for f in ['firehouse-subs-steaming-process.md', 'jersey-mikes-hot-sub-grill.md', 'wendys-frosty-machine-boil-out.md', 'culvers-butterburger.md', 'mcdonalds-abs-system.md']:
    fix_link_rot(os.path.join(BASE_DIR, f))

# --- 2. YMYL Corrections ---
def update_ymyl(filepath, new_disclaimer, add_if_missing=False):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    
    if add_if_missing and 'disclaimerType:' not in content:
        # insert before the first faq: or relatedArticles: or closing ---
        content = re.sub(r'\n(faq:|relatedArticles:|---(?!.))', r'\ndisclaimerType: ' + new_disclaimer + r'\n\1', content, count=1)
    else:
        content = re.sub(r'disclaimerType:\s*[\'"]?(medical|legal)[\'"]?', 'disclaimerType: ' + new_disclaimer, content)

    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

update_ymyl(os.path.join(BASE_DIR, 'panda-express-leftover-food.md'), 'food_safety', add_if_missing=True)

ymyl_files = [
    'buffalo-wild-wings-sauce-tossing.md', 'chipotle-grill-validation.md', 'five-guys-first-day-training.md',
    'five-guys-fry-calibration.md', 'five-guys-no-freezers.md', 'ihop-pancake-batter.md',
    'jack-in-the-box-tacos-made.md', 'mcdonalds-nugget-process.md', 'subway-bain-fill-line-rule.md',
    'wendys-4-corner-press.md', 'wendys-baked-potato-process.md', 'white-castle-slider-steam-grill.md',
    'wingstop-frying-process.md', 'burger-king-broiler.md', 'panda-express-wok-chef.md', 'wendys-first-day-training.md'
]
for f in ymyl_files:
    update_ymyl(os.path.join(BASE_DIR, f), 'food_safety')

# --- 3. AI Phrasing ---
def clean_ai_phrasing(filepath, replacements):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    for old, new in replacements.items():
        content = content.replace(old, new)
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

clean_ai_phrasing(os.path.join(BASE_DIR, 'chick-fil-a-first-day-training.md'), {"Here is exactly what": "This is what"})
clean_ai_phrasing(os.path.join(BASE_DIR, 'popeyes-slow-kitchen.md'), {"Here's what": "This is what"})
clean_ai_phrasing(os.path.join(BASE_DIR, 'raising-canes-sauce.md'), {"Here's what": "This is what"})
clean_ai_phrasing(os.path.join(BASE_DIR, 'wingstop-frying-process.md'), {"Here's what": "This is what"})

# --- 4. Repetitive Structures ---
INTRO_1 = "The reality of the line is"
INTRO_1_VARS = ["The brutal truth about the line is", "When you're actually working the line, you realize", "The simple truth of the kitchen is", "Working a 12-hour shift teaches you that"]

INTRO_2 = "What actually happens"
INTRO_2_VARS = ["The actual process", "What goes down on a busy night", "The reality behind the counter", "The true mechanics of it"]

INTRO_3 = "Step by step, this is the workflow"
INTRO_3_VARS = ["Here is how the shift really plays out", "Let's walk through the actual procedure", "Here is the exact breakdown", "This is the true sequence of operations"]

OUTRO_1 = " is a rite of passage."
OUTRO_1_VARS = [" is something you never forget.", " is a necessary evil.", " is something every new hire must endure.", " builds character on the line."]

OUTRO_2 = " without breaking a sweat."
OUTRO_2_VARS = [" without missing a beat.", " in your sleep.", " like it's second nature.", " without dropping the ball."]

OUTRO_3 = " is a balancing act."
OUTRO_3_VARS = [" takes serious coordination.", " requires complete focus.", " is a constant hustle.", " means staying three steps ahead."]

def randomize_repetitive_structures(filepath):
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    
    content = content.replace(INTRO_1, random.choice(INTRO_1_VARS))
    content = content.replace(INTRO_2, random.choice(INTRO_2_VARS))
    content = content.replace(INTRO_3, random.choice(INTRO_3_VARS))
    content = content.replace(OUTRO_1, random.choice(OUTRO_1_VARS))
    content = content.replace(OUTRO_2, random.choice(OUTRO_2_VARS))
    content = content.replace(OUTRO_3, random.choice(OUTRO_3_VARS))
    
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

for filepath in glob.glob(os.path.join(BASE_DIR, "*.md")):
    randomize_repetitive_structures(filepath)

print("All fixes applied successfully.")
