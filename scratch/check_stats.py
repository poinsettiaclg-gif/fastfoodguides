import os
import glob
import yaml
import re

content_dir = r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\secret_menus"
files = glob.glob(os.path.join(content_dir, "*.md"))

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    frontmatter_match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    if not frontmatter_match:
        continue
    
    fm_text, body = frontmatter_match.groups()
    try:
        fm = yaml.safe_load(fm_text)
    except:
        continue
        
    words = len(body.split())
    protips = body.count('callout-tip') + body.count('<ProTip>')
    faq = len(fm.get('faq', []))
    imgs = body.count('![')
    
    # check keyword stuffing manually (title words frequency)
    title = fm.get('title', '')
    
    print(f"{os.path.basename(file)}: words={words}, protips={protips}, faq={faq}, images={imgs}, title='{title}'")
