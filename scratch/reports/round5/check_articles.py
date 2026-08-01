import os
import re
import yaml

banned_phrases = [
    "here is exactly how",
    "here's what you need to know",
    "here's why",
    "in conclusion",
    "delve into",
    "tapestry",
    "crucial",
    "vital",
    "landscape",
    "myriad",
    "testament",
    "ultimately",
    "furthermore",
    "i've seen",
    "i can tell you"
]

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter_match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if not frontmatter_match:
        return {"error": "No frontmatter found"}

    frontmatter_text = frontmatter_match.group(1)
    body_text = frontmatter_match.group(2)
    
    issues = []

    try:
        frontmatter = yaml.safe_load(frontmatter_text)
    except Exception as e:
        return {"error": f"YAML parsing error: {e}"}

    if 'faq' not in frontmatter:
        issues.append("Missing 'faq' array in frontmatter")
    elif not isinstance(frontmatter['faq'], list):
        issues.append("'faq' in frontmatter is not an array")
    elif len(frontmatter['faq']) != 2:
        issues.append(f"Expected exactly 2 FAQs, found {len(frontmatter['faq'])}")
    else:
        for i, faq in enumerate(frontmatter['faq']):
            if 'question' not in faq or 'answer' not in faq:
                issues.append(f"FAQ {i+1} is missing 'question' or 'answer'")

    words = re.findall(r'\b\w+\b', body_text)
    word_count = len(words)
    if word_count < 800:
        issues.append(f"Thin content: Word count is {word_count} (needs >= 800)")

    body_lower = body_text.lower()
    for phrase in banned_phrases:
        if phrase in body_lower:
            issues.append(f"Found banned phrase: '{phrase}'")

    mcd_count = body_lower.count("mcdonald's")
    if mcd_count / max(1, word_count) > 0.02: # 2% keyword density
        issues.append(f"Possible keyword stuffing: 'McDonald's' found {mcd_count} times in {word_count} words")

    protip_count = body_text.count('callout-tip') + body_text.count('<ProTip>')
    if protip_count < 2:
        issues.append(f"Not enough ProTips: found {protip_count} (needs >= 2)")

    images = re.findall(r'!\[.*?\]\(.*?\)', body_text)
    if not images:
        issues.append("No in-body markdown images found")
        
    if not re.search(r'^##\s+', body_text, re.MULTILINE):
        issues.append("No H2 tags found (needed for TOC structure)")

    return {
        "issues": issues,
        "word_count": word_count,
        "mcd_count": mcd_count,
        "protips": protip_count,
        "images": len(images)
    }

def main():
    directory = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles"
    reports_file = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\scratch\reports\round5\audit_2.md"
    
    with open(reports_file, 'w', encoding='utf-8') as report:
        report.write("# AdSense Policy Audit - McDonald's Articles\n\n")
        
        for filename in os.listdir(directory):
            if filename.startswith("mcdonalds-") and filename.endswith(".md"):
                filepath = os.path.join(directory, filename)
                result = check_file(filepath)
                report.write(f"## {filename}\n")
                if "error" in result:
                    report.write(f"Status: FAIL - {result['error']}\n\n")
                else:
                    if not result["issues"]:
                        report.write("Status: PASS\n")
                    else:
                        report.write("Status: FAIL\n")
                        for issue in result["issues"]:
                            report.write(f"- {issue}\n")
                    
                    report.write(f"Metrics: {result['word_count']} words, {result['mcd_count']} 'McDonald\\'s', {result['protips']} ProTips, {result['images']} images\n\n")
                    
    print("Done")

if __name__ == "__main__":
    main()
