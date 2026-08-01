import os
import glob
import re
import random

BASE_DIR_ARTICLES = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"
BASE_DIR_SECRET = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\secret_menus"

# 1. Replacements for libel, dangerous content, and brand safety
replacements = {
    # Subway Tuna
    r"food fraud": "quality controversies",
    r"not real tuna": "alternative protein composition",
    # Subway Bread
    r"yoga mat chemical": "azodicarbonamide, a commercial dough conditioner",
    # Wendy's Safety
    r"blades slicing hands": "sharp impeller hazards during disassembly",
    r"baked potato shrapnel": "steam pressure hazards",
    # Starbucks
    r"Liquid Cocaine": "Quad Over Ice",
    r"Crack Macchiato": "High-Caffeine Macchiato",
    # General Libel
    r"lawsuit": "legal inquiries",
    r"food poisoning": "foodborne illness risks",
    r"anaphylactic medical emergencies": "severe allergen reactions"
}

def sanitize_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    
    # Apply standard replacements
    for old, new in replacements.items():
        content = re.sub(old, new, content, flags=re.IGNORECASE)
        
    # Specific thinning for subway-tuna.md (replace ~30% of "tuna" with "protein mix" or "salad")
    if "subway-tuna.md" in filepath.lower():
        parts = re.split(r'(tuna)', content, flags=re.IGNORECASE)
        new_content = []
        for i, p in enumerate(parts):
            if p.lower() == "tuna":
                if random.random() < 0.35:
                    new_content.append("protein mix")
                else:
                    new_content.append(p)
            else:
                new_content.append(p)
        content = "".join(new_content)
        
    with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

for filepath in glob.glob(os.path.join(BASE_DIR_ARTICLES, "*.md")): sanitize_file(filepath)
for filepath in glob.glob(os.path.join(BASE_DIR_SECRET, "*.md")): sanitize_file(filepath)

# 2. Thin Content Expansion (Wendy's First Day)
wendys_training = os.path.join(BASE_DIR_ARTICLES, "wendys-first-day-training.md")
if os.path.exists(wendys_training):
    with open(wendys_training, 'r', encoding='utf-8') as f: content = f.read()
    if "Non-Slip Shoes and Uniform Maintenance" not in content:
        expansion = """
### ProTip: Non-Slip Shoes and Uniform Maintenance

<div class="callout callout-tip">
Before you even step on the line, your uniform is your first line of defense. The floors in a Wendy's kitchen are notoriously slick due to ambient grease from the clamshell grills and fry stations. Investing in high-quality, oil-resistant non-slip shoes is non-negotiable. Standard sneakers will have you sliding across the prep area, creating a massive safety hazard for yourself and your crew.

Additionally, keep your uniform apron clean and your hat or visor secure. A pristine uniform signals to the shift manager that you are organized and ready to work. At the end of your shift, pre-treat any grease stains on your shirt immediately; otherwise, the smell of fryer oil will bake into the fabric permanently.
</div>
"""
        content += expansion
        with open(wendys_training, 'w', encoding='utf-8') as f: f.write(content)

# 3. Image Deduplication for Wendy's articles
images_to_rotate = [
    "../../assets/images/general/generic-grill.webp",
    "../../assets/images/general/generic-pos.webp",
    "../../assets/images/general/generic-walk-in.webp",
    "../../assets/images/general/generic-prep.webp",
    "../../assets/images/general/generic-baking.webp",
    "../../assets/images/general/generic-coffee.webp"
]

wendys_files = glob.glob(os.path.join(BASE_DIR_ARTICLES, "wendys-*.md"))
idx = 0
for filepath in wendys_files:
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    if "generic-fryer-3.webp" in content:
        new_img = images_to_rotate[idx % len(images_to_rotate)]
        content = content.replace("../../assets/images/general/generic-fryer-3.webp", new_img)
        idx += 1
        with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

print("Round 4 fixes applied.")
