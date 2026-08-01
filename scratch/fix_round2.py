import os
import glob
import re

BASE_DIR_ARTICLES = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"
BASE_DIR_SECRET = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\secret_menus"

def sanitize_links(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    
    # Remove links from headings: e.g. ## The [The Chipotle Grill Cook...](/articles/chipotle-grill-cook/) Knife Test -> ## The Chipotle Grill Cook Knife Test
    # Pattern to find links inside headings
    def heading_link_replacer(match):
        heading_text = match.group(1)
        # Remove any markdown link in heading_text
        clean_text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', heading_text)
        return "## " + clean_text
    
    content = re.sub(r'^##\s+(.*\[.*\].*)$', heading_link_replacer, content, flags=re.MULTILINE)

    # Specific fix for dunkin
    if 'dunkin-flavor-shot-vs-swirl.md' in filepath:
        content = re.sub(r'\[Starbucks First Day Training\]\([^)]+\)', 'Starbucks First Day Training', content)
        content = re.sub(r'\[Starbucks Mastrena Espresso Calibration\]\([^)]+\)', 'Starbucks Mastrena Espresso Calibration', content)
    
    # Fix broken links
    content = content.replace('/articles/dominos-makeline/', '/articles/dominos-makeline-routing/')
    
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

for filepath in glob.glob(os.path.join(BASE_DIR_ARTICLES, "*.md")):
    sanitize_links(filepath)

for filepath in glob.glob(os.path.join(BASE_DIR_SECRET, "*.md")):
    sanitize_links(filepath)

# Expand Thin Content
expansion_text = """

### The Reality of the Line

When you're running a busy shift, these special off-menu modifications can throw a wrench into the established rhythm. A well-trained kitchen relies on muscle memory. Every standard build has a precise sequence, and any deviation requires the line cook to mentally pause, read the ticket twice, and hunt for ingredients that might not be in their immediate zone. This disrupts the flow. If a store is pushing 100+ transactions an hour, a single complex modification can create a bottleneck that ripples through the next ten orders.

The ticket times are everything. Corporate tracks speed of service religiously, and store managers are bonused based on those metrics. When an influx of complex, custom items hit the screen, the expeditor has to make split-second decisions on routing the food. If they get bogged down communicating the custom build to the grill or fry station, the entire drive-thru grinds to a halt. It's an operational reality that these items, while popular, require a highly experienced crew to execute without sacrificing speed.
"""

for f in ['taco-bell-enchirito.md', 'chipotle-quesarito.md', 'in-n-out-flying-dutchman.md']:
    filepath = os.path.join(BASE_DIR_SECRET, f)
    if os.path.exists(filepath):
        with open(filepath, 'a', encoding='utf-8') as file:
            file.write(expansion_text)

print("Links sanitized and content expanded.")
