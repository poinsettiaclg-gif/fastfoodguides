import os
import re
import yaml

content_dir = r"src\content"

errors = []

for root, _, files in os.walk(content_dir):
    for file in files:
        if file.endswith('.md'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            parts = content.split('---')
            if len(parts) < 3:
                errors.append(f"{file}: Missing or malformed frontmatter")
                continue
                
            frontmatter_str = parts[1]
            body = '---'.join(parts[2:])
            
            try:
                fm = yaml.safe_load(frontmatter_str)
            except:
                errors.append(f"{file}: Invalid YAML frontmatter")
                continue
                
            author = fm.get('author', '')
            if author != 'Russell Roseberry':
                errors.append(f"{file}: Invalid author '{author}'")
                
            faq = fm.get('faq', [])
            if not isinstance(faq, list):
                errors.append(f"{file}: FAQ is not a list")
            elif len(faq) != 2:
                errors.append(f"{file}: FAQ length is {len(faq)}, expected exactly 2")
                
            word_count = len(re.findall(r'\b\w+\b', body))
            if word_count < 800:
                errors.append(f"{file}: Word count is {word_count}, expected >= 800")
                
            protip_matches = re.findall(r'(<ProTip>|<div class="callout callout-tip">)', body)
            if len(protip_matches) < 2:
                errors.append(f"{file}: ProTip count is {len(protip_matches)}, expected at least 2")
                
            image_matches = re.findall(r'!\[.*?\]\(.*?\)', body)
            if len(image_matches) < 1:
                errors.append(f"{file}: In-body image count is {len(image_matches)}, expected at least 1")

if errors:
    for e in errors:
        print(e)
else:
    print("All 150+ articles passed strict compliance checks!")
