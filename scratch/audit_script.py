import os
import re

banned_phrases = [
    "Here is exactly how", "Here's what you need to know", "Here's why",
    "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital", 
    "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore"
]

target_files = [
    "chilis-baby-back-ribs.md",
    "chipotle-fajita-veggie-cut.md",
    "chipotle-grill-validation.md",
    "chipotle-guacamole.md",
    "chipotle-makeline-training.md",
    "chipotle-massive-burrito-rolling.md",
    "crumbl-cookies-weekly-logistics.md",
    "culvers-butterburger.md",
    "dairy-queen-blizzard-flip.md",
    "dairy-queen-grill-and-chill-flow.md",
    "dairy-queen-perfect-cone-curl.md",
    "dennys-grand-slam-build.md",
    "dominos-20-bank-rule.md",
    "dominos-dough-stretching.md",
    "dominos-first-day-training.md",
    "dominos-gas.md",
    "dominos-makeline-routing.md",
    "dominos-oven-tender-role.md",
    "dominos-super-bowl-pulse-system.md"
]

base_dir = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"
report = []

for filename in target_files:
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    word_count = len(content.split())
    
    # Check banned phrases
    found_banned = []
    for phrase in banned_phrases:
        if re.search(r'\b' + re.escape(phrase) + r'\b', content, re.IGNORECASE):
            found_banned.append(phrase)
            
    # Check ProTips
    protips = len(re.findall(r'(class="callout callout-tip"|<ProTip>)', content))
    
    # Check FAQ
    has_faq = "faq:" in content
    
    # Check Image
    has_img = "![" in content
    
    report.append(f"### {filename}")
    report.append(f"- **Word Count:** {word_count} {'(THIN CONTENT)' if word_count < 800 else ''}")
    report.append(f"- **Banned Phrases Found:** {', '.join(found_banned) if found_banned else 'None'}")
    report.append(f"- **ProTips Count:** {protips} {'(NEEDS MORE)' if protips < 2 else ''}")
    report.append(f"- **FAQ Schema:** {'Present' if has_faq else 'MISSING'}")
    report.append(f"- **In-Body Image:** {'Present' if has_img else 'MISSING'}")
    report.append("")
    
print("\n".join(report))
