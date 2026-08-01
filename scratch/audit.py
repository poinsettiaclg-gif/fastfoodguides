import os
import re

BANNED_PHRASES = [
    "Here is exactly how", "Here's what you need to know", "Here's why",
    "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital",
    "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore"
]

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    try:
        parts = content.split('---', 2)
        if len(parts) < 3:
            return ["Invalid markdown frontmatter format."]
        frontmatter = parts[1]
        body = parts[2]
    except Exception as e:
        return [f"Error parsing file: {e}"]
    
    # word count
    word_count = len(body.split())
    if word_count < 800:
        issues.append(f"Thin Content: only {word_count} words (needs 800+).")
        
    # banned phrases
    for phrase in BANNED_PHRASES:
        if re.search(r'\b' + re.escape(phrase) + r'\b', content, re.IGNORECASE):
            issues.append(f"Banned Phrase Found: '{phrase}'")
            
    # ProTip check
    protip_count = content.count('class="callout callout-tip"') + content.count('<ProTip>')
    if protip_count == 0:
        issues.append("Missing ProTip component.")
    elif protip_count < 2:
        issues.append(f"Needs at least 2-3 ProTip components (found {protip_count}).")
        
    # In-body image check
    images = re.findall(r'!\[.*?\]\(.*?\)', body)
    if not images:
        issues.append("Missing in-body markdown image.")
        
    # FAQ check
    if 'faq:' not in frontmatter:
        issues.append("Missing faq in frontmatter.")
    else:
        q_count = frontmatter.count('- question:')
        if q_count != 2:
            issues.append(f"FAQ has {q_count} questions instead of exactly 2.")
            
    # Overuse of I've seen / I can tell you
    seen_count = len(re.findall(r"(I've seen|I can tell you)", body, re.IGNORECASE))
    if seen_count > 2:
        issues.append(f"Overuse of 'I've seen/I can tell you' ({seen_count} times).")
        
    return issues

files = [
    "applebees-microwave-reality.md",
    "arbys-meat-slicer.md",
    "auntie-annes-pretzel-rolling.md",
    "bojangles-biscuit-process.md",
    "buffalo-wild-wings-sauce-tossing.md",
    "burger-king-broiler-closing.md",
    "burger-king-broiler.md",
    "burger-king-expeditor-role.md",
    "burger-king-whopper-build-process.md",
    "cava-assembly-line.md",
    "cava-digital-make-line.md",
    "chick-fil-a-breading-process.md",
    "chick-fil-a-core-4.md",
    "chick-fil-a-first-day-training.md",
    "chick-fil-a-ipos-system.md",
    "chick-fil-a-lemonade.md",
    "chick-fil-a-peanut-oil-filtration.md",
    "chick-fil-a-waffle-fry-station.md"
]

dir_path = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"
report = "# AdSense Policy Audit Report: Applebee's through Chick-fil-A\n\n"

for f in files:
    filepath = os.path.join(dir_path, f)
    if not os.path.exists(filepath):
        report += f"## {f}\n- File not found.\n\n"
        continue
        
    issues = analyze_file(filepath)
    report += f"## {f}\n"
    if issues:
        for i in issues:
            report += f"- {i}\n"
    else:
        report += "- **PASS**: No major policy issues found.\n"
    report += "\n"
    
out_path = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\scratch\reports\round6\audit_1.md"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as out:
    out.write(report)
    
print("Report generated successfully at:", out_path)
