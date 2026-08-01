import os
import re

articles_dir = r"C:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"
report_path = r"C:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\scratch\reports\round6\audit_3.md"

os.makedirs(os.path.dirname(report_path), exist_ok=True)

banned_phrases = [
    "Here is exactly how", "Here's what you need to know", "Here's why",
    "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital", 
    "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore",
    "I've seen", "I can tell you"
]

files = sorted([f for f in os.listdir(articles_dir) if f.endswith(".md")])
# Filter from in-n-out through popeyes
start_idx = files.index("in-n-out-animal-style-fries.md")
end_idx = files.index("popeyes-slow-kitchen.md")
target_files = files[start_idx:end_idx+1]

with open(report_path, "w", encoding="utf-8") as out:
    out.write("# AdSense Policy Audit Report: In-N-Out through Popeyes\n\n")
    
    for filename in target_files:
        filepath = os.path.join(articles_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Separate frontmatter and body
        parts = content.split('---')
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = "---".join(parts[2:])
        else:
            frontmatter = ""
            body = content

        words = len(body.split())
        
        issues = []
        
        # Word count
        if words < 800:
            issues.append(f"- **Thin Content**: Only {words} words (minimum 800).")
            
        # FAQ check
        if "faq:" not in frontmatter:
            issues.append("- **Schema Missing**: No `faq` array in frontmatter.")
        else:
            qs = frontmatter.count("question:")
            if qs != 2:
                issues.append(f"- **FAQ Count**: Found {qs} questions instead of exactly 2.")
                
        # ProTip check
        protips = body.count("<ProTip>") + body.count('class="callout callout-tip"')
        if protips < 2:
            issues.append(f"- **ProTips Missing**: Only found {protips} ProTip/Callout components (minimum 2).")
            
        # Image check
        images = len(re.findall(r'!\[.*?\]\(.*?\)', body))
        if images < 1:
            issues.append("- **Image Missing**: No markdown images `![alt](url)` found in the body.")
            
        # Banned phrases
        for phrase in banned_phrases:
            if re.search(r'\b' + re.escape(phrase) + r'\b', body, re.IGNORECASE):
                issues.append(f"- **Banned Phrase Used**: '{phrase}'")
                
        if issues:
            out.write(f"### {filename}\n")
            for issue in issues:
                out.write(f"{issue}\n")
            out.write("\n")
            
print("Audit script completed.")
