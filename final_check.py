import os, re

articles_dir = 'src/content/articles'
secret_dir = 'src/content/secret_menus'
banned = ['Here is exactly how', "Here's what you need to know", "Here's why", 'In conclusion', 'Delve into', 'Tapestry', 'Crucial', 'Vital', 'Landscape', 'Myriad', 'Testament', 'Ultimately', 'Furthermore']
issues = []

for d in [articles_dir, secret_dir]:
    if not os.path.exists(d):
        continue
    for f in sorted(os.listdir(d)):
        if not f.endswith('.md'):
            continue
        path = os.path.join(d, f)
        content = open(path, 'r', encoding='utf-8').read()
        for phrase in banned:
            if re.search(r'(?i)\b' + re.escape(phrase) + r'\b', content):
                issues.append(f'{f}: banned phrase "{phrase}"')
        for m in re.finditer(r'Actually (that|from|cooks|team)', content):
            issues.append(f'{f}: botched Actually -> "{m.group()}"')
        if 'Always communicate with the line clearly' in content:
            issues.append(f'{f}: generic templated ProTip still present')

if issues:
    print(f'FOUND {len(issues)} REMAINING ISSUES:')
    for i in issues:
        print(f'  - {i}')
else:
    print('ALL CLEAR - No banned phrases, botched replacements, or generic ProTips found.')
