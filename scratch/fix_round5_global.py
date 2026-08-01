import os
import re
import glob

dirs_to_search = [
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles\*.md",
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\secret_menus\*.md"
]

all_files = []
for d in dirs_to_search:
    all_files.extend(glob.glob(d))

for filepath in all_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Remove medical disclaimers
    content = re.sub(r"disclaimerType:\s*['\"]?medical['\"]?\n?", "", content)
    
    # 2. Fix 'Here is' and 'Here's'
    content = content.replace("Here is ", "This is ")
    content = content.replace("here is ", "this is ")
    content = content.replace("Here's ", "This is ")
    content = content.replace("here's ", "this is ")

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print(f"Global fixes applied to {len(all_files)} files.")
