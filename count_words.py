import glob
import re

for file in glob.glob('src/content/secret_menus/*.md'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        words = len(re.findall(r'\S+', content))
        print(f"{file}: {words} words")
