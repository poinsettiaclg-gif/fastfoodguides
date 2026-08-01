import os
import re
import glob

dirs_to_search = [
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles\wendys-*.md"
]

all_files = []
for d in dirs_to_search:
    all_files.extend(glob.glob(d))

for filepath in all_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Fix truncated alt texts, e.g. ![What is the Wendy]
    # Replaces ![something short] with ![Wendy's Operational Guide]
    content = re.sub(r"!\[[^\]]{1,20}\]", "![Wendy's Operational Guide]", content)
    
    # 2. Fix consecutive blank lines (4 or more down to 2)
    content = re.sub(r"\n{4,}", "\n\n", content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# Fix Medicine Ball FAQ
med_path = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\secret_menus\starbucks-medicine-ball.md"
if os.path.exists(med_path):
    with open(med_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    # Replace medical FAQ with operational one
    content = content.replace("Does the Starbucks Medicine Ball legitimately cure colds?", "What is the standard build procedure for the Medicine Ball?")
    content = content.replace("There is no medical evidence", "The standard build requires 1 bag of Jade Citrus Mint and 1 bag of Peach Tranquility, half hot water, and half steamed lemonade with honey.")
    
    # Reduce 'tea' repetition
    content = content.replace("tea tea", "tea")
    content = content.replace("the tea is", "the beverage is")
    
    if content != original:
        with open(med_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Wendy's and Medicine Ball patched.")
